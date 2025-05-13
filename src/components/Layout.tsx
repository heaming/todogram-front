'use client';

import React, {ReactNode, useEffect, useState} from 'react';
import {SidebarInset, SidebarProvider, SidebarTrigger, useSidebar} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/layout/sidebar/AppSidebar";
import {Separator} from "@/components/ui/separator";
import {cn} from "@/lib/utils";
import LayoutWithSidebar from "@/components/layout/sidebar/SidebarLayout";
import SidebarLayout from "@/components/layout/sidebar/SidebarLayout";

interface LayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const dynamicClassName = isClient ? 'min-h-screen flex flex-col' : 'min-h-screen flex flex-col';

    return (
        <SidebarProvider>
            <SidebarLayout>
                {children}
            </SidebarLayout>
        </SidebarProvider>
    );
};
