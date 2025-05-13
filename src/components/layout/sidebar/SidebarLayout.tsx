import React, {ReactNode} from "react";
import {SidebarInset, SidebarTrigger, useSidebar} from "@/components/ui/sidebar";
import {cn} from "@/lib/utils";
import {AppSidebar} from "@/components/layout/sidebar/AppSidebar";

export default function SidebarLayout({ children }: { children: ReactNode }) {
    const { open } = useSidebar();

    return (
        <div className="flex w-full overflow-hidden">
            <div
                className={cn(
                    "transition-all duration-300 ease-in-out",
                    open ? "w-45" : "w-6"
                )}
            >
                <AppSidebar variant="inset" />
            </div>

            <div className="flex-1 flex flex-col transition-all duration-300 ease-in-out ml-5">
                <main className="flex-1 p-4 overflow-auto m-5 rounded-3xl bg-white">
                    {children}
                </main>
            </div>
        </div>
    );
}