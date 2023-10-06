import { configureStore } from "@reduxjs/toolkit";
import documentReducer from "./features/document/index";

const store = configureStore({
  reducer: {
    document: documentReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
