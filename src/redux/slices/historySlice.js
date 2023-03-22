import { createSlice } from "@reduxjs/toolkit";

const historySlice = createSlice({
  name: "history",
  initialState: {
    routes: [],
    routeId: -1,
  },
  reducers: {
    addRoute(state, action) {
      state.routes.push(action.payload);
      state.routeId++;
    },
    nextRoute(state) {
      if (state.routeId !== state.routes.length - 1) {
        state.routeId = state.routeId + 1;
      }
    },
    previousRoute(state) {
      if (state.routeId !== 0) {
        state.routeId = state.routeId - 1;
      }
    },
  },
});

export const { addRoute, nextRoute, previousRoute } = historySlice.actions;

export default historySlice.reducer;
