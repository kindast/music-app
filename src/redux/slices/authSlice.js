import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
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
  },
});

export const { loadToken, setToken } = authSlice.actions;

export default authSlice.reducer;
