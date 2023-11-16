import axios from "axios";

const LoginAdmin = async (login, setLogin, adminId, staffId, pass) => {
    if (!login) {
        const loginResponse = await axios.post(
            'https://www.charmdate.com/clagt/login.php',
            `agentid=${adminId}&staff_id=${staffId}&passwd=${pass}`,
            {
                headers: {
                    'accept': '*/*',
                    'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'x-requested-with': 'XMLHttpRequest',
                },
                referrer: "https://www.charmdate.com/clagt/loginb.htm",
                referrerPolicy: 'strict-origin-when-cross-origin',
            }
        );

        if (loginResponse.status === 200) {
            console.log(`залогинились на ${adminId}`)
            setLogin(true);
        } else {
            console.error('Ошибка во время логина');
        }
    }
}

export default LoginAdmin;
