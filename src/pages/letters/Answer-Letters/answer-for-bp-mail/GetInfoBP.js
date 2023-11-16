import axios from "axios";
const cheerio = require('cheerio');

const GetInfoBonusPoint = async () => {
    const currentUrl = window.location.href;
    const messageId = currentUrl.split('messageid=')[1];
    const message = messageId.split('&')[0];

    const objEmf = [];
        const url = `https://www.charmdate.com/clagt/mw_emf_agt.php?messageid=${message}`;

        const headers = {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
            "cache-control": "max-age=0",
            "upgrade-insecure-requests": "1"
        };

        const referrer = "https://www.charmdate.com/clagt/emf_men_women_printed_integral.php?groupshow=4";

        const referrerPolicy = "strict-origin-when-cross-origin";

        const method = "GET";
        const mode = "cors";
        const credentials = "include";

        try {
            const response = await axios.get(url, {
                headers,
                referrer,
                referrerPolicy,
                method,
                mode,
                credentials,
            });

            const $ = cheerio.load(response.data);

            const manIdElement = $('input[name="manid"]');
            const manId = manIdElement.val() || '';

            const replyIdElement = $('input[name="reply_id"]');
            const replyId = replyIdElement.val() || '';

            const textElement = $('td > table p:first-child');
            const textLetter = textElement.text().trim() || '';

            const imageElement = $('p[align="center"] > img');
            const photoLetter = imageElement.attr('src') || '';

            const typePhotoElement = $('div[align="center"] > strong');
            const typePhoto = typePhotoElement.text().trim() || '';

            objEmf.push({
                manId,
                replyId,
                textLetter,
                photoLetter,
                typePhoto,
            })

            return objEmf;

        } catch (error) {
            // Обработайте ошибку, если что-то пойдет не так
            console.error(error);
        }
}

export default GetInfoBonusPoint;
