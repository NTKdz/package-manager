import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  departments: [{
    departmentCd: "AMC010113",
    id: "25",
    lever: "L2",
    departmentName: "Khối Thu hồi nợ Quản trị",
    addRess: null,
    type: "V",
    parentId: "5",
    status: "ACTIVE",
  }],
};
export const departmentSlice = createSlice({
  name: "department",
  initialState: initialState,
  reducers: {
    setDepartments: (state, action) => {
      state.departments = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDepartments } = departmentSlice.actions;

export default departmentSlice.reducer;
