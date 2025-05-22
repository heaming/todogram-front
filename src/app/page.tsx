'use client';

import React, { useState } from "react";
import {Calendar} from "@/components/calendar/Calendar";
import Todo from "@/components/todo/Todo";
import {Button} from "@/components/ui/button";
import {Ellipsis} from "lucide-react";
import dayjs from "dayjs";
import {SidebarTrigger} from "@/components/ui/sidebar";

require('dayjs/locale/ko');
dayjs().locale('ko');

export default function Home() {
    const [selectedDate, setSelectedDate] = useState<Date>();

    // 더미 유저 프로필 목록
    const users = [
        { id: 1, name: "Alice", avatar: "/images/avatar1.jpg" },
        { id: 2, name: "Bob", avatar: "/images/avatar2.jpg" },
        { id: 3, name: "Charlie", avatar: "/images/avatar3.jpg" },
        { id: 4, name: "David", avatar: "/images/avatar4.jpg" },
    ];

    const handleSelectDate = (date: Date) => {
        setSelectedDate(date);
    }

    return (
        <div className="flex min-h-[700px] max-h-[500px] items-center justify-center gap-4 p-4 pt-0 mt-8">
            <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                <div className="rounded-xl bg-white">
                    <Calendar onSelectDate={handleSelectDate}/>
                </div>
                <div className="rounded-xl bg-white p-3">
                    <Todo selectedDate={selectedDate}/>
                </div>
            </div>
        </div>
    );
}