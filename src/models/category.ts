export interface Category {
    id: string;
    userId: string;
    sort: string;
    content: string;
    createdAt: string;
    deletedAt: string;
    color: string,
}

export enum UpdateCategoryType {
    sort,
    content,
    color,
}

export interface CategoryUpdateRequest {
    userId: string;
    updateType: UpdateCategoryType;
    value: string;
}