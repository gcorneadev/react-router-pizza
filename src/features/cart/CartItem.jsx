import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { useDispatch } from "react-redux";
import { deleteItem } from "./cartSlice";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const dispatch = useDispatch();

  return (
    <li className="flex justify-between items-center py-2">
      <p>
        {quantity}&times; {name}
      </p>
      <div className="flex items-center gap-2">
        <p>{formatCurrency(totalPrice)}</p>
        <Button type="small" onClick={() => dispatch(deleteItem(pizzaId))}>Delete</Button>
      </div>
    </li>
  );
}

export default CartItem;
