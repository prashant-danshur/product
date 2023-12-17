import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./Reducer/CounterReducer";
// import authenticationReducer from "./reducer/authentication-reducer";

const store = configureStore({
  reducer: {
    counter: counterReducer.reducer,
    // authentication: authenticationReducer.reducer,
  },
});

export default store;
