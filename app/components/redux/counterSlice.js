import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};



export const counterSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const data = action.payload;
      //  console.log("data===>",state.items);

      return { ...state, items: [...state.items, data] };
    },

    removeFromToCart: (state, action) => {
      const itemIdToRemove = action.payload;

      state.items = state.items.filter((item) => item.id !== itemIdToRemove);


      console.log("Updated Cart after removal===>", state.items);
      console.log("Removed Item ID===>", action.payload);
    },
    resetCart: (state) => {
      state.items = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromToCart,resetCart } = counterSlice.actions;

export default counterSlice.reducer;
