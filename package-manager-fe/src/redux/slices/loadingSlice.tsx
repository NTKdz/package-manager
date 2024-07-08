import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isAuth: false,
};
export const loadingSlice = createSlice({
  name: "package",
  initialState: initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoading, setAuth } = loadingSlice.actions;

export default loadingSlice.reducer;
