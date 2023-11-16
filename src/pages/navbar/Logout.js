import axios from "axios";

const Logout = async () => {
    try {
        const logoutResponse = await axios.get('https://www.charmdate.com/lady/logout.php', {
            headers: {
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                'upgrade-insecure-requests': '1',
            },
            referrer: 'https://www.charmdate.com/lady/notice_detail.php?id=IBCFE&s=1',
            referrerPolicy: 'strict-origin-when-cross-origin',
            withCredentials: true, // This is equivalent to "credentials: 'include'" in fetch
        });

        // // Если логин успешен, открываем страницу
        // if (logoutResponse.status === 200) {
        //     window.location.href(`https://www.charmdate.com/lady/index.php`);
        // } else {
        //     console.error('Ошибка во время логина');
        // }
        return logoutResponse;


    } catch (error) {
        console.error('Logout failed:', error);
    }
};

export default Logout;
