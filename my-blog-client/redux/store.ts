import { combineReducers, AnyAction } from "redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/user'
import categoriesSlice from "./slices/categories";
import articlesSlice from "./slices/articles";

const combineReducer = combineReducers({
  user: userSlice,
  categories: categoriesSlice,
  articles: articlesSlice
})

const reducer = (state: ReturnType<typeof combineReducer>, action: AnyAction) => {
   if (action.type === HYDRATE) {
    const next = {
      ...state, 
      ...action.payload,
    };
    
    if (state.user) {
      next.user = state.user;
    }
    
    return next;
  } else {
    return combineReducer(state, action);
  }
};

const makeStore = () => configureStore({
  reducer,
  devTools: true
})

type Store = ReturnType<typeof makeStore>;

export type AppDispatch = Store['dispatch'];
export type RootState = ReturnType<Store['getState']>;

export const wrapper = createWrapper(makeStore);