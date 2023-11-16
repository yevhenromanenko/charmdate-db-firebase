import axios from 'axios';
import cheerio from 'cheerio';

const IsLogin = async (setLogin, login, adminId) => {

        try {
            const response = await axios.get('https://www.charmdate.com/clagt/overview.php?menu1=1', {
                headers: {
                    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                    'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                    'upgrade-insecure-requests': '1'
                },
                referrer: 'https://www.charmdate.com/clagt/livechat/index.php?action=live',
                referrerPolicy: 'strict-origin-when-cross-origin',
                method: 'GET',
            });

            // Парсим HTML с использованием cheerio
            const $ = cheerio.load(response.data);

            // Ищем элемент с определенным ID и содержимым
            const targetElement = $(`#topMenulnk:contains("Agency ( ${adminId} )")`);

            // Если элемент найден, устанавливаем login в true
            if (targetElement.length > 0) {
                setLogin(true);
            } else {
                setLogin(false);
            }
        } catch (error) {
            console.error('Произошла ошибка', error);
        }

};

export default IsLogin;
