import axios from "axios";
const cheerio = require('cheerio');

const GetStatisticMonthEstimated = async () => {
    try {
        const matches = [];

        const response = await axios.get("https://www.charmdate.com/clagt/stats/stats_current_month.php", {
            headers: {
                accept: "*/*",
                "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                "x-requested-with": "XMLHttpRequest",
            },
            referrer: "https://www.charmdate.com/clagt/about/contact_us.php?action=userlist",
            referrerPolicy: "strict-origin-when-cross-origin",
            method: "GET",
            mode: "cors",
            credentials: "include",
        });

        const $ = cheerio.load(response.data);

        const month = parseFloat($('tr[bgcolor="#FFFFFF"] td:last-child a').text());
        const estimated = parseFloat($('tr[bgcolor="#EEEEEE"] td:last-child b').text());


        if (month) {
            matches.push({month, estimated})
        }
        return matches;

    } catch (error) {
        console.error("Ошибка при выполнении запроса:", error.message);
    }
}
export default GetStatisticMonthEstimated;
