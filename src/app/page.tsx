'use client';

import React, {useEffect, useState} from "react";
import dayjs from "dayjs";
import {useRouter} from "next/navigation";
import Home from "@/components/layout/Home";
import Login from "@/components/login/Login";

require('dayjs/locale/ko');
dayjs().locale('ko');

export default function Page() {
    return (<Home/>);
}