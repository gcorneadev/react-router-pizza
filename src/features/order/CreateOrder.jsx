import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import store from "../../store";
import { clearCart, getTotalPrice } from "../cart/cartSlice";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";


// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

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

function CreateOrder() {

  const dispatch = useDispatch();

  const username = useSelector((state) => state.user.name);
  const address = useSelector((state) => state.user.address);

  const [withPriority, setWithPriority] = useState(false);
  const itemsPrice = useSelector(getTotalPrice);
  const totalPrice = withPriority ? (Number(itemsPrice) * 0.2 + Number(itemsPrice)).toFixed(2) : itemsPrice;

  const cart = fakeCart;
  // gives access to data recived by route
  const formErrors = useActionData();
  // gives access to state
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  function handleGetMyAddress(e) {
    e.preventDefault();
    dispatch(fetchAddress());
  }

  return (
    <div className="px-4 py-6">
      
      <h2 className="font-semibold text-xl mb-6">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input className="input w-full" type="text" name="customer" defaultValue={username} required />
        </div>

        

        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="w-full">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && <p className="text-sm text-red-400 bg-red-100 p-2 mt-2 rounded-lg">{formErrors.phone}</p>}
          </div>
        </div>

        

        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
            <div className="flex gap-2 w-full">
              {/* class inout defined in index.css */}
            <input className="input w-full" type="text" name="address" defaultValue={address} required />
            <Button className="w-fit" type="small" onClick={handleGetMyAddress} >
              Get my address
            </Button>
            </div>
            
        </div>

        <div className="flex gap-2 items-center mb-6">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-500  border border-stone-200 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-semibold text-sm" htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting ? "Placing order ..." : `Order now ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // console.log(data);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };
  // console.log(order);

  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone = "Invalid phone number! Please provide a valid phone!";
  }

  if (Object.keys(errors).length > 0) return errors;

  // create new order if no errors
  const newOrder = await createOrder(order);

  // clear cart
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
