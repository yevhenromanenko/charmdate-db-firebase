import axios from "axios";
import isValidDate from "./isValidDate";
const cheerio = require('cheerio');


async function SendLettersOnePage(url) {
    try {
        const response = await axios.get(url, {
            headers: {
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                'cache-control': 'max-age=0',
                'upgrade-insecure-requests': '1',
            },
            referrerPolicy: 'strict-origin-when-cross-origin',
            method: 'GET',
        });

        const html = response.data;
        const $ = cheerio.load(html);

        const results = [];
        let nextPage = null;
        // Получаем текущую дату и время
        const now = new Date();

        $('tr').each((index, element) => {
            const columns = $(element).find('td');

            const womenIdMatch = $(element).find('td[class="emf"]').text();

            // Извлечение идентификатора женщины (например, "C890734")
            const womenIdMatches = womenIdMatch.match(/C(\d+)/g);
            const womenId = womenIdMatches ? womenIdMatches[0] : [];

            // Извлечение идентификатора мужчины (например, "CM89722454")
            const manIdMatches = womenIdMatch.match(/CM(\d+)/g);
            const manId = manIdMatches ? manIdMatches[0] : [];

            const read = $(columns[1])

            const date = $(columns[3]).text().trim()
            const messageIdMatch = $(columns[2]).find('a');
            const href = messageIdMatch.attr('href');

            if (href) {
                const startIndex = href.indexOf('messageid=') + 10;
                const endIndex = href.indexOf('\')', startIndex);

                if (startIndex !== -1 && endIndex !== -1) {
                    const messageId = href.substring(startIndex, endIndex);

                    if (womenId.length > 0 && manId.length > 0 && isValidDate(date)) {
                        const sentDate = new Date(date);

                        sentDate.setHours(sentDate.getHours() + 2);

                        // Вычисляем разницу во времени
                        const timeDifference = now - sentDate;

                        // Рассчитываем дни, часы и минуты
                        const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
                        const hours = Math.floor((timeDifference % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
                        const minutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000))

                        // Формируем строку с информацией о времени
                        let lastSentDate;
                        if (days > 0) {
                            lastSentDate = `${days} дней ${hours} часов ${minutes} минут`;
                        } else {
                            lastSentDate = `${hours} час ${minutes} минут`;
                        }

                        let readLetter;
                        if (read.find('img').length > 0) {
                            readLetter = 'не прочитав';
                        } else {
                            readLetter = 'прочитав';
                        }

                        // const obj = {
                        //     "womenId": womenId,
                        //     "manId": manId,
                        //     "messageId": messageId,
                        //     "date": date,
                        //     'lastSentDate': lastSentDate,
                        //     'readLetter': readLetter,
                        // }

                        // console.log(obj, 'obj')
                        results.push({ womenId, manId, messageId, lastSentDate, readLetter });
                    }

                } else {
                    console.log('Не удалось найти начальный и конечный индексы');
                }
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
        console.log(error, 'помилка')
    }
}

export default SendLettersOnePage;
