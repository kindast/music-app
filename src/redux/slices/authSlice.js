import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    user: null,
  },
  reducers: {
    loadToken(state) {
      const storageToken = window.localStorage.getItem("token");
      state.token = storageToken ? storageToken : null;
    },
    setToken(state, action) {
      state.token = action.payload;
      if (action.payload == null) {
        window.localStorage.removeItem("token");
      } else {
        window.localStorage.setItem("token", state.token);
      }
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { loadToken, setToken, setUser } = authSlice.actions;

export default authSlice.reducer;
