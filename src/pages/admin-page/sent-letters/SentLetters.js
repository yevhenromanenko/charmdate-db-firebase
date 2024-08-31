
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SentLetterComponent = ({ladyId}) => {
    const [sentLetters, setSentLetters] = useState(0);

    useEffect(() => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1; // Месяцы в JavaScript начинаются с 0
        const currentDay = currentDate.getDate();

        const fetchData = async () => {
            try {
                const response = await axios.get('https://www.charmdate.com/clagt/emf_wm_result.php', {
                    params: {
                        adddate_s_m: currentMonth,
                        adddate_s_d: currentDay,
                        adddate_s_y: currentYear,
                        adddate_e_m: currentMonth,
                        adddate_e_d: currentDay,
                        adddate_e_y: currentYear,
                        womanid: ladyId,
                    },
                    headers: {
                        accept: '*/*',
                        'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                        'x-requested-with': 'XMLHttpRequest',
                    },
                    withCredentials: true,
                });

                // const parser = new DOMParser();
                // const htmlDocument = parser.parseFromString(response.data, 'text/html');
                // const fontElement = htmlDocument.querySelector('font[color="#FF0000"]');
                // console.log(fontElement, 'fontElement')
                // const sentLettersValue = fontElement ? fontElement.innerText : 0;
                // console.log(sentLettersValue, 'sentLettersValue')
                //
                // setSentLetters(sentLettersValue);


                // Используем регулярное выражение для поиска совпадения в тексте HTML
                const match = response.data.match(/Total<font color="FF0000"> (\d+) <\/font>EMF mails/);
                console.log(match, 'match')
                if (match) {
                    const numberOfSentLetters = parseInt(match[1], 10);
                    console.log(numberOfSentLetters)
                    setSentLetters(numberOfSentLetters);
                }
            } catch (error) {
                console.error('Ошибка запроса:', error);
            }
        };

        fetchData();
    }, [ladyId]); // Зависимость пуста, запрос будет выполнен только при монтировании компонента

    return (<><span style={{color: 'peru', display: 'inline'}}>{sentLetters}</span> листів</>);

};

export default SentLetterComponent;
