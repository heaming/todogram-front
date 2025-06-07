"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {User} from "@/models/user";
import {usePathname, useRouter} from "next/navigation";

interface NavFriendsProps {
    navList: User[];
}

export default function NavFriends({ navList } : NavFriendsProps) {
    const router = useRouter();
    const pathname = usePathname();

    const onClickSidebar = (id: string) => {
        router.push(`/user/${id}/todos`)
    }

    return (
        <SidebarGroup>
            <SidebarMenu>
                {navList.map((item) => {
                    const isActive = pathname === `/user/${item.id}/todos`;

                    return (
                        <Collapsible
                            key={item.id}
                            asChild
                            defaultOpen={false}
                            // className="group/collapsible"
                        >
                    <SidebarMenuItem key={item.id}>
                        <CollapsibleTrigger asChild>
                            <SidebarMenuButton
                                className={`hover:bg-[#00BC7D33] hover:text-black text-zinc-500 cursor-pointer transition 
                                            ${isActive ? 'bg-[#00BC7D33] text-black' : ''}`}
                                tooltip={item.username}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onClickSidebar(item.id);
                                }}
                            >
                                {item.avatar && (
                                    <img src={item.avatar} className="w-5 h-5 rounded-md" alt={item.username} />
                                )}
                                <span className="truncate text-xs">{item.username}</span>
                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                        </CollapsibleTrigger>
                    </SidebarMenuItem>
                        </Collapsible>
                )})}
            </SidebarMenu>
        </SidebarGroup>
    )
}
