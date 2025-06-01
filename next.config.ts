import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: "/api/v1/:path*",       // 프론트 요청 경로
                destination: "http://localhost:4000/api/v1/:path*", // 백엔드 주소
            },
        ];
    },
};

export default nextConfig;
