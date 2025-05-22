import React, {useEffect, useState} from 'react';
import CategoryList from "@/components/todo/category/CategoryList";
import TodoList from "@/components/todo/todo/TodoList";
import dayjs from "dayjs";
import type {Todo, Category} from "@/models/todo";
import {generateKeyBetween} from 'fractional-indexing';
import CategorySetting from "@/components/todo/category/CategorySetting";

require('dayjs/locale/ko');
dayjs().locale('ko');

interface TodoProps {
    selectedDate: Date | undefined;
}

const initialCategory: Category = {
    color: "#00BC7DFF",
    content: "내 카테고리",
    createdAt: "",
    deletedAt: "",
    id: "",
    sort: generateKeyBetween(null, null),
    userId: ""
}

const Todo = ({ selectedDate }: TodoProps) => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [todosColor, setTodosColor] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const fetchCategories = async () => {
        if (typeof window !== 'undefined' && window.api) {
            try {
                const categories: Category[] = await window.api.getCategories('');
                if (!categories || categories.length <= 0) {
                    const initial = await window.api.addCategory(initialCategory);
                    categories.push(initial);
                }

                setCategories(categories);
                setTodosColor(categories.length > 0 ? categories[0].color : '#166534');
                if (categories && categories.length > 0) {
                    setSelectedCategory(categories[0].id);
                }
            } catch (e) {
                console.log('Failed to get Categories', e);
            }
        } else {
            console.error('window.api is not available');
        }
    };

    const getTodos = async (categoryId: string, date: string) => {
        try {
            const todos = await window.api.getTodos(categoryId, date);
            return todos;
        } catch (e) {
            console.log('Failed to get todos :',e);
            return [];
        }
    }

    const deleteTodo = async (id: string) => {
        try {
            await window.api.deleteTodo(id);
        } catch (e) {
            console.log('Failed to delete todo :',e);
        }
    }

    const editTodoContent = async (id: string, newContent: string) => {
        try {
            await window.api.updateTodoContent(id, newContent);
        } catch (e) {
            console.log('Failed to edit todo :',e);
        }
    }

    const addTodo = async (content: string) => {
        const generateSort = () => {
            if (todos && todos.length > 0) {
                return generateKeyBetween(todos[todos.length-1].sort, null);
            } else {
                return generateKeyBetween(null, null);
            }
        }
        const sort = generateSort();

        const request = {
            id: '',
            userId: '',
            categoryId: selectedCategory,
            sort: sort,
            content: content,
            date: dayjs(selectedDate).format('YYYYMMDD'),
            timeAt: '',
            timeAmpm: '',
            status: false,
        }

        try {
            const newTodo = await window.api.addTodo(request);
            return newTodo;
        } catch (e) {
            console.log('Failed to add todo :',e);
        }
        return null;
    }

    const handleDelete = (id: string) => {
        deleteTodo(id);
        setTodos((prev) => prev.filter(todo => todo.id != id));
    }

    const handleEdit = (id: string, newContent: string) => {
        editTodoContent(id, newContent);
    }

    const handleAdd = async (content: string) => {
        const newTodo = await addTodo(content);

        if (newTodo) {
            setTodos((prev) => [...prev, newTodo]);
        }
    }

    const handleState = (id: string) => {
        setTodos((prev) =>
            prev.map(todo => {
                    const isChangedTodo = todo.id === id;
                    if (isChangedTodo) {
                        try {
                            window.api.updateTodoStatus(id, !todo.status)
                        } catch (e) {
                            console.log(e);
                        }
                        return {...todo, status: !todo.status};
                    }
                    return todo;
                }

            )
        )
    };

    const handleTime = (id: string, timeAt: string, timeAmpm: string) => {
        setTodos((prev) =>
            prev.map(todo => {
                    const isChangedTodo = todo.id === id;
                    if (isChangedTodo) {
                        try {
                            window.api.updateTodo(id,{...todo, timeAt: timeAt, timeAmpm: timeAmpm })
                        } catch (e) {
                            console.log(e);
                        }
                        return {...todo, timeAt: timeAt, timeAmpm: timeAmpm };
                    }
                    return todo;
                }
            )
        )
    }

    const handleSelectedCategory = (id: string) => {
        setSelectedCategory(id);
        setTodosColor(categories.filter(x => x.id === id)[0].color);
    }

    const handleCategorySort = async (id: string, sort: string) => {
        try {
            const category = categories.filter(item => item.id === id)[0];
            if(category) {
                await window.api.updateCategory(id, {...category, sort: sort })
            }
        }  catch (e) {
            console.log(e);
        }
    }

    const handleCategoryContent = async (id: string, content: string) => {
        try {
            await window.api.updateCategoryContent(id, content);
        } catch (e) {
            console.log(e);
        }

        setCategories((prev) =>
            prev.map(category => {
                if (category.id === id) {
                    return { ...category, content };
                }
                return category;
            })
        );
    }

    const handleAddCategory = async (content: string) => {
        const generateSort = () => {
            if (categories && categories.length > 0) {
                return generateKeyBetween(categories[categories.length-1].sort, null);
            } else {
                return generateKeyBetween(null, null);
            }
        }
        const sort = generateSort();

        const request: Category = {
            color: "#00BC7DFF",
            content: content,
            createdAt: "",
            deletedAt: "",
            id: "",
            sort: sort,
            userId: ""
        }
        try {
            const newCategory = await window.api.addCategory(request);
            setCategories(prev => [...prev, newCategory]);
        } catch (e) {
            console.log('Failed to update category content');
        }
    }

    const handleCategorySettingPopover = async () => {
        await fetchCategories();
    }

    useEffect(() => {
        const fetchTodos = async () => {
            const _date = dayjs(selectedDate).format('YYYYMMDD');
            const todos = await getTodos(selectedCategory, _date);
            setTodos(todos);
        }

        fetchTodos();
    }, [selectedDate, selectedCategory]);


    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="w-[350px]">
            <div className="flex items-center align-middle justify-end pr-2">
            <CategorySetting
                categories={categories}
                onChangeCategorySort={handleCategorySort}
                onChangeCategoryContent={handleCategoryContent}
                onAddCategory={handleAddCategory}
                onOpen={handleCategorySettingPopover}
            />
            </div>
            <CategoryList
                categories={categories}
                onClick={handleSelectedCategory}
            />
            <TodoList
                todos={todos}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onAdd={handleAdd}
                onDone={handleState}
                onHandleTime={handleTime}
                color={todosColor}
            />
        </div>
    );
};

export default Todo;
