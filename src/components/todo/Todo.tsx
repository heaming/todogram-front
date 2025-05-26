import React, {useEffect, useRef, useState} from 'react';
import CategoryList from "@/components/todo/category/CategoryList";
import TodoList from "@/components/todo/todo/TodoList";
import dayjs from "dayjs";
import type {Todo, Category} from "@/models/todo";
import {generateKeyBetween} from 'fractional-indexing';
import CategorySetting from "@/components/todo/category/CategorySetting";
import {loadingType} from "@/app/page";
import {toast} from "sonner";

require('dayjs/locale/ko');
dayjs().locale('ko');

interface TodoProps {
    onLoad: (type: loadingType, loading: boolean) => void;
    selectedDate: Date | undefined;
    onDone: (allDone: boolean) => void
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
const messages = [
    "할일 끝! 내 능력치가 +10 올랐어요! 🆙",
    "미션 컴플리트! 상금은? 내 기분! 🏆",
    "끝냈어요! 이제 침대가 날 기다려요! 🛋️",
    "할일 클리어! 이젠 냉장고 탐험 타임! 🥪",
    "오늘의 할일:✔️ 내일은... 생각 안 해요! 🤷‍♂️",
    "전설이 됐어요! 이제 전설적인 휴식을… 🦸",
    "모든 할일 해냈다! 당신, 진짜 사람 맞나? 🤖",
    "클리어! 축하합니다, 당신은 슈퍼히어로! 🦸‍♀️",
    "할일 다 끝냈으니, 뇌도 휴식! 🧠💤",
    "오늘은 끝! 내일은… 내일 생각해! 💤",
    "할일 다 끝났어요! 뿌듯해요! 😊",
    "오늘도 해냈다! 이제 커피 한잔? ☕️",
    "다 했으니 게임 한 판 할 시간! 🎮",
    "완료! 이 기세로 내일도 화이팅! 💪",
    "할일 끝! 오늘도 내가 최고! 👑",
    "와우! 다 끝났어요! 축하 파티 준비! 🎉",
    "끝냈다! 이제 휴식 모드 ON! 🛌",
    "다 했다니! 내일도 같이 달려요! 🚀",
    "할일 완료! 이제 영화 볼 시간! 🍿",
    "모든 게 끝났다! 당신은 슈퍼히어로?! 🦸‍♂️"
];

const getRandomMessage = () => {
    const idx = Math.floor(Math.random() * messages.length);
    return messages[idx];
}

const Todo = ({ selectedDate, onLoad, onDone }: TodoProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [todos, setTodos] = useState<Todo[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [todosColor, setTodosColor] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [totalCount, setTotalCount] = useState(0);
    const [doneCount, setDoneCount] = useState(0);
    const toastShownMapRef = useRef<Map<string, boolean>>(new Map());

    const fetchCategories = async () => {
        setIsLoading(true);
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
            } finally {
                setIsLoading(false);
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

    const fetchTodosCount = async (date: string) => {
        try {
            const {total_count, done_count} = await window.api.getTodosCount(date);
            setTotalCount(total_count);
            setDoneCount(done_count);
        } catch (e) {
            console.log('Failed to fetch todos count :',e);
            return 0;
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
        setTotalCount(totalCount-1);
    }

    const handleEdit = (id: string, newContent: string) => {
        editTodoContent(id, newContent);
    }

    const handleAdd = async (content: string) => {
        const newTodo = await addTodo(content);

        if (newTodo) {
            setTodos((prev) => [...prev, newTodo]);
            setTotalCount(totalCount+1);
        }
    }

    const handleState = (id: string) => {
        setTodos((prev) =>
            prev.map(todo => {
                    const isChangedTodo = todo.id === id;
                    if (isChangedTodo) {
                        try {
                            window.api.updateTodoStatus(id, !todo.status)
                            setDoneCount(doneCount+1);
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

    const checkAllDone = () => {
        const dateKey = dayjs(selectedDate).format('YYYYMMDD');
        const allDone = todos && todos.length > 0 && todos.every(todo => todo.status) && doneCount >= totalCount;
        const toastShown = toastShownMapRef.current.get(dateKey) || false;

        if (allDone && !toastShown) {
            toast(getRandomMessage(), {
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
        const _date = dayjs(selectedDate).format('YYYYMMDD');
        const fetchTodos = async () => {
            const todos = await getTodos(selectedCategory, _date);
            setTodos(todos);
        }

        fetchTodos();
        fetchTodosCount(_date);
    }, [selectedDate, selectedCategory]);

    useEffect(() => {
        fetchCategories();
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
