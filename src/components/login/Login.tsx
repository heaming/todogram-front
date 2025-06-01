'use client';

import React, { useState } from 'react';
import {LoginForm} from "@/components/login/LoginForm";
import {JoinForm} from "@/components/login/JoinForm";
import {PasswordForm} from "@/components/login/PasswordForm";

interface LoginProps {
    onLoginSuccess: (token: string) => void;
}

export type LoginPageType = 'LOGIN' | 'JOIN' | 'PASSWORD';

export default function Login({ onLoginSuccess }: LoginProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [pageType, setPageType] = useState<LoginPageType>('LOGIN');

    const handleLogin = async () => {
        setLoading(true);
        setError(null);

        try {
            // 실제 API 호출은 여기서!
            // 예시: fetch('/api/login', { method: 'POST', body: JSON.stringify({username, password}) })
            // 지금은 임시로 로그인 성공 가정, token은 예시값
            if (username === 'admin' && password === '1234') {
                const fakeToken = 'fake-jwt-token';
                onLoginSuccess(fakeToken);
            } else {
                setError('아이디 또는 비밀번호가 잘못되었습니다.');
            }
        } catch (err) {
            setError('로그인 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const handlePageType = (type: LoginPageType) => {
        if (type === 'JOIN') {
            setPageType('JOIN');
        } else if (type === 'PASSWORD') {
            setPageType('PASSWORD');
        } else {
            setPageType('LOGIN');
        }
    }

    return (
        <>
            <div className="bg-zinc-100 flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
                <div className="flex w-full max-w-sm flex-col gap-6">
                    <div className="flex items-center gap-2 self-center font-medium">
                            <div className="h-4 w-4 rounded-full bg-[#00BC7D66]"/>
                            <div className="h-4 w-4 rounded-full bg-[#00BC7D99]"/>
                            <div className="h-4 w-4 rounded-full bg-[#00BC7DFF]"/>
                    </div>
                    { pageType === 'LOGIN' &&
                        <LoginForm onLoginSuccess={onLoginSuccess} pageType={handlePageType}/>
                    }
                    { pageType === 'JOIN' &&
                        <JoinForm pageType={handlePageType}/>
                    }
                    { pageType === 'PASSWORD' &&
                        <PasswordForm onLoginSuccess={onLoginSuccess} pageType={handlePageType}/>
                    }
                </div>
            </div>
        </>

    );
}
