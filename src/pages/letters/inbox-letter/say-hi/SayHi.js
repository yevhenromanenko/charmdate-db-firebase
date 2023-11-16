import axios from "axios";
const cheerio = require('cheerio');


const SayHi = async (urlSayHi, ladyId) => {
    try {
        const response = await axios.get(urlSayHi, {
            headers: {
                'accept': '*/*',
                'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                'x-requested-with': 'XMLHttpRequest',
            },
            referrer: 'https://www.charmdate.com/clagt/emf_men_women_unprinted.php?groupshow=4&act=list-emf',
            referrerPolicy: 'strict-origin-when-cross-origin',
            method: 'GET',
        });
        const html = response.data;
        const $ = cheerio.load(html);

        const rows = $('tr[align="center"][bgcolor="#FFFFFF"]');
        const objEmf = [];

        rows.each((index, element) => {
            const row = $(element);

            // Извлекаем данные из каждого столбца в строке
            const date = row.find('td:nth-child(2)').text().trim();
            const manId = row.find('td:nth-child(4) a').text().trim();
            const manName = row.find('td:nth-child(5)').text().trim(); // Новая строка для извлечения manName
            const womanId = row.find('td:nth-child(6) a').text().split('-')[0].trim();
            const ladyName = row.find('td:nth-child(6) a').text().split('-')[1].trim();
            const responseId = row.find('td:nth-child(8) a').attr('href').split('?noteid=')[1];

            if (womanId === ladyId) {
                objEmf.push({date, manId, manName, womanId, ladyName, responseId});
            }

        });

        return objEmf;
    } catch (error) {
        console.error(error);
    }
};

export default SayHi;
