import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./slices/jobSlice";
// import { config } from "process";

const store = configureStore({
  reducer: {
    jobs: jobReducer,
  },
});

export default store;
