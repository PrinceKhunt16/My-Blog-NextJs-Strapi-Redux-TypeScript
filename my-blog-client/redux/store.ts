import { combineReducers, AnyAction } from "redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/user'
import categoriesSlice from "./slices/categories";
import articlesSlice from "./slices/articles";
import signupSlice from "./slices/signup";
import signinSlice from "./slices/signin";
import writeSlice from "./slices/write";
import articleSlice from "./slices/article";

const combineReducer = combineReducers({
  user: userSlice,
  categories: categoriesSlice,
  articles: articlesSlice,
  signup: signupSlice,
  signin: signinSlice,
  write: writeSlice,
  article: articleSlice
})

const reducer = (state: ReturnType<typeof combineReducer>, action: AnyAction) => {
   if (action.type === HYDRATE) {
    const next = {
      ...state, 
      ...action.payload,
    };
    
    if (state.write) next.write = state.write;
    if (state.user) next.user = state.user;
    if (state.signup) next.signup = state.signup;
    if (state.signin) next.signin = state.signin;
    
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