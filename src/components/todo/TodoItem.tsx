import React, {useState} from 'react';
import type {Todo} from "@/models/todo";
import {Button} from "@/components/ui/button";
import {Circle, Clock3, Minus} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";

interface TodoItemProps {
    todo: Todo;
    onDelete: (id: number) => void;
    onEdit: (id: number, content:string) => void;
    onDone: (id: number) => void;
    onHandleTime: (id: number, time: string, ampm: string) => void;
    color: string;
}

const TodoItem = ({todo, onDelete, onEdit, onDone, onHandleTime, color} : TodoItemProps) => {
    const [content, setContent] = useState(todo.content);
    const [toggleValue, setToggleValue] = useState(todo.time.ampm || 'AM');
    const [hour, setHour] = useState(todo.time.time?.split(":")[0] || '');
    const [minute, setMinute] = useState(todo.time.time?.split(":")[1] || '');
    const [timeText, setTimeText] = useState(todo.time.time ? todo.time.time+todo.time.ampm : '');
    const [isTimerOpen, setIsTimerOpen] = useState(false);

    const handleAmToggle = (newToggleValue: string) => {
        if (newToggleValue) setToggleValue(newToggleValue);
    };

    const handleTimeBlur = (type: string) => {
        if (type === 'hour') {
            let h = parseInt(hour);
            if (isNaN(h) || h < 0) h = 0;
            if (h > 12) h = 12;
            setHour(h < 10 ? '0' + h : h.toString());
        } else {
            let m = parseInt(minute);
            if (isNaN(m) || m < 0) m = 0;
            if (m < 0) m = 0;
            if (m > 59) m = 59;
            setMinute(m < 10 ? '0' + m : m.toString());
        }
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
        const value = e.target.value.replace(/\D/g, ''); // 숫자만 입력 받기
        if (type === 'hour') setHour(value);
        else setMinute(value);
    };

    const handleContentBlur = () => {
        if (content.trim() === '') {
            setContent(todo.content);
            return;
        }

        if (content !== todo.content) {
            onEdit(todo.id, content);
        }
    };

    const handleTimerChange = (open: boolean) => {
        if (hour.trim() === '') {
            setIsTimerOpen(open);
            return;
        }

        if (!open) {
            let h = parseInt(hour);
            if (isNaN(h) || h < 0) h = 0;
            if (h > 12) h = 12;
            const formattedHour = h < 10 ? '0' + h : h.toString();

            let m = parseInt(minute);
            if (isNaN(m) || m < 0) m = 0;
            if (m > 59) m = 59;
            const formattedMinute = m < 10 ? '0' + m : m.toString();

            setHour(formattedHour);
            setMinute(formattedMinute);
            setTimeText(`${formattedHour}:${formattedMinute}${toggleValue}`);
            onHandleTime(todo.id, `${formattedHour}:${formattedMinute}`, toggleValue);
        }
        setIsTimerOpen(open);
    }

    const dropTime = () => {
        setTimeText('');
        setHour('');
        setMinute('');
        setToggleValue('AM');
        onHandleTime(todo.id, '', '');
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <Circle
                        className="mr-1"
                        size={16}
                        color={color}
                        fill={todo.isDone ? color : 'white'}
                        onClick={() => onDone(todo.id)}
                    />
                    <input
                        className="text-sm font-medium"
                        type="text"
                        value={content}
                        placeholder={todo.content}
                        onChange={(e) => setContent(e.target.value)}
                        onBlur={handleContentBlur}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleContentBlur();
                        }}
                    />
                </div>
                <div className="flex items-center">
                    <div
                        className="font-mono text-gray-500 text-xs mr-2 cursor-pointer hover:text-red-400"
                        onClick={dropTime}
                    >
                        {timeText}
                    </div>
                    <Popover
                        open={isTimerOpen}
                        onOpenChange={handleTimerChange}
                    >
                        <PopoverTrigger asChild>
                            <Clock3
                                className="mr-2"
                                size={16} color="gray"
                                onClick={() => setIsTimerOpen((prev) => !prev)}
                            />
                        </PopoverTrigger>
                        <PopoverContent
                            side="bottom"
                            className="bg-white w-[120px] border border-gray-200 shadow-md rounded-md p-1 z-50 flex items-center gap-1"
                            sideOffset={4}
                        >
                            <input
                                className="w-1/3 text-center text-sm"
                                type="text"
                                maxLength={2}
                                value={hour}
                                onChange={(e) => handleTimeChange(e, 'hour')}
                                onBlur={() => handleTimeBlur('hour')}
                                placeholder="00"
                            />
                            :
                            <input
                                className="w-1/3 text-center text-sm"
                                type="text"
                                value={minute}
                                maxLength={2}
                                onChange={(e) => handleTimeChange(e, 'minute')}
                                onBlur={() => handleTimeBlur('minute')}
                                placeholder="00"
                            />
                            <ToggleGroup
                                type="single"
                                size="sm"
                                className=""
                                value={toggleValue}
                                onValueChange={handleAmToggle}
                            >
                                <ToggleGroupItem
                                    className="data-[state=on]:text-black text-gray-300 p-1"
                                    value="AM"><p className="text-xs">AM</p></ToggleGroupItem>
                                <ToggleGroupItem
                                    className="data-[state=on]:text-black text-gray-300 p-1"
                                    value="PM"><p className="text-xs">PM</p></ToggleGroupItem>
                            </ToggleGroup>
                        </PopoverContent>
                    </Popover>
                    <Minus size={16} color="gray"
                           onClick={() => onDelete(todo.id)}/>
                </div>
            </div>
        </div>
    );
};

export default TodoItem;
