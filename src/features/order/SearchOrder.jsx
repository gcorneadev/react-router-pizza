import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleOnSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <input
        type="text"
        placeholder="Search for your order"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-yellow-200 p-2 rounded-full text-sm placeholder:text-stone-400 w-40 sm:w-64 md:w-96 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:opacity-80"
      />
    </form>
  );
}
