import { combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware } from '@reduxjs/toolkit'
import userSlice from './slices/user'

const reducer = combineReducers({
  user: userSlice,
})

const middleware = [thunk];

export const store = createStore(
  reducer,
  {},
  composeWithDevTools(applyMiddleware(...middleware))
);

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch