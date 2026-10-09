function StatCard({ label, value, subtitle, icon }) {
  return (
    <article className="relative min-h-[131px] overflow-hidden rounded-[13px] border border-[#e7e9e1] bg-white p-[18px] px-[19px] after:absolute after:-right-[25px] after:-bottom-[43px] after:size-[100px] after:rounded-full after:border after:border-[#f0f2eb] after:content-[''] max-[680px]:min-h-[116px] max-[680px]:p-[14px]">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold text-[#7f887b]">{label}</span>
        <span className="grid size-[27px] place-items-center rounded-lg bg-[#f2f5ec] text-[13px] font-bold text-[#688456]" aria-hidden="true">{icon}</span>
      </div>
      <strong className="mt-[13px] block font-serif text-[31px] leading-none font-medium text-[#22291f] max-[680px]:mt-[11px] max-[680px]:text-[28px]">{value}</strong>
      <span className="mt-2 block text-[10px] text-[#9aa194]">{subtitle}</span>
    </article>
  )
}

export default StatCard
