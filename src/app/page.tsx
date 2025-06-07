'use client';

import React, {useEffect, useState} from "react";
import dayjs from "dayjs";
import {useRouter} from "next/navigation";
import {getIdFromToken} from "@/utils/jwt-util";

require('dayjs/locale/ko');
dayjs().locale('ko');

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) return;

        const id = getIdFromToken(token);
        if (id) {
            router.push(`/user/${id}/todos`);
        }
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-800"/>
        </div>
    );
}