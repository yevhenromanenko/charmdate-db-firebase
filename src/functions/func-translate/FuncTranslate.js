import axios from "axios";

const FuncTranslate = async (text, language) => {
    try {
        let translatedText;
        const url = 'https://www.charmdate.com/livechat/googleapis.php';
        const headers = {
            'accept': '*/*',
            'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
            'content-type': 'application/x-www-form-urlencoded',
            'x-requested-with': 'XMLHttpRequest',
        };
        const referrer = `https://www.charmdate.com/`;
        const data = new URLSearchParams();
        data.append('target', `${language}`);
        data.append('q', `${text}`);
        // data.append('msgid', '-1');

        const response = await axios.post(url, data, {
            headers,
            referrer,
            withCredentials: true,
        });

        const res = response.data

        if (res.translatedText === undefined) {
            const start = res.indexOf('"translatedText":"') + '"translatedText":"'.length;
            const end = res.indexOf('",', start);

            translatedText = res.substring(start, end);
        } else {
            translatedText = res.translatedText;
        }

        return translatedText;
    } catch (error) {
        throw error;
    }
}

export default FuncTranslate;
