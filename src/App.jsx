import { useEffect, useMemo, useState } from 'react'
import Dashboard from './components/Dashboard.jsx'
import EmptyState from './components/EmptyState.jsx'
import Filters from './components/Filters.jsx'
import ProgressBar from './components/ProgressBar.jsx'
import QuestionForm from './components/QuestionForm.jsx'
import QuestionList from './components/QuestionList.jsx'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import {
  CATEGORIES,
  DIFFICULTIES,
  MACHINE_CODING_KEY,
  STATUSES,
} from './utils/constants.js'
import { getDashboardStats } from './utils/stats.js'

const QUESTIONS_KEY = 'interview-practice-questions'

function App() {
  const [storedQuestions, setQuestions] = useLocalStorage(QUESTIONS_KEY, [])
  const [machineCodingStatus, setMachineCodingStatus] = useLocalStorage(
    MACHINE_CODING_KEY,
    STATUSES[0],
  )
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    difficulty: '',
  })

  const questions = useMemo(
    () =>
      Array.isArray(storedQuestions)
        ? storedQuestions.filter(
            (question) =>
              question &&
              typeof question.id === 'string' &&
              typeof question.title === 'string' &&
              CATEGORIES.includes(question.category) &&
              DIFFICULTIES.includes(question.difficulty) &&
              STATUSES.includes(question.status),
          )
        : [],
    [storedQuestions],
  )
  const safeMachineCodingStatus = STATUSES.includes(machineCodingStatus)
    ? machineCodingStatus
    : STATUSES[0]

  useEffect(() => {
    if (
      !Array.isArray(storedQuestions) ||
      questions.length !== storedQuestions.length
    ) {
      setQuestions(questions)
    }
  }, [questions, setQuestions, storedQuestions])

  useEffect(() => {
    if (!STATUSES.includes(machineCodingStatus)) {
      setMachineCodingStatus(STATUSES[0])
    }
  }, [machineCodingStatus, setMachineCodingStatus])

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setDebouncedSearch(search.trim()), 250)
    return () => window.clearTimeout(timeoutId)
  }, [search])

  const stats = useMemo(() => getDashboardStats(questions), [questions])
  const completedCount = questions.filter(
    (question) => question.status === 'Completed',
  ).length

  const filteredQuestions = useMemo(() => {
    const normalizedSearch = debouncedSearch.toLocaleLowerCase()
    return questions.filter((question) => {
      const matchesSearch = question.title
        .toLocaleLowerCase()
        .includes(normalizedSearch)
      return (
        matchesSearch &&
        (!filters.category || question.category === filters.category) &&
        (!filters.status || question.status === filters.status) &&
        (!filters.difficulty || question.difficulty === filters.difficulty)
      )
    })
  }, [questions, debouncedSearch, filters])

  const hasActiveFilters =
    search !== '' ||
    filters.category !== '' ||
    filters.status !== '' ||
    filters.difficulty !== ''

  function addQuestion(question) {
    setQuestions((current) => [
      ...current,
      { ...question, id: crypto.randomUUID() },
    ])
  }

  function updateQuestionStatus(id, status) {
    setQuestions((current) =>
      current.map((question) =>
        question.id === id ? { ...question, status } : question,
      ),
    )
  }

  function deleteQuestion(id) {
    setQuestions((current) => current.filter((question) => question.id !== id))
  }

  function clearFilters() {
    setSearch('')
    setDebouncedSearch('')
    setFilters({ category: '', status: '', difficulty: '' })
  }

  return (
    <main className="min-h-screen bg-[#fbfcf8] text-[#22291f]">
      <header className="flex h-[72px] items-center justify-between border-b border-[#e7e9e1] bg-white/70 px-[max(28px,calc((100vw-1180px)/2))] max-[680px]:h-[62px] max-[680px]:px-5">
        <a className="inline-flex items-center gap-2.5 text-lg font-bold tracking-[-0.6px] text-[#22291f] no-underline" href="#top" aria-label="Prepwise home">
          <span className="grid size-[30px] place-items-center rounded-[9px] bg-[#426b4d] font-serif text-[17px] font-bold text-white" aria-hidden="true">P</span>
          <span>prepwise<span className="text-[#8aa66f]">.</span></span>
        </a>
        <span className="inline-flex items-center gap-[9px] text-xs font-semibold text-[#6b7568] max-[420px]:text-[10px]"><span className="size-[7px] rounded-full bg-[#8ba66d] shadow-[0_0_0_3px_#edf3e6]" /> Your prep, in focus</span>
      </header>

      <div className="mx-auto w-[min(1180px,calc(100%-56px))] max-[680px]:w-[calc(100%-36px)]" id="top">
        <section className="flex items-end justify-between gap-6 py-[47px] pb-[27px] max-[680px]:items-start max-[680px]:flex-col max-[680px]:gap-3.5 max-[680px]:py-[33px] max-[680px]:pb-5" aria-labelledby="page-title">
          <div>
            <p className="mb-[9px] text-[10px] font-bold tracking-[1.35px] text-[#8a9483]">YOUR WEEKLY OVERVIEW</p>
            <h1 className="m-0 font-serif text-[clamp(32px,4vw,43px)] font-medium leading-[1.12] tracking-[-1.5px] text-[#22291f] max-[680px]:max-w-[430px]" id="page-title">Make every practice count.</h1>
            <p className="mt-[11px] text-[13px] text-[#788074] max-[680px]:max-w-[420px] max-[680px]:leading-[1.55]">
              A little progress each day adds up. Here&apos;s where your interview prep stands.
            </p>
          </div>
          <div className="mb-1 inline-flex shrink-0 items-center gap-2 rounded-full border border-[#e7eadf] bg-white px-[13px] py-[9px] text-[11px] font-semibold text-[#677360] max-[680px]:m-0"><span className="text-[15px] text-[#87a36c]" aria-hidden="true">✳</span> Keep your momentum going</div>
        </section>

        <Dashboard
          stats={stats}
          machineCodingStatus={safeMachineCodingStatus}
          onMachineCodingStatusChange={setMachineCodingStatus}
        />

        <section className="mt-[17px] rounded-[13px] border border-[#e7e9e1] bg-white px-[21px] py-[18px] pb-[19px] max-[680px]:mt-[11px] max-[680px]:p-4" aria-labelledby="progress-title">
          <div className="mb-[14px] flex items-end justify-between gap-[15px] max-[420px]:items-start max-[420px]:flex-col max-[420px]:gap-[7px]">
            <div>
              <p className="mb-1 text-[10px] font-bold tracking-[1.35px] text-[#8a9483]">THE BIG PICTURE</p>
              <h2 className="m-0 font-serif text-xl font-medium tracking-[-0.3px] text-[#22291f]" id="progress-title">Your progress</h2>
            </div>
            <p className="mb-[2px] text-[11px] text-[#899184]">
              {completedCount} of {questions.length} {questions.length === 1 ? 'question' : 'questions'} completed
            </p>
          </div>
          <ProgressBar completed={completedCount} total={questions.length} />
        </section>

        <section className="mt-10 grid items-start gap-[35px] min-[681px]:grid-cols-[minmax(280px,0.78fr)_minmax(0,1.45fr)] max-[900px]:gap-[22px] max-[680px]:mt-8 max-[680px]:grid-cols-1 max-[680px]:gap-[29px]" aria-label="Question tracker">
          <div className="min-w-0">
            <div className="mb-[17px]">
              <p className="mb-[9px] text-[10px] font-bold tracking-[1.35px] text-[#8a9483]">BUILD YOUR PRACTICE SET</p>
              <h2 className="m-0 font-serif text-xl font-medium tracking-[-0.3px] text-[#22291f]">Add a question</h2>
              <p className="mt-[7px] text-xs text-[#8a9285]">Capture what you want to work on next.</p>
            </div>
            <QuestionForm onAddQuestion={addQuestion} />
            <div className="mt-[15px] flex items-start gap-2.5 rounded-[10px] bg-[#f0f4e9] p-[14px]">
              <span className="text-[15px] text-[#81966a]" aria-hidden="true">✦</span>
              <div>
                <strong className="text-[11px] text-[#57684c]">Small steps, big wins</strong>
                <p className="mt-1 text-[10px] leading-[1.5] text-[#7f8a77]">Consistency beats cramming. Add one question and keep going.</p>
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <div className="mb-[14px] flex min-h-[51px] items-end justify-between gap-2.5 max-[680px]:min-h-0">
              <div>
                <p className="mb-1 text-[10px] font-bold tracking-[1.35px] text-[#8a9483]">YOUR PRACTICE QUEUE</p>
                <h2 className="m-0 font-serif text-xl font-medium tracking-[-0.3px] text-[#22291f]">Questions <span className="ml-1 inline-grid h-[22px] min-w-[22px] place-items-center rounded-full bg-[#eef2e8] px-[5px] font-sans text-[10px] text-[#748768] align-[3px]">{questions.length}</span></h2>
              </div>
              {questions.length > 0 && (
                <span className="max-w-[88px] pb-[3px] text-right text-[10px] text-[#9aa194] min-[681px]:max-w-none min-[681px]:text-left">
                  Showing {filteredQuestions.length} of {questions.length}
                </span>
              )}
            </div>

            {questions.length > 0 && (
              <Filters
                search={search}
                filters={filters}
                onSearchChange={setSearch}
                onFilterChange={(name, value) =>
                  setFilters((current) => ({ ...current, [name]: value }))
                }
                onClear={clearFilters}
                hasActiveFilters={hasActiveFilters}
              />
            )}

            {questions.length === 0 ? (
              <EmptyState
                type="empty"
                onAdd={() => document.getElementById('question-title')?.focus()}
              />
            ) : filteredQuestions.length === 0 ? (
              <EmptyState type="no-results" onClear={clearFilters} />
            ) : (
              <QuestionList
                questions={filteredQuestions}
                onStatusChange={updateQuestionStatus}
                onDelete={deleteQuestion}
              />
            )}

            {questions.length > 0 && (
              <div className="mt-3 flex items-center gap-[7px] text-[10px] text-[#a0a79a]">
                <span className="grid size-[15px] place-items-center rounded-full bg-[#edf3e7] text-[9px] text-[#7c966c]" aria-hidden="true">✓</span>
                Your questions are saved automatically on this device.
              </div>
            )}
          </div>
        </section>

        <footer className="mt-10 flex justify-between border-t border-[#e7e9e1] py-[17px] pb-6 text-[10px] text-[#9ba295] max-[680px]:mt-8">
          <span>One question at a time.</span>
          <span>Made for your next big opportunity <span className="text-[#91a977]" aria-hidden="true">✳</span></span>
        </footer>
      </div>
    </main>
  )
}

export default App
