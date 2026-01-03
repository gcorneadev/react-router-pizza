import { Link } from "react-router-dom";
import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { getCart, clearCart, getTotalItems } from "./cartSlice";
import { use } from "react";
 

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function Cart() {

  const dispatch = useDispatch();

  // const cart = useSelector((state) => state.cart.cart);
  const cart = useSelector(getCart);
  const totalItems = useSelector(getTotalItems);
  const username = useSelector((state) => state.user.name);

  return (
    <div className="px-4 py-3">
  <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      {/* <Link className="text-sm text-blue-500 hover:text-blue-600" to="/menu">
        &larr; Back to menu
      </Link> 
      
      
      */}

      <h2 className="mt-7 text-xl font-semibold">Your cart, {!totalItems && <span>is empty!, </span>} {username}</h2>

      <ul className="divide-y divide-stone-200">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId}></CartItem>
        ))}
      </ul>

      {totalItems > 0 && <div className="flex gap-4 items-center">
        {/* <Link to="/order/new">Order pizzas</Link> */}
        <Button to="/order/new" type="primary">
          Order pizzas
        </Button>
        <Button type="secondary" onClick={() => dispatch(clearCart())}>Clear Cart</Button>
      </div>}
    </div>
  );
}

export default Cart;
