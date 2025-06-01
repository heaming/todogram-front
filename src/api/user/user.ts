export const sendVerifyEmail = async (userId: string) => {
    const response = await fetch('/api/v1/email/verification', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
        let errorMessage = '인증번호 전송 실패';

        try {
            const data = await response.json();
            if (data && data.message) {
                errorMessage = data.message;
            }
        } catch (e) {
            // JSON 파싱 실패해도 무시하고 기본 메시지 사용
        }

        throw new Error(errorMessage);
    }

    return
}

export const verifyCode = async (userId: string, authCode: string) => {
    const response = await fetch('/api/v1/email/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, authCode }),
    });

    if (!response.ok) {
        console.log(response);
        let errorMessage = '인증번호 전송 실패';

        try {
            const data = await response.json();
            if (data && data.message) {
                errorMessage = data.message;
            }
        } catch (e) {
            // JSON 파싱 실패해도 무시하고 기본 메시지 사용
        }

        throw new Error(errorMessage);
    }

    return await response.json(); // true / false 등 응답에 따라 처리
};

export const registerUser = async ( request : {userId: string, password: string, username: string, authCode: string}) => {
    try {
        const response = await fetch('/api/v1/user/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            let errorMessage = '회원가입 실패';
            try {
                const data = await response.json();
                if (data && data.message) {
                    errorMessage = data.message;
                }
            } catch (e) {
                // JSON 파싱 실패 시 기본 메시지 유지
            }
            throw new Error(errorMessage);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const login = async (userId: string, password: string) => {
    try {
        const response = await fetch('/api/v1/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, password }),
        });

        if (!response.ok) {
            let errorMessage = '로그인 실패';
            try {
                const data = await response.json();
                if (data && data.message) {
                    errorMessage = data.message;
                }
            } catch (e) {
                // JSON 파싱 실패 시 기본 메시지 유지
            }
            throw new Error(errorMessage);
        }

        const data = await response.json();
        localStorage.setItem('accessToken', data.accessToken);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}