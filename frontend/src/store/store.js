import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./slices/jobSlice";
// import { config } from "process";
import userReducer from "./slices/jobSlice";
import applicationReducer from "./slices/applicationSlice";
const store = configureStore({
  reducer: {
    jobs: jobReducer,
    user: userReducer,
    applications: applicationReducer,
  },
});

export default store;
