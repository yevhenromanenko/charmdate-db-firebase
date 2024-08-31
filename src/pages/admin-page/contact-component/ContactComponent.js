import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactComponent = () => {
    const [contact, setContact] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'https://www.charmdate.com/clagt/contact_request/processing.php?flag=1',
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
                const strongElement = htmlDocument.querySelector('strong[style="color:#FF0000"]');
                const contactValue = strongElement ? strongElement.innerText : null;
                const contact = contactValue.trim();

                if (contact === '0' || contact === null){
                    setContact(null);
                } else {
                    setContact(<span style={{color: 'peru', display: 'inline'}}>({contactValue})</span>);
                }
            } catch (error) {
                console.error('Error fetching contact data:', error);
            }
        };

        fetchData();
    }, []);

    return (<>CONTACT REQUEST {contact}</>);

};

export default ContactComponent;
