import { useEffect, useState } from 'react'

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = window.localStorage.getItem(key)
      return storedValue === null ? initialValue : JSON.parse(storedValue)
    } catch (error) {
      console.error(`Could not read localStorage key "${key}".`, error)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Could not save localStorage key "${key}".`, error)
    }
  }, [key, value])

  return [value, setValue]
}
