import axios from "axios";
const cheerio = require('cheerio');
async function BPMail(url, ladyId) {
    const headers = {
        "accept": "*/*",
        "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
        "x-requested-with": "XMLHttpRequest"
    };

    const referrer = "https://www.charmdate.com/clagt/emf_men_women_unprinted.php?groupshow=4&act=list-emf";
    const referrerPolicy = "strict-origin-when-cross-origin";

    try {
        const response = await axios.get(url, {
            headers,
            method: "GET",
            mode: "cors",
            credentials: "include",
            referrer,
            referrerPolicy,
        });
        const $ = cheerio.load(response.data); // Загрузка HTML страницы в cheerio

        const rows = $('tr[align="center"][bgcolor="#FFFFFF"]');
        const objBP = [];

        rows.each((index, row) => {
            const $row = $(row);
            const date = $row.find('td[class="emf"][title]').text().trim();
            const manIdName = $row.find('td[class="emf"] a').eq(0).text().trim().split(' ')[0].split('--')[0];
            const womanIdName = $row.find('td[class="emf"] a').eq(0).text().trim().split(' ')[0].split('--')[1]

            const manId = manIdName.split('\u00A0')[1].trim();
            const manName = manIdName.split('\u00A0')[0].trim();

            const womanId = womanIdName.split('\u00A0')[1].trim();
            const ladyName = womanIdName.split('\u00A0')[0].trim();

            const responseId = $row.find('input[name="emf_msg_id[]"]').attr('value');


            if (womanId === ladyId) {
                objBP.push({date, manId, manName, womanId, ladyName, responseId});
            }
        });
        return objBP;

    } catch (error) {
        // Обработка ошибки здесь
        console.error(error);
    }
}

export default BPMail;
