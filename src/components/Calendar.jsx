import React, { useEffect, useState } from 'react';

const Calendar = () => {
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        const currentDate = new Date();
        const day = currentDate.getDate().toString().padStart(2, '0');
        const month = getThreeLetterMonth(currentDate.getMonth());
        const year = currentDate.getFullYear().toString().slice(-2);

        const formattedDateString = `${day} ${month} ${year}`;
        setFormattedDate(formattedDateString);
    }, []);

    const getThreeLetterMonth = (monthIndex) => {
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        return months[monthIndex];
    };

    return (
        <div className='text-xl'><p>{formattedDate}</p></div>
    );
};

export default Calendar;
