"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import {motion} from "framer-motion";

interface NoticeDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function NoticeDialog({ open, onOpenChange }: NoticeDialogProps) {
    const variants = {
        pulse: {
            opacity: [0.3, 1, 0.3],
            transition: {
                repeat: Infinity,
                duration: 3,      // 느리게 3초
                ease: "easeInOut",
            },
        },
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-white border-zinc-200 shadow-2xl w-[330px]">
                <div className="flex justify-center items-center gap-4 my-1">
                    <motion.div
                        className="w-3 h-3 rounded-full bg-[#00BC7D66]"
                        variants={variants}
                        animate="pulse"
                        transition={{repeatDelay: 0, delay: 0}}
                    />
                    <motion.div
                        className="w-3 h-3 rounded-full bg-[#00BC7D99]"
                        variants={variants}
                        animate="pulse"
                        transition={{repeatDelay: 0, delay: 0.7}}
                    />
                    <motion.div
                        className="w-3 h-3 rounded-full bg-[#00BC7DFF]"
                        variants={variants}
                        animate="pulse"
                        transition={{repeatDelay: 0, delay: 1.4}}
                    />
                </div>
                {/*<DialogHeader className="justify-center items-center">*/}
                {/*    <DialogTitle className="text-[#00BC7DFF]">🚀 3 updates you’ll love! 🚀</DialogTitle>*/}
                {/*    <DialogDescription className="text-xs text-zinc-400">A quick look at what’s next!</DialogDescription>*/}
                {/*</DialogHeader>*/}
                {/*<div className="space-y-4 mt-2 text-sm">*/}
                {/*    <div>*/}
                {/*        <h4 className="font-medium flex items-center gap-2">☁️ Todos, anywhere*/}
                {/*            <Badge className="bg-[#00BC7D99] border-none text-white" variant="outline">Coming*/}
                {/*            Soon</Badge></h4>*/}
                {/*        <p className="text-xs text-zinc-500 pl-6">Sync and go — anytime, any device.</p>*/}
                {/*    </div>*/}
                {/*    <div>*/}
                {/*        <h4 className="font-medium flex items-center gap-2">👀 Friend mode*/}
                {/*            <Badge className="bg-[#00BC7D99] border-none text-white" variant="outline">Coming*/}
                {/*                Soon</Badge></h4>*/}
                {/*        <p className="text-xs text-zinc-500 pl-6">See friends’ todos and cheer them on!</p>*/}
                {/*    </div>*/}
                {/*    <div>*/}
                {/*        <h4 className="font-medium flex items-center gap-2">🧡 Make it yours*/}
                {/*            <Badge className="bg-[#00BC7D99] border-none text-white" variant="outline">*/}
                {/*                Beta*/}
                {/*            </Badge></h4>*/}
                {/*        <p className="text-xs text-zinc-500 pl-6">Add colors and emojis your way.</p>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <DialogHeader className="justify-center items-center">
                    <DialogTitle className="text-[#00BC7DFF]">🚀 곧 만나요! 새 기능 3종 🚀</DialogTitle>
                    <DialogDescription className="text-xs text-zinc-400">다가올 업데이트를 미리 만나보세요!</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-2 text-sm">
                    <div>
                        <h4 className="font-medium flex items-center gap-2">☁️ 어디서든 내 Todo를!
                            <Badge className="bg-[#00BC7D99] border-none text-white" variant="outline">Coming
                                Soon</Badge></h4>
                        <p className="text-xs text-zinc-500 pl-6">클라우드 저장으로 언제 어디서든 이어쓰기</p>
                    </div>
                    <div>
                        <h4 className="font-medium flex items-center gap-2">👀 친구의 할 일 엿보기?
                            <Badge className="bg-[#00BC7D99] border-none text-white" variant="outline">Coming
                                Soon</Badge></h4>
                        <p className="text-xs text-zinc-500 pl-6">친구와 할 일을 공유하고 응원도 보내보세요</p>
                    </div>
                    <div>
                        <h4 className="font-medium flex items-center gap-2">🧡 가볍지만 더 예쁘게
                            <Badge className="bg-[#00BC7D99] border-none text-white" variant="outline">
                                Beta
                            </Badge></h4>
                        <p className="text-xs text-zinc-500 pl-6">다양한 색상과 이모지로 todogram을 꾸며보세요</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
