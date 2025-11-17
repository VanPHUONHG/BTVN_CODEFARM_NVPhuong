// store.ts
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todosSlice";

export const store = configureStore({
    reducer: {
        todos: todoReducer,
    },
});

// Type của state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
