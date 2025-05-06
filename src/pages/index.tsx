import React, { useState } from "react";
import {Calendar} from "@/components/calendar/Calendar";
import Todo from "@/components/todo/Todo";
import {Button} from "@/components/ui/button";
import {Ellipsis} from "lucide-react";

const Home = () => {
    const [todo, setTodo] = useState("");
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


    return (
        <div>
            {/* 유저 프로필 탭 */}
            <div className="flex mt-3">
                {users.map((user) => (
                    <div
                        key={user.id}
                        onClick={() => setSelectedUser(user.id)}
                        className={`cursor-pointer p-2 rounded-full border-2 ${
                            selectedUser === user.id ? 'border-blue-500' : 'border-gray-300'
                        }`}
                    >
                        <img
                            alt={user.name}
                            className="w-16 h-16 rounded-full object-cover"
                        />
                    </div>
                ))}
            </div>

            <div className="flex">
                <div>
                    <Calendar/>
                </div>
                <div>
                    <div className="flex justify-end mr-10 mb-2">
                        <Button>
                            <Ellipsis className="text-zinc-500"/>
                        </Button>
                    </div>
                    <Todo/>
                </div>
            </div>
        </div>
    );
};

export default Home;
