import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalItems, getTotalPrice } from "./cartSlice";

function CartOverview() {

  const totalItems = useSelector(getTotalItems);
  const totalPrice = useSelector(getTotalPrice);

  // calculate total item in the useSelector hook   
  // const totalItems = useSelector((state) => 
  //   state.cart.cart.reduce((total, item) => total + item.quantity, 0)
  // );

  // calculate total price in the useSelector hook
  // const totalPrice = useSelector((state) => 
  //   state.cart.cart
  //     .reduce((total, item) => total + item.quantity * item.unitPrice, 0)
  //     .toFixed(2)
  // );

  if (totalItems === 0) return null;

  return (
    <div className="p-4 sm:px-6 bg-stone-800 text-stone-300 uppercase text-sm md:text-base flex justify-between items-center">
      <p className="space-x-4">
        <span className="font-semibold">{totalItems} pizzas</span>
        <span>${totalPrice}</span>
      </p>
      <Link to="cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
