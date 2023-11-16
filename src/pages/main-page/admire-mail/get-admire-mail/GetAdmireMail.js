import axios from "axios";
import GetAdmireInfo from "./GetAdmireInfo";
const cheerio = require('cheerio'); // Дополнительная библиотека для парсинга HTML

// Функция для выполнения запроса и поиска данных
async function GetAdmireMail(url) {
    try {
        const response = await axios.get(url, {
            headers: {
                "accept": "*/*",
                "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                "x-requested-with": "XMLHttpRequest"
            },
            referrer: "https://www.charmdate.com/lady/online.php",
            referrerPolicy: "strict-origin-when-cross-origin",
            credentials: "include"
        });

        const $ = cheerio.load(response.data);

        const matches = [];

        const anchors = $('td a').toArray();

        for (let i = 0; i < anchors.length; i++) {
            const element = $(anchors[i]);
            const href = element.attr('href');
            const text = element.text();

            const match = /womanid=([^&]+)&at_code=([^&]+)/.exec(href);

            if (match) {
                const ladyId = match[1];
                const admireId = match[2];
                const url = `https://www.charmdate.com/clagt/admire/template/browse.php?womanid=${ladyId}&at_code=${admireId}&status=A`;

                const { textMatches, imgUrls } = await GetAdmireInfo(url);

                const isDuplicate = matches.some(entry => entry.admireId === admireId);

                if (!isDuplicate) {
                    matches.push({ladyId, admireId, textMatches, imgUrls, url});
                }
            }
        }

        const nextPage = [];

        $('a[href^="https://www.charmdate.com/clagt/admire/template/search_result.php?status=A"]').each((index, element) => {
            const href = $(element).attr('href');

            // Ищем совпадение по регулярному выражению для womanid и page
            const match = /womanid=([^&]+)&page=([^"]+)/.exec(href);

            if (match) {
                const pageId = match[2];

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

export default GetAdmireMail;
