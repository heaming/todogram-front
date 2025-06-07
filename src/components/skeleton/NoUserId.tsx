import React from 'react';

export function NoUserId() {
    return (
        <div
            style={{
                maxWidth: 480,
                margin: '40px auto',
                padding: '32px 24px',
                fontFamily: `'Segoe UI', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif`,
                backgroundColor: '#ffffff',
                border: '1px solid #e0e0e0',
                borderRadius: 12,
                textAlign: 'center',
                boxShadow: '0 2px 8px rgb(0 0 0 / 0.1)',
            }}
        >
            <h2 style={{ color: '#00BC7DFF', fontSize: 24, marginBottom: 16 }}>
                🐾 Todogram 알림
            </h2>

            <p style={{ fontSize: 16, color: '#333333', lineHeight: 1.5, marginBottom: 24 }}>
                사용자 ID를 찾을 수 없어요.<br />
                올바른 경로로 접속해 주세요!
            </p>

            <button
                onClick={() => window.location.reload()}
                style={{
                    backgroundColor: '#00BC7DFF',
                    border: 'none',
                    borderRadius: 8,
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 16,
                    padding: '10px 24px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 6px rgb(0 188 125 / 0.4)',
                    transition: 'background-color 0.3s',
                }}
                onMouseOver={e => (e.currentTarget.style.backgroundColor = '#009B66')}
                onMouseOut={e => (e.currentTarget.style.backgroundColor = '#00BC7DFF')}
                aria-label="페이지 새로고침"
            >
                새로고침
            </button>
        </div>
    );
}
