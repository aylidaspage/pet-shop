import { createSlice } from "@reduxjs/toolkit";

// helpers
const unit = (item) => Number(item.discount_price ?? item.price) || 0;
// to get price for 1 unit (with a discount), ??  otherwise if there's no discount takes the original one.
// Allways gives Number() - '19.00' -> 19.00

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },

  reducers: {
    addToCart(state, action) {
      const it = action.payload; // {id,title,price,discount_price,image, qty?}
      const found = state.items.find((i) => i.id === it.id);
      if (found) {
        found.qty += it.qty ? Number(it.qty) || 1 : 1;
      } else {
        state.items.push({
          id: it.id,
          title: it.title ?? "Untitled",
          price: Number(it.price) || 0,
          discount_price:
            it.discount_price != null ? Number(it.discount_price) : null,
          image: it.image || "",
          qty: it.qty ? Number(it.qty) || 1 : 1,
        });
      }
    },

    removeFromCart(state, action) {
      const actionId = action.payload;
      state.items = state.items.filter((i) => i.id !== actionId);
    },

    inc(state, action) {
      const actionId = action.payload;
      const f = state.items.find((i) => i.id === actionId);
      if (f) f.qty += 1;
    },

    dec(state, action) {
      const actionId = action.payload;
      const f = state.items.find((i) => i.id === actionId);
      if (f && f.qty > 1) f.qty -= 1;
    },

    clearCart(state) {
      state.items = [];
    },
  },
});

// селекторы (удобно использовать в компонентах)
export const selectCartItems = (s) => s.cart.items;
export const selectCartCount = (s) =>
  s.cart.items.reduce((n, i) => n + i.qty, 0);
export const selectCartTotal = (s) =>
  s.cart.items.reduce((sum, i) => sum + unit(i) * i.qty, 0);

export const { addToCart, removeFromCart, inc, dec, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
