import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Mail, MessageSquare } from "lucide-react"

interface ContactDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function ContactDialog({ open, onOpenChange }: ContactDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-white border-zinc-200 shadow-2xl w-[330px]">
                <DialogHeader className="justify-center items-center">
                    <DialogTitle className="text-[#00BC7DFF]">💬 더 필요한 기능이 있나요? 💬</DialogTitle>
                    <DialogDescription className="text-xs text-zinc-400">개발자에게 바로 연락해보세요! 빠르게 도와드릴게요</DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4 items-center mt-2">
                    <a
                        href="mailto:meetoohi@gmail.com"
                        className="flex items-center gap-2 text-green-600 hover:underline text-sm"
                    >
                        <Mail size={16} />
                        meetoohi@gmail.com
                    </a>
                    {/*<a*/}
                    {/*    href="https://open.kakao.com/o/your-link"*/}
                    {/*    target="_blank"*/}
                    {/*    rel="noopener noreferrer"*/}
                    {/*    className="flex items-center gap-2 text-yellow-600 hover:underline text-sm"*/}
                    {/*>*/}
                    {/*    <MessageSquare size={16} />*/}
                    {/*    오픈카톡으로 문의하기*/}
                    {/*</a>*/}
                </div>
            </DialogContent>
        </Dialog>
    )
}