import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./slices/jobSlice";
// import { config } from "process";
import userReducer from "./slices/jobSlice";
const store = configureStore({
  reducer: {
    jobs: jobReducer,
    user: userReducer,
  },
});

export default store;
