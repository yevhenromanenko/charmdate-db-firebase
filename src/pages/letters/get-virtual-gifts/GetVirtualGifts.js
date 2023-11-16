import axios from "axios";
const cheerio = require('cheerio');

const GetVirtualGifts = async () => {
    const url = 'https://www.charmdate.com/clagt/virtual_gifts/gifts_show.php?doShow=wm';

    const options = {
        headers: {
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
            'cache-control': 'max-age=0',
            'upgrade-insecure-requests': '1',
        },
        referrer: 'https://www.charmdate.com/clagt/virtual_gifts/gifts_show.php',
        referrerPolicy: 'strict-origin-when-cross-origin',
        method: 'GET',
    };

    try {
        const response = await axios.get(url, options);
        const $ = cheerio.load(response.data);
        //
        // const giftElement = $('li .vir_img a');
        // const giftUrl = giftElement.find('img').attr('src');
        // const giftName = giftElement.next('a').text();
        //
        // return { giftUrl, giftName };


        const giftElements = $('li .vir_img a');

        // Массив для хранения данных о подарках
        const giftDataArray = [];

        giftElements.each((index, element) => {
            const url = $(element).find('img').attr('src');
            const name = url.split('/')[3];
            // const giftName = $(element).next('a').text();
            giftDataArray.push({ url, name });
        });

        return giftDataArray;

    } catch (error) {
        throw new Error('Error fetching data: ' + error.message);
    }
}

export default GetVirtualGifts;
