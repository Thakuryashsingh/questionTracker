import { STATUSES } from '../utils/constants.js'
import StatCard from './StatCard.jsx'

function Dashboard({ stats, machineCodingStatus, onMachineCodingStatusChange }) {
  return (
    <section className="grid grid-cols-2 gap-[9px] min-[681px]:grid-cols-4 min-[681px]:gap-[14px]" aria-label="Practice statistics">
      <StatCard
        label="Total questions"
        value={stats.totalQuestions}
        subtitle="In your practice queue"
        icon="◎"
      />
      <StatCard
        label="DSA completed"
        value={stats.completedDsa}
        subtitle="Problems solved"
        icon="⌘"
      />
      <StatCard
        label="Interview questions"
        value={stats.completedInterview}
        subtitle="Git + technical completed"
        icon="↗"
      />
      <article className="relative min-h-[116px] overflow-hidden rounded-[13px] border border-[#e7e9e1] bg-white p-[14px] after:absolute after:-right-[25px] after:-bottom-[43px] after:size-[100px] after:rounded-full after:border after:border-[#f0f2eb] after:content-[''] min-[681px]:min-h-[131px] min-[681px]:p-[18px] min-[681px]:px-[19px]">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-semibold text-[#7f887b]" htmlFor="machine-coding-status">Machine coding</label>
          <span className="grid size-[27px] place-items-center rounded-lg bg-[#f2f5ec] text-[13px] font-bold text-[#688456]" aria-hidden="true">▤</span>
        </div>
        <select
          className="relative z-[1] mt-[11px] w-full max-w-[180px] cursor-pointer border-0 bg-transparent py-[5px] pr-[25px] text-base font-bold text-[#556d4b] min-[681px]:mt-[13px]"
          id="machine-coding-status"
          value={machineCodingStatus}
          onChange={(event) => onMachineCodingStatusChange(event.target.value)}
          aria-label="Machine coding status"
        >
          {STATUSES.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        <span className="mt-2 block text-[10px] text-[#9aa194]">Your coding practice status</span>
      </article>
    </section>
  )
}

export default Dashboard
