import {Day, DayButton, DayPicker} from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import {useEffect, useState} from 'react';
import {ko} from "date-fns/locale";
import dayjs from "dayjs";
import {clsx} from "clsx";
import {loadingType} from "@/app/user/[id]/todos/page";
import {getDoneDates} from "@/api/todo/todo";

interface CalendarProps {
    id: string;
    onLoad: (type: loadingType, loading: boolean) => void;
    onSelectDate: (date: Date) => void;
    onDone: boolean | null;
}

const TodogramDayButton = (props: any) => {
    const isAllDone = props.modifiers.allDone;

    return (
        <button
            {...props}
            className={clsx(props.className, isAllDone && 'all-done')}
            type="button"
        >
            {props.children}
        </button>
    );
};

export const Calendar = ({ id, onSelectDate, onLoad, onDone }: CalendarProps ) =>  {
    const [selected, setSelected] = useState<Date>(new Date());
    const [isLoading, setIsLoading] = useState(true);
    const [allDoneDates, setAllDoneDates] = useState<Date[]>([]);

    const onSelect = () => {
        onSelectDate(selected || new Date);
    }

    const handleSelect = (date: Date | undefined) => {
        if (!date) return;
        if (selected && isSameDay(date, selected)) return;

        setSelected(date);
        onSelectDate(date);
    };

    const convertToDate = (dates: string[]) => {
        if (!dates || dates.length <= 0) return [];
        return dates.map(date =>dayjs(date).toDate());
    }

    const isSameDay = (a: Date, b: Date) => {
        return a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate();
    }

    const modifiers = {
        allDone: (date: Date) => allDoneDates.some(d => isSameDay(d, date)),
    };

    const modifiersClassNames = {
        allDone: 'all-done',
    };

    const fetchData = async (id: string, selectedYM: string) => {
        setIsLoading(true);
        try {
            const dates = await getDoneDates(id, selectedYM);
            if (!dates || dates.length <= 0) return;

            const convertedDates = convertToDate(dates);
            if (!convertedDates || convertedDates.length <= 0) return;

            setAllDoneDates(convertedDates);
        } catch (e) {
            console.log("failed to fetch calendar",e);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        onSelect();
    }, [selected]);

    useEffect(() => {
        if (!id) return;
        const selectedYM = dayjs(new Date()).format('YYYYMM');
        fetchData(id, selectedYM);
    }, [id]);

    useEffect(() => {
        onLoad('calendar', isLoading);
    }, [isLoading]);

    useEffect(() => {
        if (onDone === null) return;
        if (onDone) {
            setAllDoneDates(prev => {
                if (prev.some(d => isSameDay(d, selected))) return prev;
                return [...prev, selected];
            });
        } else {
            setAllDoneDates(prev => prev.filter(d => !isSameDay(d, selected)));
        }
    }, [onDone]);

    return (
        <div className="pl-8 py-2">
            <DayPicker
                locale={ko}
                mode="single"
                selected={selected}
                onSelect={handleSelect}
                showOutsideDays
                modifiers={modifiers}
                modifiersClassNames={modifiersClassNames}
                components={{
                    DayButton: TodogramDayButton,
                }}
                onMonthChange={(month) => {
                    const selectedYM = dayjs(month).format('YYYYMM');
                    fetchData(id, selectedYM);
                }}
            />
        </div>
    );
}
