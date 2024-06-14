import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PackageInterface } from "../../interface/packageInterface";

const initialState = {
  requestedPackage: [
    {
      waybill: 0,
      user: "",
      userFullName: "",
      requestedDate: new Date(),
      department: "",
      company: "",
      cpn: "",
      priority: "",
      confidentiality: "",
    },
  ],
};
export const packageSlice = createSlice({
  name: "package",
  initialState: initialState,
  reducers: {
    setPackage: (state, action: PayloadAction<PackageInterface[]>) => {
      state.requestedPackage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPackage } = packageSlice.actions;

export default packageSlice.reducer;
