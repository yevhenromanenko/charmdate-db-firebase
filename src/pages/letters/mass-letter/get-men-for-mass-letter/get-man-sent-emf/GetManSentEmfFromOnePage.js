import axios from "axios";
const cheerio = require('cheerio');

const GetManSentEmfFromOnePage = async (url) => {
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

        $('tr').each((index, element) => {

            const womenIdMatch = $(element).find('td[class="emf"]').text();

            // Извлечение идентификатора женщины (например, "C890734")
            const womenIdMatches = womenIdMatch.match(/C(\d+)/g);
            const womenId = womenIdMatches ? womenIdMatches[0] : [];

            // Извлечение идентификатора мужчины (например, "CM89722454")
            const manIdMatches = womenIdMatch.match(/CM(\d+)/g);
            const manId = manIdMatches ? manIdMatches[0] : [];


            if (womenId.length > 0 && manId.length > 0 ) {
                results.push({ womenId, manId });
            }
        });

        // Поиск совпадений для nextPage
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

export default GetManSentEmfFromOnePage;
