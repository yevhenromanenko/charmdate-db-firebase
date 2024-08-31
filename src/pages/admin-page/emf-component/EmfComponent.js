
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmfComponent = () => {
    const [letters, setLetters] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'https://www.charmdate.com/clagt/emf_men_women_unprinted.php?groupshow=4',
                    {
                        headers: {
                            accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                            'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                            'cache-control': 'max-age=0',
                            'upgrade-insecure-requests': '1',
                        },
                        referrer: 'https://www.charmdate.com/clagt/emf_men_women_unprinted.php',
                        referrerPolicy: 'strict-origin-when-cross-origin',
                        method: 'GET',
                        mode: 'cors',
                        credentials: 'include',
                    }
                );

                const parser = new DOMParser();
                const htmlDocument = parser.parseFromString(response.data, 'text/html');
                const fontElement = htmlDocument.querySelector('font[color="FF0000"]');
                const lettersValue = fontElement ? fontElement.innerText : null;

                if (lettersValue === '0' || lettersValue === null){
                    setLetters(null);
                } else {
                    setLetters(<span style={{color: 'peru', display: 'inline'}}>({lettersValue})</span>);
                }
            } catch (error) {
                console.error('Error fetching letters data:', error);
            }
        };

        fetchData();
    }, []);

    return (<>EMF {letters}</>);
};

export default EmfComponent;
