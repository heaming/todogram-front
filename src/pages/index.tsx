import React, { useState } from "react";
import {Calendar} from "@/components/calendar/Calendar";
import Todo from "@/components/todo/Todo";
import {Button} from "@/components/ui/button";
import {Ellipsis} from "lucide-react";
import dayjs from "dayjs";

require('dayjs/locale/ko');
dayjs().locale('ko');

const Home = () => {
    const [todo, setTodo] = useState("");
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [selectedUser, setSelectedUser] = useState<number | null>(null);

    const handleAddTodo = () => {
        // 로컬 저장소에 할 일 추가하는 로직
        console.log("Todo Added:", todo);
    };

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
        <div>
            {/* 유저 프로필 탭 */}
            <div className="flex mt-3">
                {/*{users.map((user) => (*/}
                {/*    <div*/}
                {/*        key={user.id}*/}
                {/*        onClick={() => setSelectedUser(user.id)}*/}
                {/*        className={`cursor-pointer p-2 rounded-full border-2 ${*/}
                {/*            selectedUser === user.id ? 'border-blue-500' : 'border-gray-300'*/}
                {/*        }`}*/}
                {/*    >*/}
                {/*        <img*/}
                {/*            alt={user.name}*/}
                {/*            className="w-16 h-16 rounded-full object-cover"*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*))}*/}
            </div>

            <div className="flex">
                <div>
                    <Calendar onSelectDate={handleSelectDate}/>
                </div>
                <div>
                    <Todo selectedDate={selectedDate}/>
                </div>
            </div>
        </div>
    );
};

export default Home;
