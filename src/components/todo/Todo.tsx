import React, {useState} from 'react';
import Category from "@/components/todo/Category";
import TodoList from "@/components/todo/TodoList";

const tempTodos = [
    {
        id: 0,
        sort: 'a',
        content: '혜미랑 댕굴aa1',
        createdAt: '',
        deletedAt: '',
        isDone: true,
        time: {
            time: '',
            ampm: 'AM',
        }
    },
    {
        id: 1,
        sort: 'b',
        content: '혜미랑 댕굴adgadgs2',
        createdAt: '',
        deletedAt: '',
        isDone: false,
        time: {
            time: '',
            ampm: 'AM',
        }
    },
];


const tempCategory = [
    {
        id: 1,
        content: 'CS',
        color: '#f06292',
        createdAt: '',
        deletedAt: '',
        sort: '',
    },
    {
        content: '소싱',
        color: '#3f51b5',
        deletedAt: '',
        createdAt: '',
        sort: '',
        id: 2,
    },
    {
        content: '혜미랑',
        color: '#ffb300',
        deletedAt: '',
        createdAt: '',
        sort: '',
        id: 3,
    },
    {
        content: '영일이',
        color: '#039be5',
        deletedAt: '',
        createdAt: '',
        sort: '',
        id: 4,
    },
    {
        content: '제주도',
        color: '#3f51b5',
        deletedAt: '',
        createdAt: '',
        sort: '',
        id: 5,
    },
    {
        content: '또 어디가지',
        color: '#3e6c3f',
        deletedAt: '',
        createdAt: '',
        sort: '',
        id: 6,
    },
    {
        content: '또 어디가지22',
        color: '#d3846b',
        deletedAt: '',
        createdAt: '',
        sort: '',
        id: 7,
    },
    {
        content: '또 어디가지233',
        color: '#814785',
        deletedAt: '',
        createdAt: '',
        sort: '',
        id: 8,
    },
]

const Todo = () => {
    const [todos, setTodos] = useState(tempTodos);
    const [categories, setCategories] = useState(tempCategory);
    const [todosColor, setTodosColor] = useState(tempCategory[0].color);

    const handleDelete = (id: number) => {
        setTodos((prev) => prev.filter(todo => todo.id != id));
    }

    const handleEdit = (id: number, newContent: string) => {
        console.log("edit");
    }

    const handleAdd = (newTodo: string) => {
        const request = {
            id: todos[todos.length-1].id+1,
            sort: 'c',
            content: newTodo,
            createdAt: '',
            deletedAt: '',
            isDone: false,
            time: {
                time: '',
                ampm: 'AM',
            },
        }

        setTodos([...todos, request]);
    }

    const handleDone = (id: number) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
            )
        );
    }

    const handleTime = (id: number, time: string, ampm: string) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, time: {time, ampm} } : todo
            )
        );
    }

    const handleCategory = (id: number) => {
        setTodosColor(categories.filter(x => x.id === id)[0].color);
    }

    return (
        <div className="w-[400px]">
            <Category
                categories={categories}
                onClick={handleCategory}
            />
            <TodoList
                todos={todos}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onAdd={handleAdd}
                onDone={handleDone}
                onHandleTime={handleTime}
                color={todosColor}
            />
        </div>
    );
};

export default Todo;
