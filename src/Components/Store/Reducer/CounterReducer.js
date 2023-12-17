import { createSlice } from "@reduxjs/toolkit";

const initialState = { counter: 0, showPanel: true };
const counterReducer = createSlice({
  name: "counter",
  initialState: initialState,
  reducers: {
    increment(state) {
      state.counter = state.counter + 1;
    },
    decrement(state) {
      state.counter--;
    },
    incrementByDynamicData(state, action) {
      state.counter = state.counter + action.payload;
    },
    
  },
});
export const counterActions = counterReducer.actions;
export default counterReducer;
