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

export enum UpdateTodoType {
    sort,
    content,
    status,
    date,
    timeAt,
    timeAmpm
}

export interface TodoUpdateRequest {
    userId: string;
    updateType: UpdateTodoType;
    value: any;
}
