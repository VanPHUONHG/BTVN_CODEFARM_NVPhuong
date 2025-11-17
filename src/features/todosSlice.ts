import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { addTodoApi, deleteTodoApi, updateTodoApi } from "../Apis/TodosApi";
import type { Todo, TodoState } from "../Type/todos";

// ------------------------- Initial State -------------------------
const initialState: TodoState = {
    todos: [],
    loading: false,
    error: null,
};

// ------------------------- Async Thunks -------------------------
const API_URL = "https://api-class-o1lo.onrender.com/api/v1/todos";

// --- READ ---
export const fetchTodos = createAsyncThunk("todos/fetch", async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    return data.data as Todo[];
});

export const addTodo = createAsyncThunk<Todo, { name: string; description?: string; priority?: number }>(
    "todos/addTodo",
    async (todoData) => {
        return await addTodoApi(todoData);
    }
);

export const updateTodo = createAsyncThunk<Todo, { id: string; todo: Partial<Todo> }>(
    "todos/updateTodo",
    async ({ id, todo }) => {
        return await updateTodoApi(id, todo);
    }
);

export const deleteTodo = createAsyncThunk<string, string>(
    "todos/deleteTodo",
    async (id) => {
        await deleteTodoApi(id);
        return id;
    }
);

export const toggleCompleteTodo = createAsyncThunk<Todo, string, { state: { todos: TodoState } }>(
    "todos/toggleCompleteTodo",
    async (id, { getState }) => {
        const state = getState();
        const todo = state.todos.todos.find((t) => t._id === id);
        if (!todo) throw new Error("Todo not found");
        return await updateTodoApi(id, { completed: !todo.completed });
    }
);

// ------------------------- Slice -------------------------
const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // FETCH
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
                state.loading = false;
                state.todos = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchTodos.rejected, (state) => {
                state.loading = false;
                state.error = "Không thể tải danh sách công việc";
            })

            // ADD
            .addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
                state.todos.push(action.payload);
            })

            // UPDATE
            .addCase(updateTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
                state.todos = state.todos.map((t) =>
                    t._id === action.payload._id ? action.payload : t
                );
            })

            // DELETE
            .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<string>) => {
                state.todos = state.todos.filter((t) => t._id !== action.payload);
            })

            // TOGGLE
            .addCase(toggleCompleteTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
                state.todos = state.todos.map((t) =>
                    t._id === action.payload._id ? action.payload : t
                );
            });
    },
});

export default todoSlice.reducer;

// ------------------------- Types -------------------------

