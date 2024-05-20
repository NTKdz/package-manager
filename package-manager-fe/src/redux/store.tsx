import { configureStore } from "@reduxjs/toolkit";
import loadingSlice from "./slices/loadingSlice";
import packageSlice from "./slices/packageSlice";

const store = configureStore({
  reducer: {
    loading: loadingSlice,
    package: packageSlice,
  },
});

export default store;
