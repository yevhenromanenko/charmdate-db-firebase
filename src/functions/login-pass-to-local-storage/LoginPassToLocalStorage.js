import axios from "axios";


const LoginPassToLocalStorage = async (ladyId) => {

        const url = `https://www.charmdate.com/clagt/woman/women_other.php?womanid=${ladyId}`;

        try {
            const response = await axios.get(url, {
                headers: {
                    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                    "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                    "cache-control": "max-age=0",
                    "upgrade-insecure-requests": "1",
                    "referrer": "https://www.charmdate.com/clagt/woman/women_preview_profile.php?womanid=C304010",
                    "referrerPolicy": "strict-origin-when-cross-origin",
                    "method": "GET",
                    "mode": "cors",
                    "credentials": "include"
                },
            });

            const html = response.data;

            // const regex = /<td>(1) Lady account login password: <font color='#0000FF'>(.*?)<\/font><\/td>/;
            const regex = /<td>\(1\) Lady account login password: <font color='#0000FF'>(.*?)<\/font><\/td>/;

            const match = html.match(regex);

            const nameRegex = /<title>Lady's \((.*?)\)<\/title>/;
            const nameMatch = html.match(nameRegex);


            if (nameMatch && nameMatch.length >= 2 && match && match.length >= 2) {
                const ladyName = nameMatch[1];
                const password = match[1];

                const loginData = { ladyName, ladyId, password };
                const existingData = localStorage.getItem(`loginData-${ladyId}`);
                if (existingData) {
                    localStorage.removeItem(`loginData-${ladyId}`);
                }
                localStorage.setItem(`loginData-${ladyId}`, JSON.stringify(loginData));
            }


        } catch (error) {
            throw new Error('Произошла ошибка:', error);
        }
}
export default LoginPassToLocalStorage;


// const getStoredCredentials = () => {
//     const storedCredentials = localStorage.getItem('credentials');
//     return storedCredentials ? JSON.parse(storedCredentials) : null;
// };
