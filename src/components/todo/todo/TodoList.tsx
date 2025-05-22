import React, {useEffect, useRef, useState} from "react";
import TodoItem from "./TodoItem";
import {Todo} from "@/models/todo";
import {Circle, Clock3, Plus} from "lucide-react";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import {ScrollAreaScrollbar, ScrollAreaThumb, Thumb, Viewport} from "@radix-ui/react-scroll-area";

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
    const viewportRef = useRef<HTMLDivElement>(null);

    const handleAdd = () => {
        if (newTodo.trim() === '') return;
        onAdd(newTodo);
        setNewTodo('');

        if (viewportRef.current) {
            // 약간 딜레이 줘서 DOM 업데이트 후 실행되게
            setTimeout(() => {
                viewportRef.current!.scrollTop = viewportRef.current!.scrollHeight;
            }, 50);
        }
    };

    return (
        <div className="p-3 border-t-1 border-dotted m-1 h-[210px]"
             style={{ borderColor: color }}
        >
            <ScrollArea className="h-[175px] w-full rounded-md overflow-y-auto">
                <Viewport ref={viewportRef} className="h-full w-full">
                    {!todos || todos.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                            할일이 없습니다👏🏻
                        </div>
                    ) : (
                        todos.map((todo) => (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                onDelete={onDelete}
                                onEdit={onEdit}
                                onDone={onDone}
                                onHandleTime={onHandleTime}
                                color={color}
                            />
                        ))
                    )}
                </Viewport>
            </ScrollArea>
            <div className="flex justify-between items-center my-1 pt-1">
                <div className="flex items-center h-[20px]">
                    <Circle
                        className="mr-1"
                        size={16}
                        color={color}
                    />
                    <input
                        className={`outline-none border-1 w-[250px] border-transparent focus:border-b border-dotted text-sm font-medium`}
                        type="text"
                        onFocus={(e) => (e.currentTarget.style.borderBottomColor = color)}
                        onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'transparent')}
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
                      onClick={handleAdd}
                />
            </div>
        </div>
            );
};

export default TodoList;
