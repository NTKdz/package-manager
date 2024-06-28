import { configureStore } from "@reduxjs/toolkit";
import loadingSlice from "./slices/loadingSlice";
import packageSlice from "./slices/packageSlice";
import departmentSlice from "./slices/departmentSlice";

const store = configureStore({
  reducer: {
    loading: loadingSlice,
    package: packageSlice,
    departments: departmentSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
