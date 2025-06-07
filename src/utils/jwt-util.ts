import {jwtDecode} from 'jwt-decode';

interface JwtPayload {
    id: string;
    userId: string;
    membership?: string;
}

export function getIdFromToken(token: string): string | null {
    try {
        const decoded = jwtDecode<JwtPayload>(token);
        return decoded.id;
    } catch (err) {
        console.error('Invalid token:', err);
        return null;
    }
}

export function getUserFromToken(token: string): JwtPayload | null {
    try {
        const decoded = jwtDecode<JwtPayload>(token);
        return decoded;
    } catch (err) {
        console.error('Invalid token:', err);
        return null;
    }
}

export function checkAccessToken() {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
        throw new Error("인증 토큰이 없습니다. 다시 로그인해 주세요.");
    }
    return accessToken;
}