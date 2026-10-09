import { CATEGORIES, DIFFICULTIES, STATUSES } from '../utils/constants.js'

function Filters({
  search,
  filters,
  onSearchChange,
  onFilterChange,
  onClear,
  hasActiveFilters,
}) {
  return (
    <div className="mb-[11px] rounded-[11px] border border-[#e7e9e1] bg-white p-3" aria-label="Search and filter questions">
      <label className="relative mb-2.5 block">
        <span className="absolute top-1/2 left-3 -translate-y-[52%] text-[17px] text-[#929c8b]" aria-hidden="true">⌕</span>
        <span className="sr-only">Search questions by title</span>
        <input
          className="h-[39px] w-full rounded-[7px] border border-[#e3e7de] bg-white py-0 pr-[11px] pl-9 text-xs text-[#384035] outline-none transition-[border-color,box-shadow] placeholder:text-[#b0b6ab] focus:border-[#88a475] focus:shadow-[0_0_0_3px_rgba(112,143,91,0.13)]"
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search questions..."
        />
      </label>
      <div className="grid grid-cols-[repeat(3,minmax(0,1fr))_auto] items-end gap-2 max-[900px]:grid-cols-3 max-[420px]:grid-cols-2">
        <FilterSelect
          id="filter-category"
          label="Category"
          value={filters.category}
          options={CATEGORIES}
          onChange={(value) => onFilterChange('category', value)}
        />
        <FilterSelect
          id="filter-status"
          label="Status"
          value={filters.status}
          options={STATUSES}
          onChange={(value) => onFilterChange('status', value)}
        />
        <FilterSelect
          id="filter-difficulty"
          label="Difficulty"
          value={filters.difficulty}
          options={DIFFICULTIES}
          onChange={(value) => onFilterChange('difficulty', value)}
        />
        {hasActiveFilters && (
          <button className="min-h-[34px] cursor-pointer border-0 bg-transparent px-[5px] text-[10px] font-semibold whitespace-nowrap text-[#718664] hover:text-[#3c6042] hover:underline max-[900px]:col-span-full max-[900px]:min-h-6 max-[900px]:justify-self-start max-[900px]:px-0" type="button" onClick={onClear}>
            Clear filters
          </button>
        )}
      </div>
    </div>
  )
}

function FilterSelect({ id, label, value, options, onChange }) {
  return (
    <div className="min-w-0 max-[420px]:last-of-type:col-span-full">
      <label className="mb-1 block text-[9px] font-semibold text-[#8c9488]" htmlFor={id}>{label}</label>
      <select className="h-[34px] w-full rounded-[7px] border border-[#e3e7de] bg-white px-2 text-[10px] text-[#384035] outline-none focus:border-[#88a475] focus:shadow-[0_0_0_3px_rgba(112,143,91,0.13)]" id={id} value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">All</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </div>
  )
}

export default Filters
