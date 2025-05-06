export interface Todo {
    id: number;
    sort: string;
    content: string;
    isDone: boolean;
    time: {
        time: string,
        ampm: string,
    }
    createdAt: string;
    deletedAt: string;
}

export interface Category {
    id: number;
    sort: string;
    content: string;
    createdAt: string;
    deletedAt: string;
    color: string,
}