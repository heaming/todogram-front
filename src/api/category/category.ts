import {checkAccessToken} from "@/utils/jwt-util";
import type {Category, CategoryUpdateRequest} from "@/models/category";

export const getCategories = async (userId: string) : Promise<Category[]> =>{
    try {
        const accessToken = checkAccessToken();

        const response = await fetch(`/api/v1/category/all/user/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            try {
                const data = await response.json();
                console.warn('Failed to get done categories :', data?.message ?? response.statusText);
            } catch {
                console.warn('Failed to get done categories :');
            }
            return [];
        }

        return await response.json();
    } catch (error) {
        console.error('getDoneDates 예외 발생:', error);
        return [];
    }
}

export const getCategoryById = async (categoryId: string) => {
    try {
        const accessToken = checkAccessToken();

        const response = await fetch(`/api/v1/category/detail/${categoryId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            try {
                const data = await response.json();
                console.warn('Failed to get category :', data?.message ?? response.statusText);
            } catch {
                console.warn('Failed to get category :');
            }
            return null;
        }

        const category: Category = await response.json();
        return category;
    } catch (error) {
        console.error('getCategoryById 예외 발생:', error);
        return null;
    }
}

export const addInitialCategory = async (request: Category): Promise<Category|null> => {
    try {
        const response = await fetch(`/api/v1/category/public`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            try {
                const data = await response.json();
                console.warn('Failed to add category :', data?.message ?? response.statusText);
                return null;
            } catch {
                console.warn('Failed to add category :');
                return null;
            }
        }

        const category = await response.json();
        return category;
    } catch (e) {
        console.warn('Failed to add category :');
        return null;
    }
}

export const addCategory = async (request: Category): Promise<Category|null> => {
    try {
        const accessToken = checkAccessToken();

        const response = await fetch(`/api/v1/category`, {
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
                console.warn('Failed to add category :', data?.message ?? response.statusText);
                return null;
            } catch {
                console.warn('Failed to add category :');
                return null;
            }
        }

        const category = await response.json();
        return category;
    } catch (e) {
        console.warn('Failed to add category :');
        return null;
    }
}

export const updateCategory = async (categoryId: string, request: CategoryUpdateRequest) => {
    try {
        const accessToken = checkAccessToken();

        const response = await fetch(`/api/v1/category/${categoryId}`, {
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
                console.warn('Failed to update category :', data?.message ?? response.statusText);
            } catch {
                console.warn('Failed to update category :');
            }
        }

        await response.json();
    } catch (e) {
        console.warn('Failed to update category :');
    }
}

export const deleteCategory = async (categoryId: string) => {
    try {
        const accessToken = checkAccessToken();

        const response = await fetch(`/api/v1/category/${categoryId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            try {
                const data = await response.json();
                console.warn('Failed to delete category :', data?.message ?? response.statusText);
            } catch {
                console.warn('Failed to delete category :');
            }
        }

        await response.json();
    } catch (e) {
        console.warn('Failed to delete category :');
    }
}