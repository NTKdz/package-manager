import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Package } from "../interface/packageInterface";

const initialState = {
  package: {
    waybill: 0,
    company: "",
    status: "pending",
    cpn: "",
    department: "",
  },
};
export const packageSlice = createSlice({
  name: "package",
  initialState: initialState,
  reducers: {
    setPackage: (state, action: PayloadAction<Package>) => {
      state.package = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPackage } = packageSlice.actions;

export default packageSlice.reducer;
