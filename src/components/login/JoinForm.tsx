import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form";
import {useRef, useState} from "react";
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
import {validateEmail} from "@/utils/util";
import {registerUser, sendVerifyEmail, verifyCode} from "@/api/user/user";
import {generateKeyBetween} from "fractional-indexing";
import {Category} from "@/models/category";
import {addCategory, addInitialCategory} from "@/api/category/category";

const createInitialCategory = (userId: string): Category => {
    return {
        color: "#00BC7DFF",
        content: "내 카테고리",
        createdAt: "",
        deletedAt: "",
        id: "",
        sort: generateKeyBetween(null, null),
        userId: userId
    }
}

type JoinForm = {
    userId: string;
    username: string;
    password: string;
    authCode: string;
}

interface JoinFormProps {
    pageType: (type: LoginPageType) => void;
}

export function JoinForm({ pageType }: JoinFormProps) {
    const { register, handleSubmit, formState, getValues } = useForm<JoinForm>();
    const [loading, setLoading] = useState(false);
    const [authenticating, setAuthenticating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [step, setStep] = useState('0');
    const [authState, setAuthState] = useState<string | null>(null);
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);

    const handleJoin = async (request: JoinForm) => {
        if (!request.password.trim() || !request.username.trim()) {
            setError("닉네임, 비밀번호를 모두 입력해주세요.")
            return;
        }

        if (!request.userId.trim() || !request.authCode.trim()) {
            setError("회원가입 중 오류가 발생했습니다.")
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const data = {
                userId: request.userId,
                password: request.password,
                username: request.username,
                authCode: request.authCode,
            }
            const res = await registerUser(data);
            if (res) {
                try {
                    const initialCategory = createInitialCategory(res.id);
                    const category = await addInitialCategory(initialCategory);
                    setSuccessDialogOpen(true);
                } catch (e) {
                    console.error('❌ addCategory 실패:', e);
                }
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const sendauthCode = async () => {
        // 인증번호 전송
        setAuthState(null);
        const { userId } = getValues();
        if (!userId.trim()) return;

        try {
            await sendVerifyEmail(userId);
        } catch (err: any) {
            setAuthState(err.message);
        } finally {
            setStep('1');
        }
    }

    const checkauthCode = async () => {
        setAuthState(null);
        const { userId, authCode } = getValues();

        if (!userId.trim() || !validateEmail(userId)) {
            setAuthState("정확한 이메일을 입력하세요.")
        }

        if (!authCode.trim()) {
            setAuthState("인증번호를 정확하게 입력하세요.")
        }

        setAuthenticating(true);
        setAuthState(null);

        // 인증번호 확인
        try {
            const result = await verifyCode(userId, authCode);
            if (result) {
                setStep('2');
            }
        } catch (err: any) {
            setAuthState(err.message);
        } finally {
            setAuthenticating(false);
        }
    }

    return (
        <div className={"flex flex-col gap-6"}>
            <Card className="bg-white border-zinc-200 shadow-xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl bg-gradient-to-r from-[#00BC7D] via-[#00A86B] to-[#007F5F] bg-clip-text text-transparent">
                        회원가입
                    </CardTitle>
                    <div
                        className="text-zinc-300 after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                        <span className="bg-white text-zinc-400 text-xs relative z-10 px-2">
                            가벼운 투두리스트, todogram
                        </span>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(handleJoin)}>
                        <div className="grid gap-6">
                            <div className="grid gap-6">
                                {/* 이메일 입력 */}
                                {step && step === '0' &&
                                    <div className="grid gap-3">
                                        <div className="flex items-center">
                                            <Label htmlFor="email">이메일</Label>
                                            <a
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    sendauthCode();
                                                }}
                                                href="#"
                                                className={`ml-auto text-xs underline-none text-zinc-500 hover:text-[#00BC7D]`}
                                            >
                                                이메일 인증하기
                                            </a>
                                        </div>
                                        <input
                                            id="userId"
                                            {...register("userId", {required: "이메일은 필수입니다"})}
                                            placeholder={"이메일을 입력하세요"}
                                            className="rounded-md border-1 border-zinc-200 py-1 px-2 text-sm"
                                        />
                                    </div>
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
                                                        sendauthCode();
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
                                            id="authCode"
                                            {...register("authCode", {required: "인증번호는 필수입니다"})}
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
                                                checkauthCode();
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
                                        <div className={`grid gap-3`}>
                                            <Label htmlFor="userName">닉네임</Label>
                                            <input
                                                id="username"
                                                maxLength={6}
                                                {...register("username", {required: "닉네임은 필수입니다"})}
                                                placeholder="닉네임을 입력하세요"
                                                className="rounded-md border-1 border-zinc-200 py-1 px-2 text-sm"
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="password">비밀번호</Label>
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
                                                {loading ? '회원가입 중...' : '회원가입'}
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
                            🎉 회원가입 성공!
                        </DialogTitle>
                        <DialogDescription className="text-sm text-zinc-500 text-center">
                            가입이 완료되었어요. <br />
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
