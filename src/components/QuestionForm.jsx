import { useState } from 'react'
import { CATEGORIES, DIFFICULTIES, STATUSES } from '../utils/constants.js'

const EMPTY_QUESTION = {
  title: '',
  category: '',
  difficulty: '',
  status: '',
}

function QuestionForm({ onAddQuestion }) {
  const [question, setQuestion] = useState(EMPTY_QUESTION)
  const [errors, setErrors] = useState({})

  function updateField(event) {
    const { name, value } = event.target
    setQuestion((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const title = question.title.trim()
    const nextErrors = {}

    if (!title) {
      nextErrors.title = 'Please enter a question title.'
    } else if (title.length < 3) {
      nextErrors.title = 'Title must be at least 3 characters.'
    }
    if (!question.category) nextErrors.category = 'Choose a category.'
    if (!question.difficulty) nextErrors.difficulty = 'Choose a difficulty.'
    if (!question.status) nextErrors.status = 'Choose a status.'

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    onAddQuestion({ ...question, title })
    setQuestion(EMPTY_QUESTION)
    setErrors({})
  }

  return (
    <form className="rounded-[13px] border border-[#e7e9e1] bg-white p-[19px] max-[680px]:p-4" onSubmit={handleSubmit} noValidate>
      <div className="mb-[14px]">
        <label className="mb-[6px] block text-[11px] font-semibold text-[#5e685a]" htmlFor="question-title">Question title</label>
        <input
          className={`h-[39px] w-full rounded-[7px] border px-[11px] text-xs text-[#384035] outline-none transition-[border-color,box-shadow] placeholder:text-[#b0b6ab] focus:border-[#88a475] focus:shadow-[0_0_0_3px_rgba(112,143,91,0.13)] ${errors.title ? 'border-[#d9857e]' : 'border-[#e3e7de] bg-white'}`}
          id="question-title"
          name="title"
          type="text"
          value={question.title}
          onChange={updateField}
          placeholder="e.g. Two Sum"
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? 'question-title-error' : undefined}
        />
        {errors.title && <span className="mt-[5px] block text-[10px] text-[#b44b43]" id="question-title-error">{errors.title}</span>}
      </div>

      <div className="mb-[14px]">
        <label className="mb-[6px] block text-[11px] font-semibold text-[#5e685a]" htmlFor="question-category">Category</label>
        <select
          className={`h-[39px] w-full rounded-[7px] border px-[11px] text-xs text-[#384035] outline-none transition-[border-color,box-shadow] focus:border-[#88a475] focus:shadow-[0_0_0_3px_rgba(112,143,91,0.13)] ${errors.category ? 'border-[#d9857e]' : 'border-[#e3e7de] bg-white'}`}
          id="question-category"
          name="category"
          value={question.category}
          onChange={updateField}
          aria-invalid={Boolean(errors.category)}
          aria-describedby={errors.category ? 'question-category-error' : undefined}
        >
          <option value="">Select category</option>
          {CATEGORIES.map((category) => <option key={category} value={category}>{category}</option>)}
        </select>
        {errors.category && <span className="mt-[5px] block text-[10px] text-[#b44b43]" id="question-category-error">{errors.category}</span>}
      </div>

      <div className="grid grid-cols-2 gap-[11px] max-[420px]:grid-cols-1 max-[420px]:gap-0">
        <div className="mb-[14px]">
          <label className="mb-[6px] block text-[11px] font-semibold text-[#5e685a]" htmlFor="question-difficulty">Difficulty</label>
          <select
            className={`h-[39px] w-full rounded-[7px] border px-[11px] text-xs text-[#384035] outline-none transition-[border-color,box-shadow] focus:border-[#88a475] focus:shadow-[0_0_0_3px_rgba(112,143,91,0.13)] ${errors.difficulty ? 'border-[#d9857e]' : 'border-[#e3e7de] bg-white'}`}
            id="question-difficulty"
            name="difficulty"
            value={question.difficulty}
            onChange={updateField}
            aria-invalid={Boolean(errors.difficulty)}
            aria-describedby={errors.difficulty ? 'question-difficulty-error' : undefined}
          >
            <option value="">Select level</option>
            {DIFFICULTIES.map((difficulty) => <option key={difficulty} value={difficulty}>{difficulty}</option>)}
          </select>
          {errors.difficulty && <span className="mt-[5px] block text-[10px] text-[#b44b43]" id="question-difficulty-error">{errors.difficulty}</span>}
        </div>
        <div className="mb-[14px]">
          <label className="mb-[6px] block text-[11px] font-semibold text-[#5e685a]" htmlFor="question-status">Status</label>
          <select
            className={`h-[39px] w-full rounded-[7px] border px-[11px] text-xs text-[#384035] outline-none transition-[border-color,box-shadow] focus:border-[#88a475] focus:shadow-[0_0_0_3px_rgba(112,143,91,0.13)] ${errors.status ? 'border-[#d9857e]' : 'border-[#e3e7de] bg-white'}`}
            id="question-status"
            name="status"
            value={question.status}
            onChange={updateField}
            aria-invalid={Boolean(errors.status)}
            aria-describedby={errors.status ? 'question-status-error' : undefined}
          >
            <option value="">Select status</option>
            {STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
          </select>
          {errors.status && <span className="mt-[5px] block text-[10px] text-[#b44b43]" id="question-status-error">{errors.status}</span>}
        </div>
      </div>

      <button className="mt-px inline-flex min-h-[41px] w-full items-center justify-center gap-[7px] rounded-[7px] bg-[#426b4d] text-xs font-bold text-white transition-[background,transform] hover:-translate-y-px hover:bg-[#31533b]" type="submit">
        <span className="text-lg leading-none font-normal" aria-hidden="true">+</span> Add question
      </button>
    </form>
  )
}

export default QuestionForm
