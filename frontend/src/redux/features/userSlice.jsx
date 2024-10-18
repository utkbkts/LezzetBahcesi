import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  toggleMenu: false,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setisAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setToggleMenu(state) {
      state.toggleMenu = !state.toggleMenu;
    },
  },
});

export default userSlice.reducer;
export const { setUser, setisAuthenticated, setLoading, setToggleMenu } =
  userSlice.actions;
