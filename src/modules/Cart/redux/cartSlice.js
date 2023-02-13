import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const alreadyProduct = state.cart.find(
        (p) =>
          p.id === action.payload.id &&
          p.product_size === action.payload.product_size
      );
      if (alreadyProduct) {
        const index = state.cart.findIndex((p) => p.id === action.payload.id);
        state.cart[index].product_quantity += Number(action.payload.product_quantity)
      } else state.cart.push(action.payload);
    },
    discountProduct: (state, action) => {
      const index = state.cart.findIndex((p) => p.id === action.payload.id && p.product_size === action.payload.size);
      state.cart[index].product_quantity--;
    },
    increaseProduct: (state, action) => {
      const index = state.cart.findIndex((p) => p.id === action.payload.id && p.product_size === action.payload.size);
      state.cart[index].product_quantity++;
    },
    removeProduct: (state, action) => {
      const index = state.cart.findIndex((p) => p.id === action.payload.id && p.product_size === action.payload.size);
      state.cart.splice(index, 1)
    },
    resetCart: (state) => {
      state.cart = []
    }
  },
});

export const { addToCart, discountProduct, increaseProduct, removeProduct, resetCart } =
  cartSlice.actions;

export default cartSlice;
