import axios from "axios";
const cheerio = require('cheerio');


const GetAdmireManIdsFromOnePage = async (url) => {
    try {
        const response = await axios.get(url, {
            headers: {
                "accept": "*/*",
                "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                "x-requested-with": "XMLHttpRequest"
            },
            referrer: "https://www.charmdate.com/lady/online.php",
            referrerPolicy: "strict-origin-when-cross-origin",
            method: "GET",
        });

        const html = response.data;

        const $ = cheerio.load(html);

        // Поиск всех <u> элементов и извлечение содержимого
        const admireMenIds = [];

        $('u').each((index, element) => {
            admireMenIds.push($(element).text().trim());
        });

        // Поиск тега <a> содержащего <img> с src, содержащим "next.gif"
        let nextPage = '';
        $('a:has(img[src*="next.gif"])').each((index, element) => {
            const match = $(element).attr('href').match(/page=([^&]+)/);
            if (match) {
                nextPage = match[1];
            }
        });

        return { admireMenIds, nextPage };
    } catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
}

export default GetAdmireManIdsFromOnePage;
