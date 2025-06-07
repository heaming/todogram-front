"use client"

import {
    BadgeCheck,
    Bell,
    ChevronsUpDown,
    CreditCard,
    LogOut, Mail,
    Sparkles,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import {User} from "@/models/user";
import {Badge} from "@/components/ui/badge";
import {useState} from "react";
import {NoticeDialog} from "@/components/layout/sidebar/NoticeDialog";
import {ContactDialog} from "@/components/layout/sidebar/ContactDialog";
import {logout} from "@/api/user/user";

interface NavUserProps {
    user: User;
    userLevel: string;
}

export default function NavUser({user, userLevel} : NavUserProps) {
    const { isMobile } = useSidebar();
    const [openNotice, setOpenNotice] = useState(false);
    const [openContact, setOpenContact] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
            window.location.href = "/";
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton
                                size="lg"
                                className="nav-user focus:ring-0 focus:border-transparent data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer focus:outline-none focus-visible:outline-none"
                            >
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={user.avatar} alt={user.username} />
                                    <AvatarFallback className="rounded-lg">🤔</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate text-sm">{user.username ?? 'WELCOME'}</span>
                                    <span className="truncate text-gray-500 text-[10px]">@{userLevel}</span>
                                </div>
                                <ChevronsUpDown className="ml-auto size-4" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="bg-white shadow border-zinc-100 w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                            side={isMobile ? "bottom" : "right"}
                            align="end"
                            sideOffset={2}
                        >
                            <DropdownMenuLabel className="p-0 font-normal">
                                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage src={user.avatar} alt={user.username} />
                                        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-medium">{user.username}</span>
                                        <span className="truncate text-xs mt-1 text-zinc-500">{user.userId}</span>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-zinc-200 mx-2" />
                            <DropdownMenuGroup>
                                <DropdownMenuItem
                                    onClick={() => {
                                        setTimeout(() => {
                                            setOpenNotice(true)
                                        }, 100)
                                    }}
                                    className="text-xs font-medium text-zinc-700 hover:text-[#00BC7DFF] cursor-pointer">
                                    <Sparkles />
                                    <p>UPGRADE TO PRO</p>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => {
                                        setTimeout(() => {
                                            setOpenContact(true)
                                        }, 100)
                                    }}
                                    className="text-xs font-medium text-zinc-700 hover:text-[#00BC7DFF] cursor-pointer">
                                    <Mail/>
                                    <p>News</p>
                                </DropdownMenuItem>
                                {/*<DropdownMenuItem>*/}
                                {/*    <CreditCard />*/}
                                {/*    Billing*/}
                                {/*</DropdownMenuItem>*/}
                                {/*<DropdownMenuItem>*/}
                                {/*    <Bell />*/}
                                {/*    Notifications*/}
                                {/*</DropdownMenuItem>*/}
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator className="bg-zinc-200 mx-2" />
                            <DropdownMenuItem
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleLogout();
                                }}
                                className="text-xs font-medium text-zinc-700 hover:text-[#00BC7DFF] cursor-pointer">
                                <LogOut/>
                                <p>Logout</p>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
            <NoticeDialog open={openNotice} onOpenChange={setOpenNotice} />
            <ContactDialog open={openContact} onOpenChange={setOpenContact} />
        </>
    )
}
