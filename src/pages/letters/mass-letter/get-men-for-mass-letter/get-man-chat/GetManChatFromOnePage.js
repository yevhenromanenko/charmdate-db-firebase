import axios from "axios";
const cheerio = require('cheerio');

const GetManChatFromOnePage = async (url) => {
    try {
        const response = await axios.get(url, {
            headers: {
                'accept': '*/*',
                'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                'x-requested-with': 'XMLHttpRequest',
            },
            referrer: 'https://www.charmdate.com/clagt/about/contact_us.php?action=mass-emf',
            referrerPolicy: 'strict-origin-when-cross-origin',
            method: 'GET',
        });

        const $ = cheerio.load(response.data);

        const results = [];
        let nextPage = null;

        $('tr[bgcolor="#FFFFFF"]').each((index, element) => {
            const $row = $(element);

            const manIdMatch = $row.find('td:eq(5) a').text();
            const manId = manIdMatch.split('(')[0].trim();

            const womenIdMatch = $row.find('td:eq(6) a').text();
            const womenId = womenIdMatch.split('(')[0].trim();

            results.push({womenId, manId});

        });

        $('a').each((index, element) => {
            const href = $(element).attr('href');
            const match = href.match(/page=([^&]+)/);
            const hasNextGif = $(element).find('img[src$="next.gif"]').length > 0;

            if (match && hasNextGif) {
                nextPage = match[1];
                return false; // Прерывание цикла после нахождения первого совпадения
            }
        });

        return { results, nextPage };

    } catch (error) {
        throw new Error('Error fetching data: ' + error.message);
    }
}

export default GetManChatFromOnePage;
