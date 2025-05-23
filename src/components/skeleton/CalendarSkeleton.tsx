import {Skeleton} from "@/components/ui/skeleton";

const CalendarSkeleton = () => {

    return (
        <div className="flex flex-col space-y-3 h-[300px] w-[350px]">
            <Skeleton className="h-[50px] w-[200px] bg-zinc-200 rounded-xl"/>
            <Skeleton className="h-[20px] w-[350px] bg-zinc-200 rounded-xl"/>
            <Skeleton className="h-[240px] w-[350px] bg-zinc-200 rounded-xl"/>
        </div>
    );
}

export default CalendarSkeleton;