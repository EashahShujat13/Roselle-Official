import { Search, X } from "lucide-react";

export default function SearchBar({
  keyword,
  setKeyword,
}) {
  return (
    <div className="
      relative
      w-full
      sm:w-[280px]
    ">

      <Search
        size={17}
        className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-[#8A7A98]
        "
      />

      <input
        type="text"
        value={keyword}
        onChange={(e) =>
          setKeyword(e.target.value)
        }
        placeholder="Search jewellery..."
        className="
          w-full
          h-12
          pl-11
          pr-10
          bg-white
          border
          border-[#E4DAED]
          outline-none
          text-sm
          text-[#514064]
          placeholder:text-[#AAA0B3]
          focus:border-[#B48CF0]
          transition
        "
      />

      {keyword && (
        <button
          type="button"
          onClick={() =>
            setKeyword("")
          }
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-[#8A7A98]
            hover:text-[#514064]
            transition
          "
        >
          <X size={15} />
        </button>
      )}

    </div>
  );
}