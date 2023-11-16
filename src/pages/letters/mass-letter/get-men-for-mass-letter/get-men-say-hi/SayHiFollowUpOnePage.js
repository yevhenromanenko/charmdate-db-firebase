import axios from "axios";
const cheerio = require('cheerio'); // Добавьте библиотеку Cheerio для парсинга HTML

const SayHiFollowUpOnePage = async (url, ladyId) => {
    try {
        const response = await axios.get(url, {
            headers: {
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                'upgrade-insecure-requests': '1'
            },
            referrer: 'https://www.charmdate.com/clagt/cupidnote/index.php',
            referrerPolicy: 'strict-origin-when-cross-origin',
            method: 'GET',
        });

        const $ = cheerio.load(response.data);

        const matches = [];

        $('tr[bgcolor="#FFFFFF"]').each((index, element) => {
            const $row = $(element);
            const manId = $row.find('td:eq(3) a').text().trim();
            const womenId = $row.find('td:eq(5) a').text().split('-')[0].trim();

            if (womenId === ladyId) {
                matches.push({womenId, manId});
            }

        });

        const nextPage = [];

        $('a[href^="https://www.charmdate.com/clagt/cupidnote/can_reply_cupidnote.php"]').each((index, element) => {
            const href = $(element).attr('href');

            // Ищем совпадение по регулярному выражению для womanid и page
            const match = /page=([^"]+)/.exec(href);

            if (match) {
                const pageId = match[1];

                const hasNextGif = $(element).find('img[src$="next.gif"]').length > 0;

                if (hasNextGif && !nextPage.includes(pageId)) {
                    nextPage.push(pageId);
                }

            } else {
                return nextPage;
            }
        });

        return { matches, nextPage };

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export default SayHiFollowUpOnePage;
