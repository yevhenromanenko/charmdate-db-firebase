import axios from "axios";
const cheerio = require('cheerio');


async function GetTelNumber(url) {
    try {
        const response = await axios.get(url);
        const html = response.data;

        // Используем cheerio для парсинга HTML
        const $ = cheerio.load(html);

        // Ищем элемент с соответствующим текстом
        const telMobileElement = $("td:contains('Tel (Mobile)')").next();

        // Извлекаем текст из найденного элемента
        const telNumber = telMobileElement.text().trim();

        return telNumber;
    } catch (error) {
        console.error(error);
    }
}

export default GetTelNumber;
