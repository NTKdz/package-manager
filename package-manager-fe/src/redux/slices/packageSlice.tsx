import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PackageInterface } from "../../interface/packageInterface";

const initialState = {
  requestedPackage: [
    {
      waybill: 0,
      user: "",
      userFullName: "",
      requestedDate: "",
      department: "",
      company: "",
      cpn: "",
      priority: "",
      confidentiality: "",
    },
  ],
  query: {
    size: 20,
    page: 0,
    name: "",
    requestedDate: "",
    department: "",
    cpn: "",
    priority: "",
    confidentiality: "",
  },
  total: 0,
};
export const packageSlice = createSlice({
  name: "package",
  initialState: initialState,
  reducers: {
    setPackage: (state, action: PayloadAction<PackageInterface[]>) => {
      state.requestedPackage = action.payload;
    },
    setQuery: (
      state,
      action: PayloadAction<{
        size: number;
        page: number;
        name: string;
        requestedDate: string;
        department: string;
        cpn: string;
        priority: string;
        confidentiality: string;
      }>
    ) => {
      state.query = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.query.size = action.payload;
    },
    setPageIndex: (state, action: PayloadAction<number>) => {
      state.query.page = action.payload;
    },
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
  },
});

export const { setPackage, setQuery, setPageIndex, setPageSize,setTotal } =
  packageSlice.actions;

export default packageSlice.reducer;
