import { Link } from "react-router-dom";

function CartOverview() {
  return (
    <div className="p-4 sm:px-6 bg-stone-800 text-stone-300 uppercase text-sm md:text-base flex justify-between items-center">
      <p className="space-x-4">
        <span className="font-semibold">23 pizzas</span>
        <span>$23.45</span>
      </p>
      <Link to="cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
