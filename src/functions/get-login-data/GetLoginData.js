import axios from 'axios';

const GetLoginData = async () => {

        try {
            const response = await axios.post('https://www.charmdate.com/lady/online.php', null, {
                headers: {
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                    'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                    'Cache-Control': 'max-age=0',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Upgrade-Insecure-Requests': '1',
                },
                referrer: 'https://www.charmdate.com/lady/online.php',
                referrerPolicy: 'strict-origin-when-cross-origin',
            });

            const html = response.data;

            // Используйте регулярные выражения или парсер HTML для извлечения данных из HTML
            const siteIdMatch = html.match(/var siteId = (\d+);/);
            const siteUrlMatch = html.match(/var siteUrl = '(.*)';/);
            const chatHostMatch = html.match(/var chatHost = '(.*)';/);
            const loginUserIdMatch = html.match(/var loginUserId = "(.*)";/);
            const loginUserSwpidMatch = html.match(/var loginUserSwpid = "(.*)";/);
            const loginInTypeMatch = html.match(/var loginInType = "(.*)";/);
            const onlineStatusMatch = html.match(/var online_status = '(.*)';/);
            const fxInviteMatch = html.match(/var fxInvite = '(.*)';/);
            const isPointMatch = html.match(/var isPoint = (\d+);/);
            const isAllowPopMatch = html.match(/var isallowpop = (\d+);/);

            const siteId = siteIdMatch ? siteIdMatch[1] : null;
            const siteUrl = siteUrlMatch ? siteUrlMatch[1] : null;
            const chatHost = chatHostMatch ? chatHostMatch[1] : null;
            const loginUserId = loginUserIdMatch ? loginUserIdMatch[1] : null;
            const loginUserSwpid = loginUserSwpidMatch ? loginUserSwpidMatch[1] : null;
            const loginInType = loginInTypeMatch ? loginInTypeMatch[1] : null;
            const onlineStatus = onlineStatusMatch ? onlineStatusMatch[1] : null;
            const fxInvite = fxInviteMatch ? fxInviteMatch[1] : null;
            const isPoint = isPointMatch ? parseInt(isPointMatch[1], 10) : null;
            const isAllowPop = isAllowPopMatch ? parseInt(isAllowPopMatch[1], 10) : null;

            // Сохраняем данные в состоянии компонента
            // Сохраняем данные в массиве
            // Сохраняем данные в состоянии компонента
            return {siteId, siteUrl, chatHost, loginUserId, loginUserSwpid, loginInType, onlineStatus, fxInvite, isPoint, isAllowPop};
        } catch (error) {
            console.log(error);
        }
};

export default GetLoginData;
