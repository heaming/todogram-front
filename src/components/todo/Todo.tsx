import React, {useEffect, useState} from 'react';
import CategoryList from "@/components/todo/CategoryList";
import TodoList from "@/components/todo/TodoList";
import dayjs from "dayjs";
import type {Todo, Category} from "@/models/todo";
import {generateKeyBetween} from 'fractional-indexing';

require('dayjs/locale/ko');
dayjs().locale('ko');

interface TodoProps {
    selectedDate: Date | undefined;
}

const Todo = ({ selectedDate }: TodoProps) => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [todosColor, setTodosColor] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

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


        console.log(request);
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

    const handleCategory = (id: string) => {
        setSelectedCategory(id);
        setTodosColor(categories.filter(x => x.id === id)[0].color);
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

    }, [categories]);

    useEffect(() => {
        const fetchCategories = async () => {
            if (typeof window !== 'undefined' && window.api) {
                try {
                    const categories: Category[] = await window.api.getCategories('');
                    setCategories(categories);
                    setTodosColor(categories.length > 0 ? categories[0].color : '#f06292');
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

        fetchCategories();
    }, []);

    return (
        <div className="w-[350px]">
            <CategoryList
                categories={categories}
                onClick={handleCategory}
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
