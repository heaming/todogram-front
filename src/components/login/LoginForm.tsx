import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form";
import {useState} from "react";
import {trim} from "lodash";
import {LoginPageType} from "@/components/login/Login";

type LoginForm = {
    userId: string;
    password: string;
}

interface LoginFormProps {
    onLoginSuccess: (token: string) => void;
    pageType: (type: LoginPageType) => void;
}

export function LoginForm({ onLoginSuccess, pageType }: LoginFormProps) {
    const { register, handleSubmit, formState } = useForm<LoginForm>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = (request: LoginForm) => {
        if (!request.userId.trim() || !request.password.trim()) {
            setError("아이디와 비밀번호를 모두 입력해주세요")
            return;
        }

        setLoading(true);
        setError(null);

        try {
            console.log(request);
            if (request.userId === 'admin' && request.password === '1234') {
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
    }

    return (
        <div className={"flex flex-col gap-6"}>
            <Card className="bg-white border-zinc-200 shadow-xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl bg-gradient-to-r from-[#00BC7D] via-[#00A86B] to-[#007F5F] bg-clip-text text-transparent">
                        todogram
                    </CardTitle>
                    <div
                        className="text-zinc-300 after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                        <span className="bg-white text-zinc-400 text-xs relative z-10 px-2">
                            가벼운 투두리스트, todogram
                        </span>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <div className="grid gap-6">
                            <div className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="email">이메일</Label>
                                    <input
                                        id="email"
                                        {...register("userId", { required: "이메일은 필수입니다" })}
                                        placeholder="이메일을 입력하세요"
                                        className="rounded-md border-1 border-zinc-200 py-1 px-2 text-sm"
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">비밀번호</Label>
                                        <a
                                            onClick={(e) => pageType('PASSWORD')}
                                            href="#"
                                            className="ml-auto text-xs underline-none text-zinc-500 hover:text-[#00BC7D]"
                                        >
                                            비밀번호를 잊어버렸나요?
                                        </a>
                                    </div>
                                    <input
                                        id="password"
                                        type="password"
                                        {...register("password", { required: "이메일은 필수입니다" })}
                                        placeholder="비밀번호를 입력하세요"
                                        className="rounded-md border-1 border-zinc-200 py-1 px-2 text-sm"
                                    />
                                    {error &&
                                        <p className="text-xs text-red-400">
                                            {error}
                                        </p>
                                    }
                                </div>
                                <Button type="submit"
                                        className="cursor-pointer w-full bg-zinc-100 hover:text-white hover:bg-[#00BC7DFF]">
                                    {loading ? '로그인 중...' : '로그인'}
                                </Button>
                            </div>
                            <div className="text-center text-xs text-zinc-500">
                                todogram이 처음이신가요?{"  "}
                                <a
                                    onClick={(e) => pageType('JOIN')}
                                    href="#" className="underline underline-offset-5 text-xs hover:text-[#00BC7D]">
                                    회원가입
                                </a>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
            {/*<div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">*/}
            {/*    By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}*/}
            {/*    and <a href="#">Privacy Policy</a>.*/}
            {/*</div>*/}
        </div>
    )
}
