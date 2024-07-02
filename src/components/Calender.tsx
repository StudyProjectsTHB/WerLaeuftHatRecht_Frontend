import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

const CalendarView: React.FC = () => {
    const [date, setDate] = React.useState(new Date());

    const markers = {
        '2024-06-01': 'green',
        '2024-06-05': 'red',
        '2024-06-10': 'orange',
        '2024-06-19': 'green',
    };

    const getTileContent = ({ date, view }) => {
        if (view === 'month') {
            const dateString = date.toISOString().split('T')[0];
            if (markers[dateString]) {
                return <div className={`marker ${markers[dateString]}`} />;
            }
        }
        return null;
    };

    const navigationLabel = ({ date, view, label }) => {
        if (view === 'month') {
            const month = date.toLocaleString('default', { month: 'long' });
            const year = date.getFullYear();
            return (
                <div>
                    <button onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() - 1))}>{'<'}</button>
                    <span>{`${month} ${year}`}</span>
                    <button onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() + 1))}>{'>'}</button>
                </div>
            );
        }
        return label;
    };

    return (
        <div className={"calendar-container"}>
            <div className={"legende"}>
                <p className={"red"}>keine Daten</p>
                <p className={"yellow"}>Ziel nicht erreicht</p>
                <p className={"green"}>Ziel erreicht</p>
            </div>
            <Calendar
                onChange={setDate}
                value={date}
                tileContent={getTileContent}
                navigationLabel={navigationLabel}
                next2Label={null}
                prev2Label={null}/>

        </div>
    )
};

export default CalendarView;
