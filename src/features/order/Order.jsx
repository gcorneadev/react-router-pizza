// Test ID: IIDSAT
import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";

import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";

const order = {
  id: "ABCDEF",
  customer: "Jonas",
  phone: "123456789",
  address: "Arroios, Lisbon , Portugal",
  priority: true,
  estimatedDelivery: "2027-04-25T10:00:00",
  cart: [
    {
      pizzaId: 7,
      name: "Napoli",
      quantity: 3,
      unitPrice: 16,
      totalPrice: 48,
    },
    {
      pizzaId: 5,
      name: "Diavola",
      quantity: 2,
      unitPrice: 16,
      totalPrice: 32,
    },
    {
      pizzaId: 3,
      name: "Romana",
      quantity: 1,
      unitPrice: 15,
      totalPrice: 15,
    },
  ],
  position: "-9.000,38.000",
  orderPrice: 95,
  priorityPrice: 19,
};

function Order() {
  const orderData = useLoaderData();
  const fetcher = useFetcher();

  useEffect(function(){
    if (!fetcher.data && fetcher.state === "idle") {
      fetcher.load(`/menu`);
    }
  },[fetcher]);

  // console.log("Order data:", fetcher.data);

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = orderData;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div>
      <div>
        <h2 className="my-4 pr-4 font-bold flex justify-between">Order {id} Status 
          <div className="space-x-4">
            {priority && <span className="bg-red-400 py-1 px-2 rounded-xl uppercase">Priority</span>} 
            <span className="bg-green-500 py-1 px-2 rounded-xl uppercase">preparing order</span> 
          </div>
        </h2>
      </div>

      <div className="bg-stone-300 rounded-lg p-3 flex justify-between items-center">
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      {cart.map((item) => (
        <div
          key={item.pizzaId}
          className="flex justify-between items-center py-2 border-b border-stone-200"
        >
          <div>
            <p className="font-semibold">{item.name} &times; {item.quantity}</p>
            <p className="text-sm text-stone-500">
              Ingredients: {fetcher?.data?.find(el=>el.id === item.pizzaId)?.ingredients.join(", ")}
            </p>
          </div>
          <p className="font-semibold">{formatCurrency(item.totalPrice)}</p>
        </div>
      ))}

      <div>
        <p>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p>To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
      {!priority && <UpdateOrder order={orderData} />}
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
