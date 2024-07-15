import React, {useEffect} from 'react';
import Calendar from 'react-calendar';
import { TileContentProps, Markers, NavigationLabelProps } from '../types';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';
import {formatDate} from "../util/service/util";

const CalendarView: React.FC<{days:string[], steps:number[], stepGoal: number, onDateClick: (date: string) => void}> = ({days, steps, stepGoal, onDateClick}) => {
    const [date, setDate] = React.useState(new Date());
    const [markers, setMarkers] = React.useState<Markers>({});

    useEffect(() => {
        const generateMarkers = (): Markers => {
            const markers: Markers = {};
            for (let i = 0; i < days.length; i++) {
                markers[days[i]] = steps[i] === 0 ? 'red' : steps[i] < stepGoal ? 'orange' : 'green';
            }
            return markers;
        };

        setMarkers(generateMarkers());
        handleDateChange(date);
    }, [days, steps, stepGoal]);




    const getTileContent = ({ date, view }: TileContentProps): React.ReactNode => {
        if (view === 'month') {
            const normalizedDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
            const dateString = formatDate(normalizedDate);
            if (markers[dateString]) {
                return <div className={`marker ${markers[dateString]}`} />;
            }
        }
        return null;
    };

    const navigationLabel = ({ date, view, label }: NavigationLabelProps) => {
        if (view === 'month') {
            const month = date.toLocaleString('default', { month: 'long' });
            const year = date.getFullYear();
            return (
                <div>
                    {/*<button type="button"*/}
                    {/*        onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() - 1))}>{'<'}</button>*/}
                    {/*<div className="nav-button"*/}
                    {/*     onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() - 1))}>{'<'}</div>*/}
                    <span className="react-calendar__navigation__label">{`${month} ${year}`}</span>
                    {/*<button type="button"*/}
                    {/*        onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() + 1))}>{'>'}</button>*/}
                    {/*<div className="nav-button"*/}
                    {/*     onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() + 1))}>{'>'}</div>*/}
                </div>
            );
        }
        return label;
    };

    const handleDateChange = (selectedDate:Date) => {
        setDate(selectedDate);
        const normalizedDate = new Date(Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()));
        const dateString = formatDate(normalizedDate);
        onDateClick(dateString);
    };

    return (
        <div className={"calendar-container"}>
            <div className={"legende"}>
                <p className={"red"}>keine Daten</p>
                <p className={"yellow"}>Ziel nicht erreicht</p>
                <p className={"green"}>Ziel erreicht</p>
            </div>
            <Calendar
                onChange={handleDateChange}
                value={date}
                tileContent={getTileContent}
                navigationLabel={navigationLabel}
                next2Label={null}
                prev2Label={null}
            />
        </div>
    )
};

export default CalendarView;
