import axios from "axios";
async function Reconnect() {
    const url = 'https://www.charmdate.com/lady/online.php';
    const config = {
        method: 'get',
        url: url,
        headers: {
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
            'cache-control': 'max-age=0',
            'upgrade-insecure-requests': '1',
        },
        referrer: 'https://www.charmdate.com/clagt/manager/approved_pc.php',
        referrerPolicy: 'strict-origin-when-cross-origin',
        credentials: 'include',
    };

    const response = await axios(config);
    return response.data;
}

export default Reconnect;
