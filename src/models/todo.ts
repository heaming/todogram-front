export interface Todo {
    id: string | '';
    userId: string;
    sort: string;
    content: string;
    status: boolean;
    date: string;
    timeAt: string;
    timeAmpm: string;
    categoryId: string;
}

export interface Category {
    id: string;
    userId: string;
    sort: string;
    content: string;
    createdAt: string;
    deletedAt: string;
    color: string,
}