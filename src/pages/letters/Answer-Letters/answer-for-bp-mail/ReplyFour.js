import axios from "axios";
async function ReplyFour() {
    try {
        await axios({
            method: 'get',
            url: 'https://www.charmdate.com/clagt/emf_sender4.php',
            headers: {
                'accept': '*/*',
                'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                'x-requested-with': 'XMLHttpRequest'
            },
            referrer: 'https://www.charmdate.com/clagt/emf_sender4.php',
            referrerPolicy: 'strict-origin-when-cross-origin',
            mode: 'cors',
            withCredentials: true
        });

    } catch (error) {
        // Обработка ошибки
        console.error('Произошла ошибка:', error);
    }
}

export default ReplyFour;
