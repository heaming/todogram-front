import React, {useEffect, useRef, useState} from 'react';
import CategoryList from "@/components/todo/category/CategoryList";
import TodoList from "@/components/todo/todo/TodoList";
import dayjs from "dayjs";
import type {Todo} from "@/models/todo";
import {UpdateTodoType} from "@/models/todo";
import {Category, UpdateCategoryType} from "@/models/category";
import {generateKeyBetween} from 'fractional-indexing';
import CategorySetting from "@/components/todo/category/CategorySetting";
import {toast} from "sonner";
import {loadingType} from "@/app/user/[id]/todos/page";
import {addCategory, getCategories, updateCategory} from "@/api/category/category";
import {getRandomDoneMessage} from "@/utils/util";
import {addTodo, deleteTodo, getTodos, getTodosCount, updateTodo} from "@/api/todo/todo";

require('dayjs/locale/ko');
dayjs().locale('ko');

interface TodoProps {
    id: string;
    onLoad: (type: loadingType, loading: boolean) => void;
    selectedDate: Date | undefined;
    onDone: (allDone: boolean) => void
}

const Todo = ({ id, selectedDate, onLoad, onDone }: TodoProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [todos, setTodos] = useState<Todo[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [todosColor, setTodosColor] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [totalCount, setTotalCount] = useState(0);
    const [doneCount, setDoneCount] = useState(0);
    const toastShownMapRef = useRef<Map<string, boolean>>(new Map());

    const fetchCategories = async (userId: string) => {
        if(!userId) return;
        setIsLoading(true);
        try {
            const response: Category[] = await getCategories(userId);
            setCategories(response);
        } catch (e) {
            console.log('Failed to get Categories', e);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchTodosCount = async (date: string) => {
        try {
            const {total_count, done_count} = await getTodosCount(id, date);
            setTotalCount(total_count);
            setDoneCount(done_count);
        } catch (e) {
            console.log('Failed to fetch todos count :',e);
            setTotalCount(0);
            setDoneCount(0);
        }
    }

    const editTodoContent = async (todoId: string, newContent: string) => {
        try {
            await updateTodo(todoId, {
                userId: id,
                updateType: UpdateTodoType.content,
                value: newContent
            });
        } catch (e) {
            console.log('Failed to edit todo :',e);
        }
    }

    const handleDelete = async (id: string) => {
        await deleteTodo(id);
        setTodos((prev) => prev.filter(todo => todo.id != id));
        setTotalCount(totalCount-1);
    }

    const handleEdit = async (id: string, newContent: string) => {
        await editTodoContent(id, newContent);
    }

    const handleAdd = async (content: string) => {
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
            userId: id,
            categoryId: selectedCategory,
            sort: sort,
            content: content,
            date: dayjs(selectedDate).format('YYYYMMDD'),
            timeAt: '',
            timeAmpm: '',
            status: false,
        }

        try {
            const newTodo = await addTodo(request);

            if (newTodo) {
                setTodos((prev) => [...prev, newTodo]);
                setTotalCount(totalCount+1);
            }
        } catch (e) {
            console.log('Failed to add todo :',e);
        }
    }

    const handleState = (todoId: string) => {
        const updated = todos.map(todo => {
            if (todo.id === todoId) {
                return { ...todo, status: !todo.status };
            }
            return todo;
        });
        setTodos(updated);

        (async () => {
            try {
                await updateTodo(todoId, {
                    userId: id,
                    updateType: UpdateTodoType.status,
                    value: !todos.find(todo => todo.id === todoId)?.status,
                });

                setDoneCount(doneCount + 1);
            } catch (e) {
                console.log('Failed to edit todo :', e);
            }
        })();
    };


    const handleTime = (todoId: string, timeAt: string, timeAmpm: string) => {
        setTodos(prev =>
            prev.map(todo =>
                todo.id === todoId
                    ? { ...todo, timeAt, timeAmpm }
                    : todo
            )
        );

        (async () => {
            try {
                await updateTodo(todoId, {
                    userId: id,
                    updateType: UpdateTodoType.timeAt,
                    value: !todos.find(todo => todo.id === todoId)?.timeAt,
                });
            } catch (e) {
                console.log('시간 업데이트 실패:', e);
            }
        })();
    };

    const handleSelectedCategory = (categoryId: string) => {
        setSelectedCategory(categoryId);
        setTodosColor(categories.filter(x => x.id === categoryId)[0].color);
    }

    const handleCategorySort = async (categoryId: string, sort: string) => {
        try {
            await updateCategory(categoryId, {
                userId: id,
                updateType: UpdateCategoryType.sort,
                value: sort,
            });
        } catch (e) {
            console.log('카테고리 업데이트 실패 :', e);
        }
    }

    const handleCategoryContent = async (categoryId: string, content: string) => {
        try {
            await updateCategory(categoryId, {
                userId: id,
                updateType: UpdateCategoryType.content,
                value: content,
            });
        } catch (e) {
            console.log('카테고리 업데이트 실패 :', e);
        }

        setCategories((prev) =>
            prev.map(category => {
                if (category.id === categoryId) {
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
            userId: id,
        }
        try {
            const newCategory = await addCategory(request);
            if (!newCategory) return;
            setCategories(prev => [...prev, newCategory]);
        } catch (e) {
            console.log('Failed to update category content');
        }
    }

    const handleCategorySettingPopover = async () => {
        if (!id) return;
        const categories = await getCategories(id);
        setCategories(categories);
        setTodosColor(categories.length > 0 ? categories[0].color : '#00BC7DFF');
        if (categories && categories.length > 0) {
            setSelectedCategory(categories[0].id);
        }
    }

    const checkAllDone = () => {
        const dateKey = dayjs(selectedDate).format('YYYYMMDD');
        const allDone = todos && todos.length > 0 && todos.every(todo => todo.status) && doneCount >= totalCount;
        const toastShown = toastShownMapRef.current.get(dateKey) || false;

        if (allDone && !toastShown) {
            toast(getRandomDoneMessage(), {
                duration: 2000,
                description: "",
                action: {
                    label: `확인`,
                    onClick: () => { return; },
                },
                position: 'top-right',
                className: 'bg-white border-1 border-zinc-300 text-zinc-700',
            });
            onDone(true);
            toastShownMapRef.current.set(dateKey, true);
        } else if (!allDone) {
            toastShownMapRef.current.set(dateKey, false);
            onDone(false);
        }
    };

    useEffect(() => {
        if (!selectedCategory || !selectedDate) return;
        const _date = dayjs(selectedDate).format('YYYYMMDD');
        const fetchTodos = async () => {
            const todos = await getTodos(id, selectedCategory, _date);
            setTodos(todos);
        }
        fetchTodos();
        fetchTodosCount(_date);
    }, [selectedDate, selectedCategory]);

    useEffect(() => {
        if (categories.length > 0 && !selectedCategory) {
            setSelectedCategory(categories[0].id);
            setTodosColor(categories[0].color);
        }
    }, [categories]);

    useEffect(() => {
        fetchCategories(id);
    }, []);

    useEffect(() => {
        onLoad('todo', isLoading);
    }, [isLoading]);

    useEffect(() => {
        checkAllDone();
    }, [todos]);

    return (
        <div className="w-[350px]">
            <div className="flex items-center justify-center">
            <div className="flex-1 min-w-0 pr-3">
                <CategoryList
                    categories={categories}
                    onClick={handleSelectedCategory}
                />
            </div>
            <CategorySetting
                id={id}
                categories={categories}
                onChangeCategorySort={handleCategorySort}
                onChangeCategoryContent={handleCategoryContent}
                onAddCategory={handleAddCategory}
                onOpen={handleCategorySettingPopover}
            />
        </div>
        <TodoList
            todos={todos}
             onDelete={handleDelete}
             onEdit={handleEdit}
             onAdd={handleAdd}
             onDone={handleState}
             onHandleTime={handleTime}
             color={todosColor}/>
        </div>
            )
};

export default Todo;
