import {Day, DayButton, DayPicker} from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import {useEffect, useState} from 'react';
import {Circle} from "lucide-react";
import {ko} from "date-fns/locale";

const todoData: Record<string, { total: number; done: number }> = {
    '2025-05-06': { total: 10, done: 3 },
    '2025-05-07': { total: 10, done: 7 },
    '2025-05-09': { total: 10, done: 10 },
    '2025-05-10': { total: 10, done: 2 },
    '2025-05-11': { total: 10, done: 10 },
};

interface CalendarProps {
    onSelectDate: (date: Date) => void;
}

export const Calendar = ({ onSelectDate }: CalendarProps ) =>  {
    const [selected, setSelected] = useState<Date>();

    const onSelect = () => {
        onSelectDate(selected || new Date);
    }

    useEffect(() => {
        onSelect();
    }, [selected]);

    return (
        <DayPicker
            locale={ko}
            mode="single"
            selected={selected}
            onSelect={setSelected}
            showOutsideDays
        />
    );
}
