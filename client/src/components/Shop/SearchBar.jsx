import { Search } from "lucide-react";

export default function SearchBar({

  keyword,

  setKeyword,

}) {

  return (

    <div className="max-w-7xl mx-auto px-6 py-10">

      <div className="relative">

        <Search
          className="
          absolute
          left-5
          top-1/2
          -translate-y-1/2
          text-gray-400
          "
        />

        <input
          type="text"

          value={keyword}

          onChange={(e) => setKeyword(e.target.value)}

          placeholder="Search Jewellery..."

          className="
          w-full
          pl-14
          pr-5
          py-4
          rounded-full
          border
          border-[#E6D9FF]
          outline-none
          focus:border-[#B48CF0]
          "
        />

      </div>

    </div>

  );

}