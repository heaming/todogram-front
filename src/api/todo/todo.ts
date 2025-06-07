import {checkAccessToken} from "@/utils/jwt-util";
import {Todo, TodoUpdateRequest} from "@/models/todo";

export const getDoneDates = async (userId: string, selectedYM: string) : Promise<string[]> =>{
    try {
        const accessToken = checkAccessToken();

        const response = await fetch(`/api/v1/todo/done-dates/${selectedYM}/user/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            try {
                const data = await response.json();
                console.warn('Failed to get done dates :', data?.message ?? response.statusText);
            } catch {
                console.warn('Failed to get done dates :');
            }
            return [];
        }

        const dates: string[] = await response.json();
        return dates;
    } catch (error) {
        console.error('getDoneDates 예외 발생:', error);
        return [];
    }
}

export const getTodos = async (userId: string, categoryId: string, date: string) => {
    try {
        const accessToken = checkAccessToken();

        const response = await fetch(`/api/v1/todo/all/user/${userId}?categoryId=${categoryId}&date=${date}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            try {
                const data = await response.json();
                console.warn('Failed to get todos :', data?.message ?? response.statusText);
            } catch {
                console.warn('Failed to get todos :');
            }
            return [];
        }

        const todos: Todo[] = await response.json();
        return todos;
    } catch (error) {
        console.error('getTodos 예외 발생:', error);
        return [];
    }
}

export const getTodoById = async (todoId: string) => {
    try {
        const accessToken = checkAccessToken();

        const response = await fetch(`/api/v1/todo/detail/${todoId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            try {
                const data = await response.json();
                console.warn('Failed to get todo :', data?.message ?? response.statusText);
            } catch {
                console.warn('Failed to get todo :');
            }
            return null;
        }

        const todo: Todo = await response.json();
        return todo;
    } catch (error) {
        console.error('getTodo 예외 발생:', error);
        return null;
    }
}

export const addTodo = async (request: Todo) => {
    try {
        const accessToken = checkAccessToken();

        const response = await fetch(`/api/v1/todo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            try {
                const data = await response.json();
                console.warn('Failed to add todo :', data?.message ?? response.statusText);
                return null;
            } catch {
                console.warn('Failed to get todo :');
                return null;
            }
        }

        const todo: Todo = await response.json();
        return todo;
    } catch (e) {
        console.warn('Failed to get done categories :');
        return null;
    }
}

export const updateTodo = async (todoId: string, request: TodoUpdateRequest) => {
    try {
        const accessToken = checkAccessToken();

        const response = await fetch(`/api/v1/todo/${todoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            try {
                const data = await response.json();
                console.warn('Failed to update todo :', data?.message ?? response.statusText);
            } catch {
                console.warn('Failed to update todo :');
            }
        }

        await response.json();
    } catch (e) {
        console.warn('Failed to update todo :');
    }
}

export const deleteTodo = async (todoId: string) => {
    try {
        const accessToken = checkAccessToken();

        const response = await fetch(`/api/v1/todo/${todoId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            try {
                const data = await response.json();
                console.warn('Failed to delete todo :', data?.message ?? response.statusText);
            } catch {
                console.warn('Failed to delete todo :');
            }
        }

        await response.json();
    } catch (e) {
        console.warn('Failed to delete todo :');
    }
}

export const getTodosCount = async (userId:string, date: string) => {
    try {
        const accessToken = checkAccessToken();

        const response = await fetch(`/api/v1/todo/count/${userId}?date=${date}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            try {
                const data = await response.json();
                console.warn('Failed to get todos count :', data?.message ?? response.statusText);
            } catch {
                console.warn('Failed to get todos count :');
            }
        }

        const {total_count, done_count} = await response.json();
        return {total_count, done_count};
    } catch (e) {
        console.warn('Failed to get todos count :');
        return {total_count: 0, done_count: 0};
    }
}