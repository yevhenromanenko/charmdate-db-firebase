import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FirstComponent = () => {
    const [first, setFirst] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'https://www.charmdate.com/clagt/first_emf.php?first_emf_type=&groupshow=4&womanid=&manid=&sentMail=not_yet&agtstaff=',
                    {
                        headers: {
                            accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                            'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                            'cache-control': 'max-age=0',
                            'upgrade-insecure-requests': '1',
                        },
                        referrerPolicy: 'no-referrer',
                        method: 'GET',
                        mode: 'cors',
                        credentials: 'include',
                    }
                );

                const parser = new DOMParser();
                const htmlDocument = parser.parseFromString(response.data, 'text/html');
                const fontElement = htmlDocument.querySelector('font[color="FF0000"]');
                const firstValue = fontElement ? fontElement.innerText : null;


                if (firstValue === '0' || firstValue === null){
                    setFirst(null);
                } else {
                    setFirst(<span style={{color: 'peru', display: 'inline'}}>({firstValue})</span>);
                }


            } catch (error) {
                console.error('Error fetching first data:', error);
            }
        };

        fetchData();
    }, []);

    return (<>FIRST {first}</>);
};

export default FirstComponent;
