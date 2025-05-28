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

export default function NavMain({
                            items,
                        }: {
    items: {
        userId?: string,
        userName?: string,
        url: string
        icon?: string
        isActive?: boolean
        items?: {
            title: string
            url: string
        }[]
    }[],
    userId?: string
}) {
    return (
        <SidebarGroup>
            <SidebarMenu>
                {items.map((item) => (
                    <Collapsible
                        key={item.userId}
                        asChild
                        defaultOpen={false}
                        // className="group/collapsible"
                    >
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                                <SidebarMenuButton
                                    className="hover:bg-[#00BC7D33] hover:text-black text-zinc-500 cursor-pointer"
                                    tooltip={item.userName}
                                >
                                    {item.icon && (
                                        <img src={item.icon} className="w-5 h-5 rounded-md" alt={item.userName} />
                                    )}
                                    <span className="truncate text-sm">{item.userName}</span>
                                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                            {/*<CollapsibleContent>*/}
                            {/*    <SidebarMenuSub>*/}
                            {/*        {item.items?.map((subItem) => (*/}
                            {/*            <SidebarMenuSubItem key={subItem.title}>*/}
                            {/*                <SidebarMenuSubButton asChild>*/}
                            {/*                    <a href={subItem.url}>*/}
                            {/*                        <span>{subItem.title}</span>*/}
                            {/*                    </a>*/}
                            {/*                </SidebarMenuSubButton>*/}
                            {/*            </SidebarMenuSubItem>*/}
                            {/*        ))}*/}
                            {/*    </SidebarMenuSub>*/}
                            {/*</CollapsibleContent>*/}
                        </SidebarMenuItem>
                    </Collapsible>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
