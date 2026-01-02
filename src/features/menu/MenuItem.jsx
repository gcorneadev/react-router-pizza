import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { addItem, increaseItemQuantity, decreaseItemQuantity } from "../cart/cartSlice";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const cart = useSelector((state) => state.cart.cart);
  const currentItemQuantity = cart.find((item) => item.pizzaId === id)?.quantity || 0;

  const dispatch = useDispatch();

  function handleOnAddToCart() {
    const item = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice,
    };
    dispatch(addItem(item));
  }

  return (
    <li className="flex gap-2 py-2">
      <img
        className={`h-24 rounded-sm ${soldOut ? "grayscale opacity-60" : ""}`}
        src={imageUrl}
        alt={name}
      />
      <div className="flex flex-col flex-1">
        <p className="font-medium">{name}</p>
        <p className="text-sm italic capitalize text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm ">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm uppercase font-medium text-stone-500">
              Sold out
            </p>
          )}
          
          {currentItemQuantity > 0 ? <div>
            <Button type="small" onClick={() => dispatch(decreaseItemQuantity(id))}>-</Button>
            <span className="px-2">{currentItemQuantity}</span>
            <Button type="small" onClick={() => dispatch(increaseItemQuantity(id))}>+</Button>
          </div> : <Button type="small" onClick={handleOnAddToCart}>Add to cart</Button>}        
          </div>
      </div>
    </li>
  );
}

export default MenuItem;
