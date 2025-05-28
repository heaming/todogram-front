"use client"

import * as React from "react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader, SidebarInset,
    SidebarRail, SidebarTrigger, useSidebar,
} from "@/components/ui/sidebar"
import NavMain from "@/components/layout/sidebar/NavMain";
import NavUser from "@/components/layout/sidebar/NavUser";
const data = {
    user: {
        id: '',
        userId: 'ME',
        email: 'Hi, there👋🏻',
        userName: 'ME',
        avatar: '/avatars/avatar10.svg',
    },
    navMain: [
        {
            userId: "",
            userName: "ME",
            url: "#",
            icon: '/avatars/avatar10.svg',
            isActive: true,
        },
        {
            userId: "more",
            userName: "more...",
            url: "#",
            icon: '/avatars/avatar1.svg',
            isActive: true,
        },
    ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { open } = useSidebar();
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
                <NavMain items={data.navMain} userId={""}/>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
