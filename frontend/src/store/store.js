import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./slices/jobSlice";
// import { config } from "process";
import userReducer from "./slices/jobSlice";
import applicationReducer from "./slices/applicationSlice";
import updateProfileReducer from "./slices/updateProfileSlice";

const store = configureStore({
  reducer: {
    jobs: jobReducer,
    user: userReducer,
    applications: applicationReducer,
    updateProfile: updateProfileReducer,
  },
});

export default store;
