function ProgressBar({ completed, total }) {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <div
      role="progressbar"
      aria-label="Overall question completion"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuenow={percentage}
    >
      <div className="h-2 overflow-hidden rounded-[10px] bg-[#eef0e9]">
        <div className="h-full rounded-[inherit] bg-gradient-to-r from-[#789468] to-[#a8ba81] transition-[width] duration-300" style={{ width: `${percentage}%` }} />
      </div>
      <div className="mt-[7px] flex justify-between text-[10px] text-[#8b9385]">
        <span>Keep showing up — you&apos;re doing great</span>
        <strong className="text-[11px] text-[#637d56]">{percentage}%</strong>
      </div>
    </div>
  )
}

export default ProgressBar
