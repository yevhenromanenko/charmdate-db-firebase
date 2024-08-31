import axios from "axios";

const GetTimeZone = async (cityFromProfile, countryFromProfile, code) => {
    try {
        const response = await axios.post(
            'https://www.charmdate.com/includes/timezone_ajax.php',
            `code=${code}`,
            {
                headers: {
                    accept: 'application/xml, text/xml, */*',
                    'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                    'content-type': 'application/x-www-form-urlencoded',
                    'x-requested-with': 'XMLHttpRequest',
                },
                referrer: 'https://www.charmdate.com/clagt/lovecall/add.php?act=saveandsubmit',
                referrerPolicy: 'strict-origin-when-cross-origin',
                mode: 'cors',
                credentials: 'include',
            }
        );

        // Преобразование XML-ответа в объект
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, 'text/xml');

        // Найти похожие слова на 'Ontario' и получить id
        const timezones = xmlDoc.getElementsByTagName('timezone');
        let similarTimezoneId;

        for (let i = 0; i < timezones.length; i++) {
            const city = timezones[i].getElementsByTagName('city')[0].textContent.trim();
            const country = timezones[i].getElementsByTagName('country')[0].textContent.trim();

            if (city.includes(cityFromProfile) || country.includes(countryFromProfile)) {
                similarTimezoneId = timezones[i].getElementsByTagName('id')[0].textContent;
                break; // Прерываем цикл после первого совпадения
            }
        }

        return similarTimezoneId;


    } catch (error) {
        // Обработка ошибки, если необходимо
        console.error(error);
    }
}

export default GetTimeZone;
