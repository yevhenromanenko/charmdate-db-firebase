import axios from 'axios';

async function getLadyPhotoLink(ladyIdsYevhen, ladyIdsViktor, ladyIdsViktorC2135, ladyIdsViktorC1337) {

    const url = 'https://www.charmdate.com/lady/set_profile_photo.php';

    const axiosConfig = {
        headers: {
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
            'cache-control': 'max-age=0',
            'upgrade-insecure-requests': '1',
        },
        referrer: 'https://www.charmdate.com/lady/set_profile.php',
        referrerPolicy: 'strict-origin-when-cross-origin',
        method: 'GET',
    };

    try {
        const response = await axios.get(url, axiosConfig);
        const html = response.data;

        const loginUserIdRegex = /var\s+loginUserId\s*=\s*"([^"]+)"/;
        const loginUserIdMatch = html.match(loginUserIdRegex);
        let userId = null;
        let ladyPhoto = null;
        let adminId = null;

        if (loginUserIdMatch && loginUserIdMatch.length > 1) {
            userId = loginUserIdMatch[1];
        } else {
            console.log('Значение loginUserId не найдено.');
        }

        if (userId && userId.length > 0) {
            if (ladyIdsYevhen.includes(userId)) {
                adminId = 'C2436';
            } else if (ladyIdsViktor.includes(userId)) {
                adminId = 'C1618';
            } else if (ladyIdsViktorC2135.includes(userId)) {
                adminId = 'C2135';
            } else if (ladyIdsViktorC1337.includes(userId)) {
                adminId = 'C1337';
            }
        }

        const regex = new RegExp(`https://www\\.charmdate\\.com/woman_photo/${adminId}/[^"]+`, 'g');
        const matches = html.match(regex);

        if (matches && matches.length > 0) {
            ladyPhoto = matches[1]; // Use matches[0] to get the first match.
        } else {
            console.log('Ссылки на фото не найдены.');
        }

        return { userId, ladyPhoto };

    } catch (error) {
        console.error('Произошла ошибка при выполнении запроса:', error);
    }
}

export default getLadyPhotoLink;
