import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PrivateComponent = () => {
    const [privatePhotos, setPrivatePhotos] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'https://www.charmdate.com/clagt/woman/private_photo_review.php',
                    {
                        headers: {
                            accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                            'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
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
                const privatePhotosValue = fontElement ? fontElement.innerText : null;

                if (privatePhotosValue === '0' || privatePhotosValue === null){
                    setPrivatePhotos(null);
                } else {
                    setPrivatePhotos(<span style={{color: 'peru', display: 'inline'}}>({privatePhotosValue})</span>);
                }
            } catch (error) {
                console.error('Error fetching private photos data:', error);
            }
        };

        fetchData();
    }, []);

    return (<>PRIVATE PHOTO {privatePhotos}</>);
};

export default PrivateComponent;
