import { configureStore } from "@reduxjs/toolkit";
import queue from "./slices/queueSlice";
import auth from "./slices/authSlice";
import history from "./slices/historySlice";

export const store = configureStore({
  reducer: { queue, auth, history },
});
