export interface Todo {
    _id: string;
    name: string;
    description?: string;
    completed: boolean;
    priority?: number;
    dueDate?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface TodoState {
    todos: Todo[];
    loading: boolean;
    error: string | null;
}

export interface TodoInput {
    name: string;
    description?: string;
    priority?: number;
    dueDate?: string;
}

