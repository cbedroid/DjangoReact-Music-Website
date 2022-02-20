
import albumReducer from "./album"
import { configureStore } from "@reduxjs/toolkit";


export const store = configureStore({
  reducer: { music: albumReducer },
});
