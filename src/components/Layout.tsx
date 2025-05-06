// components/Layout.tsx

import React, {ReactNode, useEffect, useState} from 'react';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true); // 클라이언트에서만 실행
    }, []);

    // 서버 사이드에서는 className을 기본 값으로 설정하고, 클라이언트에서만 변경
    const dynamicClassName = isClient ? 'min-h-screen flex flex-col' : 'min-h-screen flex flex-col';

    return (
        <div className={dynamicClassName}>
            <header className="bg-gray-800 text-white p-4">
                <nav>
                    <ul className="flex space-x-4">
                        <li><a href="/" className="hover:text-gray-400">Home</a></li>
                        <li><a href="/about" className="hover:text-gray-400">About</a></li>
                    </ul>
                </nav>
            </header>
            <main className="flex-grow p-4">
                {children}
            </main>
            <footer className="bg-gray-800 text-white text-center p-4">
                <p>© 2025 Hey._.mi</p>
            </footer>
        </div>
    );
};

export default Layout;
