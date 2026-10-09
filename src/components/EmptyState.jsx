function EmptyState({ type, onAdd, onClear }) {
  const isEmpty = type === 'empty'

  return (
    <div className="flex min-h-[210px] flex-col items-center justify-center rounded-xl border border-dashed border-[#dfe4d8] bg-white/60 p-[25px] text-center">
      <span className="mb-3 grid size-[43px] place-items-center rounded-[13px] bg-[#f0f4e9] font-serif text-[21px] text-[#728963]" aria-hidden="true">{isEmpty ? '✳' : '⌕'}</span>
      <h3 className="m-0 font-serif text-lg font-medium text-[#475144]">{isEmpty ? 'Your practice queue is clear' : 'No matching questions'}</h3>
      <p className="mt-[7px] mb-[13px] max-w-[250px] text-[11px] leading-[1.55] text-[#929a8c]">
        {isEmpty
          ? 'Start building a focused practice list. Add a question you want to tackle.'
          : 'Try a different search or adjust your filters to find what you need.'}
      </p>
      {isEmpty ? (
        <button className="min-h-[34px] cursor-pointer rounded-[7px] border border-[#dfe8d7] bg-white px-[13px] text-[10px] font-semibold text-[#59724d] hover:bg-[#f2f6ed]" type="button" onClick={onAdd}>Add your first question</button>
      ) : (
        <button className="min-h-[34px] cursor-pointer rounded-[7px] border border-[#dfe8d7] bg-white px-[13px] text-[10px] font-semibold text-[#59724d] hover:bg-[#f2f6ed]" type="button" onClick={onClear}>Clear filters</button>
      )}
    </div>
  )
}

export default EmptyState
