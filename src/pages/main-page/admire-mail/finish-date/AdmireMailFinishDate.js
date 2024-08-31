import React, { useEffect, useState } from 'react';
import './AdmireMailFinishDate.scss'

const AdmireMailFinishDate = () => {
    const [showReminder, setShowReminder] = useState(false);

    useEffect(() => {
        const finishDateString = localStorage.getItem('admireMailFinishDate');
        if (finishDateString) {
            const finishDate = new Date(finishDateString);
            const currentDate = new Date();

            // Устанавливаем начало дня в 02:00
            const startOfDay = new Date(currentDate);
            startOfDay.setHours(2, 0, 0, 0);

            // Устанавливаем конец дня (следующего) в 02:00
            const endOfDay = new Date(startOfDay);
            endOfDay.setDate(endOfDay.getDate() + 1);

            if (currentDate >= startOfDay && currentDate < endOfDay && finishDate < startOfDay) {
                setShowReminder(true);
            }
        } else {
            setShowReminder(true); // Если дата не найдена, показать уведомление
        }
    }, []);

    return (
        <>
            <div>
                {showReminder && (
                    <div className={'admire-mail-finish-date'}>
                        <p className={'admire-mail-finish-date-text'}>
                            Ви сьогодні ще не робили ADMIRE MAIL розсилку, зробіть, будь ласка, зараз!{" "}
                            <button className={'do-admire-button'} onClick={() => window.open('https://www.charmdate.com/clagt/manager/helpsys.php?menu_type=8&t=2')}>Зробити</button>
                        </p>
                    </div>
                )}
            </div>
        </>

    );
};

export default AdmireMailFinishDate;
