import React, {useState} from "react";
import TodoItem from "./TodoItem";
import {Todo} from "@/models/todo";
import {Circle, Clock3, Plus} from "lucide-react";

interface TodoListProps {
    todos: Todo[];
    onDelete: (id: string) => void;
    onEdit: (id:string, newContent: string) => void;
    onAdd: (content: string) => void
    onDone: (id: string) => void;
    onHandleTime: (id: string, timeAt: string, timeAmpm: string) => void;
    color: string;
}

const TodoList = ({ todos, onDelete, onEdit, onAdd, onDone, onHandleTime, color }: TodoListProps) => {
    const [newTodo, setNewTodo] = useState('');

    const handleAdd = () => {
        if (newTodo.trim() === '') return;
        onAdd(newTodo);
        setNewTodo('');
    };

    return (
        <div className="p-3 border-t-1 border-dotted m-1"
             style={{ borderColor: color }}
        >
            {todos && todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    onDone={onDone}
                    onHandleTime={onHandleTime}
                    color={color}
                />
            ))}
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <Circle
                        className="mr-1"
                        size={16}
                        color={color}
                    />
                    <input
                        className="outline-none border-0 focus:border-b focus:border-dotted text-sm font-medium"
                        style={{borderColor: color}}
                        type="text"
                        placeholder="새로운 할일"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleAdd();
                        }}
                    />
                </div>
                <Plus className="cursor-pointer"
                      size={16}
                      color="gray"
                      onClick={handleAdd}/>
                </div>
            </div>

            );
};

export default TodoList;
