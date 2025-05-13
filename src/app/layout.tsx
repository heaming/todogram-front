// app/layout.tsx
import '@/styles/global.scss';
import '../styles/NotoSansKR.scss';
import { ReactNode } from 'react';
import Layout from '@/components/Layout';
import Head from "@/app/head";

export const metadata = {
    title: 'Todogram',
    description: 'Your description here',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="ko">
            <Head/>
            <body className="bg-zinc-100">
                <Layout children={children} />
            </body>
        </html>
    );
}
