'use client';

import React, {ReactNode, useEffect, useState} from 'react';
import {SidebarInset, SidebarProvider, SidebarTrigger, useSidebar} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/layout/sidebar/AppSidebar";
import {Separator} from "@/components/ui/separator";
import {cn} from "@/lib/utils";
import LayoutWithSidebar from "@/components/layout/sidebar/SidebarLayout";
import SidebarLayout from "@/components/layout/sidebar/SidebarLayout";
import {Toaster} from "@/components/ui/sonner";
import Login from "@/components/login/Login";

interface LayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    if (isLoggedIn === null) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    if (!isLoggedIn) {
        return (
            <Login onLoginSuccess={(token: string) => {
                localStorage.setItem("token", token);
                setIsLoggedIn(true);
            }} />
        );
    }

    return (
        <SidebarProvider>
            <SidebarLayout>
                {children}
                <Toaster />
            </SidebarLayout>
        </SidebarProvider>
    );
};
