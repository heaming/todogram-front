'use client';

import React, {useEffect, useState} from "react";
import {Calendar} from "@/components/calendar/Calendar";
import Todo from "@/components/todo/Todo";
import dayjs from "dayjs";
import TodoSkeleton from "@/components/skeleton/TodoSkeleton";
import CalendarSkeleton from "@/components/skeleton/CalendarSkeleton";

require('dayjs/locale/ko');
dayjs().locale('ko');

export type loadingType = 'calendar' | 'todo';

export default function Home() {
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [isCalendarLoading, setIsCalendarLoading] = useState(true);
    const [isTodoLoading, setIsTodoLoading] = useState(true);
    const [isLoadingAll, setIsLoadingAll] = useState(true);
    const [selectedDateIsDone, setSelectedDateIsDone] = useState<null|boolean>(null);

    useEffect(() => {
        if (!isCalendarLoading && !isTodoLoading) setIsLoadingAll(false);
    }, [isCalendarLoading, isTodoLoading]);

    const handleLoading = (type: loadingType, loading: boolean) => {
        if (type === 'calendar') {
            setIsCalendarLoading(loading);
        } else if(type === 'todo') {
            setIsTodoLoading(loading);
        }
    }

    const handleSelectDate = (date: Date) => {
        setSelectedDate(date);
    }

    const handleAllDone = (allDone: boolean) => {
        setSelectedDateIsDone(allDone);
    }

    return (
        <div className="flex min-h-[500] max-h-[500px] items-center justify-center gap-4 p-4 pt-0 mt-8">
            <div className="grid auto-rows-min gap-10 md:grid-cols-2">
                <div className={`rounded-xl bg-white border-zinc-100 border-1 shadow-md ${isLoadingAll ? 'hidden' : ''}`}>
                    <Calendar onLoad={handleLoading} onSelectDate={handleSelectDate} onDone={selectedDateIsDone}/>
                </div>
                {isLoadingAll &&
                    (<>
                        <div className="rounded-xl bg-white p-3 border-zinc-100 border-1 shadow-md">
                            <CalendarSkeleton/>
                        </div>
                        <div className="rounded-xl bg-white p-3 border-zinc-100 border-1 shadow-md">
                        <TodoSkeleton/>
                        </div>
                    </>)
                }
                <div className={`rounded-xl bg-white p-3 border-zinc-100 border-1 shadow-md ${isLoadingAll ? 'hidden' : ''}`}>
                    <Todo selectedDate={selectedDate} onLoad={handleLoading} onDone={handleAllDone}/>
                </div>
            </div>
        </div>
    );
}