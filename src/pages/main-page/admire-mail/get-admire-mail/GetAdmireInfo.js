import axios from "axios";
const cheerio = require('cheerio'); // Дополнительная библиотека для парсинга HTML

async function GetAdmireInfo(url) {
    try {
        // Выполняем GET-запрос с использованием Axios
        const response = await axios.get(url);

        // Получаем HTML-код из ответа
        const html = response.data;
        const $ = cheerio.load(html);

        const textMatches = $('div.pop_popdivfont[style="font-size:16px; color:#666;"]').text().trim();

        // Находим все совпадения с помощью регулярного выражения внутри <img>
        const imgMatches = html.match(/<img src="https:\/\/www\.charmdate\.com\/album_pics\/([^"]+)"/g);
        const imgUrls = imgMatches ? imgMatches.map(match => match.match(/<img src="https:\/\/www\.charmdate\.com\/album_pics\/([^"]+)"/)[1]) : [];

        // Возвращаем результаты
        return { textMatches, imgUrls };
    } catch (error) {
        console.error('Error:', error);
    }
}

export default GetAdmireInfo;
