import React, { useEffect, useState } from 'react';
import './MassLetterFinishDate.scss'

const MassLetterFinishDate = () => {
    const [showReminder, setShowReminder] = useState(false);
    const [showCalls, setShowCalls] = useState(false);

    useEffect(() => {
        const finishDateString = localStorage.getItem('massLetterFinishDate');
        if (finishDateString) {
            const finishDate = new Date(finishDateString);
            const currentDate = new Date();
            const fiveDaysLater = new Date(finishDate);
            fiveDaysLater.setDate(fiveDaysLater.getDate() + 5);

            if (currentDate >= fiveDaysLater) {
                setShowReminder(true);
            }
        } else {
            setShowReminder(true); // Если дата не найдена, показать уведомление
        }

        const finishDateCalls = localStorage.getItem('callsFinishDate');
        if (finishDateCalls) {
            const finishDate = new Date(finishDateCalls);
            const currentDate = new Date();
            const fiveDaysLater = new Date(finishDate);
            fiveDaysLater.setDate(fiveDaysLater.getDate() + 15);

            if (currentDate >= fiveDaysLater) {
                setShowCalls(true);
            }
        } else {
            setShowCalls(true); // Если дата не найдена, показать уведомление
        }
    }, []);

    return (
        <>
            <div>
                {showReminder && (
                    <div className={'mass-letter-finish-date'}>
                        <p className={'mass-letter-finish-date-text'}>
                            Ви давно не робили масову розсилку, зробіть, будь ласка, сьогодні!{" "}
                            <button className={'do-mass-button'} onClick={() => window.open('https://www.charmdate.com/clagt/woman/helpsys.php?help_type=2')}>Зробити</button>
                        </p>
                    </div>
                )}
            </div>
            <div>
                {showCalls && (
                    <div className={'mass-letter-finish-date'}>
                        <p className={'mass-letter-finish-date-text'}>
                            Ви не робили CALLS розсилку більше 15 днів, зробіть, будь ласка, сьогодні!{" "}
                            <button className={'do-mass-button'} onClick={() => window.open('https://www.charmdate.com/clagt/about/contact_us.php')}>Зробити</button>
                        </p>
                    </div>
                )}
            </div>
        </>

    );
};

export default MassLetterFinishDate;
