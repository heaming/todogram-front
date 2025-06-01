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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

type PasswordForm = {
    userId: string;
    password: string;
    authNum: string;
}

interface PasswordFormProps {
    onLoginSuccess: (token: string) => void;
    pageType: (type: LoginPageType) => void;
}

export function PasswordForm({ onLoginSuccess, pageType }: PasswordFormProps) {
    const { register, handleSubmit, formState, getValues } = useForm<PasswordForm>();
    const [loading, setLoading] = useState(false);
    const [authenticating, setAuthenticating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [step, setStep] = useState('0');
    const [authState, setAuthState] = useState<string | null>(null);
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);

    const handleChangePassword = (request: PasswordForm) => {
        if (!request.password.trim()) {
            setError("비밀번호를 입력해주세요.")
            return;
        }

        if (!request.userId.trim() || !request.authNum.trim()) {
            setError("회원가입 중 오류가 발생했습니다.")
            return;
        }

        setLoading(true);
        setError(null);

        try {
            if (request.userId === 'admin' && request.authNum === '1234') {
                setSuccessDialogOpen(true);
            } else {
                setError("회원 정보를 확인하세요.")
            }
        } catch (err) {
            setError("회원가입 중 오류가 발생했습니다.")
        } finally {
            setLoading(false);
        }
    }

    const sendAuthNum = () => {
        // 인증번호 전송
        const { userId } = getValues();
        if (!userId.trim()) return;

        setAuthState(null);

        try {
            if (userId === 'admin') {
                setStep('1');
            } else {
                setAuthState("가입되지 않은 계정입니다.")
            }
        } catch (err) {
            setAuthState('계정 조회 중 오류가 발생했습니다.');
        } finally {
            setAuthenticating(false);
        }
    }

    const checkAuthNum = () => {
        const { userId, authNum } = getValues();

        if (!userId.trim()) {
            setAuthState("정확한 이메일을 입력하세요.")
        }

        if (!authNum.trim()) {
            setAuthState("인증번호를 정확하게 입력하세요.")
        }

        setAuthenticating(true);
        setAuthState(null);

        // 인증번호 확인
        try {
            if (userId === 'admin' && authNum === '1234') {
                setStep('2');
            } else {
                setAuthState("인증번호를 정확하게 입력하세요.")
            }
        } catch (err) {
            setAuthState('회원가입 중 오류가 발생했습니다.');
        } finally {
            setAuthenticating(false);
        }
    }

    return (
        <div className={"flex flex-col gap-6"}>
            <Card className="bg-white border-zinc-200 shadow-xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl bg-gradient-to-r from-[#00BC7D] via-[#00A86B] to-[#007F5F] bg-clip-text text-transparent">
                        비밀번호 찾기
                    </CardTitle>
                    <div
                        className="text-zinc-300 after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                        <span className="bg-white text-zinc-400 text-xs relative z-10 px-2">
                            가벼운 투두리스트, todogram
                        </span>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(handleChangePassword)}>
                        <div className="grid gap-6">
                            <div className="grid gap-6">
                                {/* 이메일 입력 */}
                                {step && step === '0' &&
                                    <>
                                    <div className="grid gap-3">
                                        <div className="flex items-center">
                                            <Label htmlFor="email">이메일</Label>
                                            <a
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    sendAuthNum();
                                                }}
                                                href="#"
                                                className={`ml-auto text-xs underline-none text-zinc-500 hover:text-[#00BC7D]`}
                                            >
                                                인증번호 받기
                                            </a>
                                        </div>
                                        <input
                                            id="userId"
                                            {...register("userId", {required: "이메일은 필수입니다"})}
                                            placeholder={"이메일을 입력하세요"}
                                            className="rounded-md border-1 border-zinc-200 py-1 px-2 text-sm"
                                        />
                                    </div>
                                    {authState &&
                                        <p className="text-xs text-red-400">
                                        {authState}
                                        </p>
                                    }
                                    </>
                                }
                                {/* 이메일 인증 */}
                                {step && step === '1' &&
                                    <>
                                        <div className="grid gap-3">
                                            <div className="flex items-center">
                                                <Label htmlFor="email">이메일</Label>
                                                <a
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        sendAuthNum();
                                                    }}
                                                    href="#"
                                                    className={`ml-auto text-xs underline-none text-zinc-500 hover:text-[#00BC7D]`}
                                                >
                                                    인증번호 재전송
                                                </a>
                                            </div>
                                            <input
                                                id="userId"
                                                {...register("userId", {required: "이메일은 필수입니다"})}
                                                placeholder={"이메일을 입력하세요"}
                                                className="rounded-md border-1 border-zinc-200 py-1 px-2 text-sm"
                                                disabled
                                            />
                                        </div>
                                        <input
                                            id="authNum"
                                            {...register("authNum", {required: "인증번호는 필수입니다"})}
                                            placeholder={"인증번호를 입력하세요"}
                                            className="rounded-md border-1 border-zinc-200 py-1 px-2 text-sm"
                                        />
                                        {authState &&
                                            <p className="text-xs text-red-400">
                                                {authState}
                                            </p>
                                        }
                                        <Button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                checkAuthNum();
                                            }}
                                            disabled={authenticating}
                                            className="cursor-pointer w-full bg-zinc-100 hover:text-white hover:bg-[#00BC7DFF]"
                                        >
                                            {authenticating ? '이메일 인증 중...' : '이메일 인증'}
                                        </Button>
                                    </>
                                }

                                {/* 회원 정보 입력 */}
                                {step && step === '2' &&
                                    <>
                                        <div className="grid gap-3">
                                            <div className="flex items-center">
                                                <Label htmlFor="email">이메일</Label>
                                                <p
                                                    className={`ml-auto text-xs underline-none text-[#00BC7D]`}
                                                >
                                                    이메일 인증 완료
                                                </p>
                                            </div>
                                            <input
                                                id="userId"
                                                {...register("userId", {required: "이메일은 필수입니다"})}
                                                placeholder={"이메일을 입력하세요"}
                                                className="rounded-md border-1 border-zinc-200 py-1 px-2 text-sm"
                                                disabled
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="password">새로운 비밀번호</Label>
                                            <input
                                                id="password"
                                                type="password"
                                                {...register("password", {required: "이메일은 필수입니다"})}
                                                placeholder="비밀번호를 입력하세요"
                                                className="rounded-md border-1 border-zinc-200 py-1 px-2 text-sm"
                                            />
                                            {error &&
                                                <p className="text-xs text-red-400">
                                                    {error}
                                                </p>
                                            }
                                            <Button type="submit"
                                                    className="cursor-pointer w-full bg-zinc-100 hover:text-white hover:bg-[#00BC7DFF]">
                                                {loading ? '비밀번호 변경 중...' : '비밀번호 변경'}
                                            </Button>
                                        </div>
                                    </>
                                }
                            </div>
                            <div className="text-center text-xs text-zinc-500">
                                todogram 계정이 있어요!{"  "}
                                <a
                                    onClick={(e) => pageType('LOGIN')}
                                    href="#" className="underline underline-offset-5 text-xs hover:text-[#00BC7D]">
                                    로그인
                                </a>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
                <DialogContent className="w-[300px] bg-white border-none rounded-xl px-6 py-4 shadow-xl  [&>button]:hidden">
                    <DialogHeader className="space-y-2">
                        <DialogTitle className="text-lg font-semibold text-center text-[#00BC7D]">
                            🔐 비밀번호 변경 성공!
                        </DialogTitle>
                        <DialogDescription className="text-sm text-zinc-500 text-center">
                            변경이 완료되었어요. <br />
                            지금 바로 로그인해보세요!
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="pt-4">
                        <Button
                            onClick={() => {
                                setSuccessDialogOpen(false);
                                pageType("LOGIN");
                            }}
                            className="w-full bg-[#00BC7D] text-white hover:bg-[#009E68]"
                        >
                            로그인하러 가기
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            {/*<div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">*/}
            {/*    By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}*/}
            {/*    and <a href="#">Privacy Policy</a>.*/}
            {/*</div>*/}
        </div>
    )
}
