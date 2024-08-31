import React, {useEffect, useState} from 'react';
import axios from 'axios';

const GiftComponent = () => {
    const [gift, setGift] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'https://www.charmdate.com/clagt/gift/goods_delivery.php',
                    {
                        headers: {
                            accept: '*/*',
                            'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                            'x-requested-with': 'XMLHttpRequest',
                        },
                        referrer: 'https://www.charmdate.com/clagt/about/contact_us.php?action=userlist',
                        referrerPolicy: 'strict-origin-when-cross-origin',
                        method: 'GET',
                        mode: 'cors',
                        credentials: 'include',
                    }
                );

                const parser = new DOMParser();
                const htmlDocument = parser.parseFromString(response.data, 'text/html');
                const fontElement = htmlDocument.querySelector('font[color="#FF0000"]');
                const giftValue = fontElement ? fontElement.innerText : null;

                if (giftValue === '0' || giftValue === null){
                    setGift(null);
                } else {
                    setGift(<span style={{color: 'peru', display: 'inline'}}>({giftValue})</span>);
                }
            } catch (error) {
                console.error('Error fetching gift data:', error);
            }
        };

        fetchData();
    }, []);

    return (<>ПОДАРУНКИ {gift}</>);
};

export default GiftComponent;
