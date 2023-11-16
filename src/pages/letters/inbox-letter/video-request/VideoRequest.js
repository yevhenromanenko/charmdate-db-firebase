import axios from "axios";
const cheerio = require('cheerio');

const VideoRequest = async (url) => {

    const config = {
        headers: {
            'accept': '*/*',
            'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
            'x-requested-with': 'XMLHttpRequest',
        },
        referrer: 'https://www.charmdate.com/clagt/emf_men_women_unprinted.php?groupshow=4&act=list-emf',
        referrerPolicy: 'strict-origin-when-cross-origin',
        method: 'GET',
    };

    try {
        const response = await axios.get(url, config);

        // Парсинг HTML страницы с использованием Cheerio
        const $ = cheerio.load(response.data);
        const objVideo = [];
        const rows = $('tr[align="center"][bgcolor="#FFFFFF"]');

        // Итерация по каждой строке и извлечение необходимых данных
        rows.each((index, row) => {
            const date = $(row).find('td').eq(6).text().trim();
            const requestId = $(row).find('td').eq(1).text().trim();
            const manId = $(row).find('td').eq(2).text().trim();
            const womenId = $(row).find('td').eq(3).text().trim();

            objVideo.push({date, requestId, manId, womenId});
        });

        return objVideo;
    } catch (error) {
        console.error('Error making the request:', error);
    }
}

export default VideoRequest;
