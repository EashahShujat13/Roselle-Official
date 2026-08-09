export default function SortDropdown({
  sort,
  setSort,
}) {
  return (
    <div className="
      flex
      items-center
      gap-3
    ">

      <span className="
        uppercase
        tracking-[2px]
        text-[10px]
        text-[#81768F]
      ">
        Sort
      </span>

      <select
        value={sort}
        onChange={(e) =>
          setSort(e.target.value)
        }
        className="
          min-w-[180px]
          h-12
          bg-white
          border
          border-[#DCCFE8]
          px-4
          text-sm
          text-[#655B75]
          outline-none
          focus:border-[#B48CF0]
          transition
        "
      >

        <option value="default">
          Featured
        </option>

        <option value="price-low">
          Price: Low to High
        </option>

        <option value="price-high">
          Price: High to Low
        </option>

        <option value="name">
          Name: A-Z
        </option>

      </select>

    </div>
  );
}