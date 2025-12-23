import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "./Username";

export default function Header() {
  return (
    <header className="bg-yellow-500 uppercase px-4 sm:px-6 py-3 border-b border-stone-400 flex items-center justify-between ">
      <Link to="/" className="tracking-widest">
        React Pizza
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}
