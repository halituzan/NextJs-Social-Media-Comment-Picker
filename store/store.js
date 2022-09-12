import { createWrapper } from "next-redux-wrapper";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import dataReducer from "./dataSlice";

const combineReducer = combineReducers({
  dataReducer,
});

export const store = () =>
  configureStore({
    reducer: {
      datas: dataReducer,
    },
  });

export const wrapper = createWrapper(store);
