import {Todo, Category} from "@/models/todo";

declare global {
    interface Window {
        api: {
            getTodos: (categoryId: string, date: string) => Promise<Todo[]>;
            getTodoById: (id: string) => Promise<Todo|null>
            addTodo: (request) => Promise<Todo>;
            updateTodo: (id: string, request) => Promise<void>;
            updateTodoStatus: (id: string, status: boolean) => Promise<{ success: boolean }>;
            updateTodoContent: (id: string, content: string) => Promise<void>;
            deleteTodo: (id: string) => Promise<{ success: boolean }>;
            getDoneDates: (selectedYM: string) => Promise<string[]>;

            addCategory: (request) => Promise<Category>;
            updateCategory: (id: string, request) => Promise<void>;
            updateCategoryContent: (id: string, content: string) => Promise<void>;
            getCategory: (id: string) => Promise<Category|null>;
            getCategories:  (userId: string) => Promise<Category[]>;
            deleteCategory: (id: string) => Promise<{ success: boolean }>;
        };
    }
}

export {};