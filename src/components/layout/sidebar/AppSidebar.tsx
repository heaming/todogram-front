"use client"

import * as React from "react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader, SidebarInset,
    SidebarRail, SidebarTrigger, useSidebar,
} from "@/components/ui/sidebar"
import NavUser from "@/components/layout/sidebar/NavUser";
import {User} from "@/models/user";
import NavFriends from "@/components/layout/sidebar/NavFriends";
import {useEffect, useState} from "react";

interface NavData {
    user: User;
    friends: User[];
    friendsCount: number;
}

const data: NavData = {
    user: {
        id: 'userId123',
        userId: 'meetooha@naver.com',
        username: '혜미혜미혬',
        avatar: '/avatars/avatar16.svg',
    },
    friends: [
        {
            id: 'userId1',
            userId: 'qqqq@naver.com',
            username: '영일',
            avatar: '/avatars/avatar15.svg',
        },
        {
            id: 'userId2',
            userId: 'wwww@naver.com',
            username: '뚱바',
            avatar: '/avatars/avatar1.svg',
        },
    ],
    friendsCount: 20,
}

const getUserLevel = (friendCount: number): string =>  {
    if (friendCount <= 0) return "외롭지않아!";
    if (friendCount === 1) return "한명있어요";
    if (friendCount < 5) return "친구가있다!"
    if (friendCount === 5) return "다섯손가락";
    if (friendCount <= 10) return "친구꽤많음";
    if (friendCount <= 20) return "명예개발자";
    return "친구대장님";
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { open } = useSidebar();
    const [navList, setNavList] = useState<User[]>([]);

    useEffect(() => {
        setNavList([data.user, ...data.friends]);
    }, []);


    return (
        <Sidebar {...props} collapsible="icon"
            className="bg-zinc-100"
        >
            <SidebarHeader
                className={`flex ${!open ? '' : 'items-end'}`}
            >
                <SidebarTrigger className="ml-0.5 hover:text-[#00BC7DFF] cursor-pointer" />
            </SidebarHeader>
            <SidebarContent>
                <NavFriends navList={navList} />
            </SidebarContent>
            <SidebarFooter className="mb-2">
                <NavUser user={data.user} userLevel={getUserLevel(data.friendsCount)}/>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
