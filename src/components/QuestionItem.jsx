import { STATUSES } from '../utils/constants.js'

function QuestionItem({ question, onStatusChange, onDelete }) {
  const difficultyClasses = {
    Easy: 'bg-[#eaf4e8] text-[#4f8651]',
    Medium: 'bg-[#fbf1d9] text-[#a27829]',
    Hard: 'bg-[#fae9e6] text-[#b4584f]',
  }
  const statusClasses = {
    Completed: 'border-[#e0edda] bg-[#edf5e8] text-[#5d8654]',
    'In Progress': 'border-[#f0e6cb] bg-[#fbf4e2] text-[#9c7a36]',
    Pending: 'border-[#e8ebe5] bg-[#f4f5f2] text-[#828a7e]',
  }

  return (
    <article className="flex items-center justify-between gap-[13px] rounded-[11px] border border-[#e7e9e1] bg-white px-[14px] py-[13px] transition-[border-color,transform] hover:-translate-y-px hover:border-[#d5ddcc] max-[420px]:items-start max-[420px]:flex-col">
      <div className="min-w-0">
        <h3 className="mb-2 block overflow-hidden text-ellipsis whitespace-nowrap text-xs font-semibold text-[#32392f]" title={question.title}>{question.title}</h3>
        <div className="flex flex-wrap items-center gap-[6px]">
          <span className="inline-flex min-h-5 items-center rounded-[20px] bg-[#f2f3ef] px-[7px] py-0.5 text-[9px] leading-none font-semibold text-[#727c6e]">{question.category}</span>
          <span className={`inline-flex min-h-5 items-center rounded-[20px] px-[7px] py-0.5 text-[9px] leading-none font-semibold ${difficultyClasses[question.difficulty] || ''}`}>{question.difficulty}</span>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-[7px] max-[420px]:w-full max-[420px]:justify-end">
        <label className="sr-only" htmlFor={`status-${question.id}`}>
          Status for {question.title}
        </label>
        <select
          className={`min-h-[30px] max-w-[124px] cursor-pointer rounded-md border px-[7px] text-[9px] text-[#737d6e] outline-none focus:border-[#88a475] focus:shadow-[0_0_0_3px_rgba(112,143,91,0.13)] max-[420px]:min-h-9 max-[420px]:max-w-none max-[420px]:flex-1 ${statusClasses[question.status] || 'border-[#e8ebe3] bg-[#fafbf8]'}`}
          id={`status-${question.id}`}
          value={question.status}
          onChange={(event) => onStatusChange(question.id, event.target.value)}
        >
          {STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
        </select>
        <button
          className="grid size-[30px] shrink-0 place-items-center rounded-md border border-transparent bg-transparent text-[17px] text-[#9da497] hover:border-[#f1dedb] hover:bg-[#fcf1ef] hover:text-[#b65d53] max-[420px]:size-9"
          type="button"
          onClick={() => onDelete(question.id)}
          aria-label={`Delete ${question.title}`}
          title={`Delete ${question.title}`}
        >
          ×
        </button>
      </div>
    </article>
  )
}

export default QuestionItem
