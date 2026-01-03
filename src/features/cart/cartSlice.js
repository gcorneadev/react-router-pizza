import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],

// cart: [
//     {
//         pizzaId: 12,
//         name: "Mediterranean",
//         quantity: 2,
//         unitPrice: 16,
//         totalPrice: 32,
//     }
// ],
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
        // payload is a new item
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
        // payload is pizzaId
      const pizzaId = action.payload;
      state.cart = state.cart.filter(item => item.pizzaId !== pizzaId);
    },
    increaseItemQuantity(state, action) {
      const pizzaId = action.payload;
      const item = state.cart.find(item => item.pizzaId === pizzaId);
      if (item) {
        item.quantity += 1;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    decreaseItemQuantity(state, action) {
      const pizzaId = action.payload;
      const item = state.cart.find(item => item.pizzaId === pizzaId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    clearCart(state) {
      state.cart = [];
    }
  },
});

export const getCart = state => state.cart.cart;

export const getTotalItems = state => 
    state.cart.cart.reduce((total, item) => total + item.quantity, 0)
  
export const getTotalPrice = state => 
    state.cart.cart
      .reduce((total, item) => total + item.quantity * item.unitPrice, 0)
      .toFixed(2)


export const { addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;


