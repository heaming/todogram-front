import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export',
    trailingSlash: true, // 모든 경로에 '/' 붙이도록 (파일로 인식)
    images: {
        unoptimized: true, // 'next/image' 사용 시 필수
    },
    assetPrefix: '.'
};

export default nextConfig;
