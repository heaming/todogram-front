import {Skeleton} from "@/components/ui/skeleton";

const TodoSkeleton = () => {

    return (
        <div className="flex flex-col space-y-3 h-[300px] w-[350px]">
            <Skeleton className="h-[50px] w-[350px] bg-zinc-200 rounded-xl"/>
            <div className="space-y-2 ml-2">
                <div className="flex space-x-2">
                    <Skeleton className="h-4 w-4 rounded-full bg-zinc-200" />
                    <Skeleton className="h-4 w-[316px] bg-zinc-200"/>
                </div>
                <div className="flex space-x-2">
                    <Skeleton className="h-4 w-4 rounded-full bg-zinc-200" />
                    <Skeleton className="h-4 w-[316px] bg-zinc-200"/>
                </div>
                <div className="flex space-x-2">
                    <Skeleton className="h-4 w-4 rounded-full bg-zinc-200" />
                    <Skeleton className="h-4 w-[280px] bg-zinc-200"/>
                </div>
                <div className="flex space-x-2">
                    <Skeleton className="h-4 w-4 rounded-full bg-zinc-200" />
                    <Skeleton className="h-4 w-[215px] bg-zinc-200"/>
                </div>
                <div className="flex space-x-2">
                    <Skeleton className="h-4 w-4 rounded-full bg-zinc-200" />
                    <Skeleton className="h-4 w-[295px] bg-zinc-200"/>
                </div>
                <div className="flex space-x-2">
                    <Skeleton className="h-4 w-4 rounded-full bg-zinc-200" />
                    <Skeleton className="h-4 w-[280px] bg-zinc-200"/>
                </div>
            </div>
            <Skeleton className="mt-15 h-[40px] w-[350px] bg-zinc-200 rounded-xl"/>
        </div>
    );
}

export default TodoSkeleton;