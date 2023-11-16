import axios from "axios";
const cheerio = require('cheerio');

async function FirstEmf(url) {

    try {
        const response = await axios.get(url, {
            headers: {
                accept: "*/*",
                "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                "x-requested-with": "XMLHttpRequest"
            },
            referrer: "https://www.charmdate.com/clagt/emf_men_women_unprinted.php?groupshow=4&act=list-emf",
            referrerPolicy: "strict-origin-when-cross-origin",
            credentials: "include"
        });

        const html = response.data;
        const $ = cheerio.load(html);

        const rows = $('tr[bgcolor="#FFFFFF"]');
        const firstChatResults = [];
        const keyRequestResults = [];

        rows.each((index, row) => {
            const columns = $(row).find('td');

            const chat = $(columns[3]).text().trim().replace(/\((.*?)\)/, '').split('(')[0];

            if (chat === 'First chat') {
                const manId = $(columns[1]).find('a').attr('href').match(/manid=(\w+)/)[1];
                const womanId = $(columns[2]).find('a').attr('href').match(/womanid=(\w+)/)[1];
                const date = $(columns[3]).find('label').text().match(/Date: (\d{4}-\d{2}-\d{2})/)[1];
                const inviteMatch = $(columns[3]).html().match(/inviteid=(\d+-\d+)/);
                const inviteId = inviteMatch ? inviteMatch[1] : null;

                firstChatResults.push({manId, date, womanId, inviteId, chat});
            } else if (chat === 'Lady replies to gentleman\'s access key request') {
                // Extract data from specific columns
                const manMatch = $(columns[1]).find('a').text();
                const manId = manMatch.split('(')[0].trim();
                const manName = manMatch.split('(')[1].split(')')[0].trim();
                const womanMatch = $(columns[2]).find('a').text();
                const womanId = womanMatch.split('(')[0].trim();
                const womanName = womanMatch.split('(')[1].split(')')[0].trim();

                const requestId = $(columns[3]).find('a').attr('href').match(/request_id=(\w+)/)[1];

                keyRequestResults.push({ requestId, manId, manName, womanId, womanName });
            }

        });

        return {
            firstChat: firstChatResults,
            keyRequest: keyRequestResults,
        };

    } catch (error) {
        // Обработка ошибок
        console.error("Error fetching data:", error);
    }
}

export default FirstEmf;
