import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};



export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const data = action.payload;
      //  console.log("data===>",state.items);

      return { user:data };
    },

    removeUser: (state, action) => {
     console.log("removeUser===>");

      return { user:{} };
    },
    resetUser: (state) => {
      state.user = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUser, removeUser,resetUser } = userSlice.actions;

export default userSlice.reducer;
