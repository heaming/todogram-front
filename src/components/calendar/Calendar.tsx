import {Day, DayButton, DayPicker} from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import {useEffect, useState} from 'react';
import {ko} from "date-fns/locale";
import {loadingType} from "@/app/page";

interface CalendarProps {
    onLoad: (type: loadingType, loading: boolean) => void;
    onSelectDate: (date: Date) => void;
}

export const Calendar = ({ onSelectDate, onLoad }: CalendarProps ) =>  {
    const [selected, setSelected] = useState<Date>();
    const [isLoading, setIsLoading] = useState(true);

    const onSelect = () => {
        onSelectDate(selected || new Date);
    }

    useEffect(() => {
        onSelect();
    }, [selected]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {

            } catch (e) {
                console.log("failed to fetch calendar");
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        onLoad('calendar', isLoading);
    }, [isLoading]);

    return (
        <div className="pl-8 py-2">
            <DayPicker
                locale={ko}
                mode="single"
                selected={selected}
                onSelect={setSelected}
                showOutsideDays
            />
        </div>
    );
}
