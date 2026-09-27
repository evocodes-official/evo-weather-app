import { useState } from "react";

function Search({ setCity }) {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const value = search.trim();

    if (!value) {
      return;
    }
    setCity(value);
    setSearch("");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col sm:flex-row gap-3"
    >
      {/* Search input */}
      <div className="flex-1">

        <input
          type="text"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search for a city..."
          className="
            w-full
            h-14
            px-5
            rounded-2xl
            bg-white
            text-gray-800
            text-base
            sm:text-lg
            outline-none
            border-2
            border-transparent
            focus:border-blue-500
            transition
            placeholder:text-gray-400
          "
        />

      </div>

      {/* Button */}

      <button
        type="submit"
        className="
          h-14
          px-7
          rounded-2xl
          bg-gradient-to-r
          from-blue-500
          to-indigo-600
          hover:from-blue-600
          hover:to-indigo-700
          text-white
          font-semibold
          text-base
          sm:text-lg
          shadow-lg
          transition
          active:scale-95
          whitespace-nowrap
        "
      >
        Get Weather
      </button>

    </form>
  );
}

export default Search;