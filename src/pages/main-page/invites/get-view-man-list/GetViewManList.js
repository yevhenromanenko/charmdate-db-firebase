import axios from "axios";

const GetViewManList = async (id, setIdsViewManList) => {

            const url = 'https://www.charmdate.com/livechat/setstatus.php?action=ladygetviewmanlist';
            const headers = {
                'accept': '*/*',
                'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'x-requested-with': 'XMLHttpRequest'
            };
            const referrer = 'https://www.charmdate.com/lady/online.php';
            const referrerPolicy = 'strict-origin-when-cross-origin';
            const data = `womanid=${id}&curwomanid=${id}`;

            try {
                const response = await axios.post(url, data, {
                    headers: headers,
                    referrer: referrer,
                    referrerPolicy: referrerPolicy,
                });

                // Создание DOMParser для парсинга XML-ответа
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(response.data, 'application/xml');

                // Извлечение значений userId и создание массива
                const userIdNodes = xmlDoc.querySelectorAll('userId');
                const userIds = Array.from(userIdNodes).map(node => node.textContent);
                setIdsViewManList(userIds);
            } catch (error) {
                // Обработка ошибок
                console.error(error);
            }
};

export default GetViewManList;
