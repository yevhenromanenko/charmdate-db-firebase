import axios from "axios";
const cheerio = require('cheerio');

async function GetProfitOnePage(url) {
    try {
        const response = await axios.get(url, {
            headers: {
                "accept": "*/*",
                "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                "x-requested-with": "XMLHttpRequest"
            },
            referrerPolicy: 'strict-origin-when-cross-origin',
            method: 'GET',
        });

        const html = response.data;
        const $ = cheerio.load(html);

        const matches = [];
        let nextPage = null;

        $('tr[bgcolor="#FFFFFF"]').each((index, row) => {
            const date = $(row).find(".emf:eq(0)").text().trim();
            const type = $(row).find(".emf:eq(2)").text().trim();
            const credits = $(row).find(".emf:eq(3)").text().trim();
            const manWomanLink = $(row).find(".emf:eq(4) a");

            const manId = manWomanLink.text().split(" - ")[0];
            const womanId = manWomanLink.text().split(" - ")[1];

            if (womanId === undefined) {
                const idsPrev = manWomanLink.text().split(" - ")[0];

                const womanId = idsPrev.split('-')[0];
                const manId = idsPrev.split('-')[1];

                if (womanId.includes('CM')) {
                    matches.push({date, type, credits, manId: womanId, womanId: manId})
                } else if (womanId.includes('View private photo')) {
                    matches.push({date, type, credits, manId: 'man id', womanId: 'woman id'})
                } else {
                    matches.push({date, type, credits, manId, womanId})
                }

            } else if (womanId.includes('View private photo')) {
                matches.push({date, type, credits, manId: 'man id', womanId: 'woman id'})
            } else {
                matches.push({date, type, credits, manId, womanId})
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
            } else {
                return null;
            }
        });

        return { matches, nextPage };

    } catch (error) {
        console.log(error, 'помилка')
    }
}

export default GetProfitOnePage;
