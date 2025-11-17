import { api } from ".";
import type { Todo, TodoInput } from "../Type/todos";

export const getTodosApi = async (): Promise<Todo[]> => {
    const { data } = await api.get("/todos");
    return Array.isArray(data) ? data : data.todos ?? [];
};

export const getTodosById = async (id: string): Promise<Todo> => {
    const { data } = await api.get(`/todos/${id}`);
    return data;
};

export const addTodoApi = async (todo: TodoInput): Promise<Todo> => {
    const { data } = await api.post("/todos", todo);
    return data;
};

export const updateTodoApi = async (id: string, todo: Partial<Todo>): Promise<Todo> => {
    const { data } = await api.put(`/todos/${id}`, todo);
    return data;
};

export const deleteTodoApi = async (id: string): Promise<{ success: boolean }> => {
    const { data } = await api.delete(`/todos/${id}`);
    return data;
};
