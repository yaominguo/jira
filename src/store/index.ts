import { configureStore } from "@reduxjs/toolkit";
import { listSlice } from "screens/project-list/list-slice";

export const rootReducer = {
  projectList: listSlice.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
