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
      />
    </form>
  );
}
