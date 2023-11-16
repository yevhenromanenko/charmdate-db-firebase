import axios from 'axios';

async function GetUserInfo(user) {
    try {
        const response = await axios.get(`https://www.charmdate.com/livechat/lady/manprofile.php?manid=${user}`, {
            headers: {
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                'upgrade-insecure-requests': '1',
                'referrer': 'https://www.charmdate.com/livechat/lady/history/profile.php?manid=CM29689887',
            },
        });

        const html = response.data;
        const nameMatch = html.match(/<td width="80">[\s\S]*?<font color="#333333">Name：<\/font><\/b><\/td>\s+<td width="117">\s*([\s\S]*?)\s*<\/td>/);
        const idMatch = html.match(/<td width="80">[\s\S]*?<font color="#333333">&nbsp;Profile ID：<\/font><\/b><\/td>\s+<td width="126"><font color="#CC0000">\s*([\s\S]*?)\s*<\/font><\/td>/);
        const imgMatch = html.match(/<img src="(.*?)"/);
        const countryMatch = html.match(/<tr>\s*<td width="80"><b><font color="#333333">&nbsp;Country\/Region：<\/font><\/b><\/td>\s*<td width="126">\s*([^<]+)\s*<\/td>/);
        const cityMatch = html.match(/<td width="97">[\s\S]*?<font color="#333333">City：<\/font><\/b><\/td>\s*<td width="124">\s*([\s\S]*?)\s*<\/td>/);
        const dobMatch = html.match(/<td width="150" align="left"><font color="#333333"><strong>Date of Birth：<\/strong><\/font><\/td>\s*<td width="223"> &nbsp;([\s\S]*?)<\/td>/);

        if (nameMatch && idMatch) {
            const extractedName = nameMatch ? nameMatch[1].trim() : '';
            const extractedId = idMatch ? idMatch[1].trim() : '';
            const manPhoto = imgMatch ? imgMatch[1].trim() : '';
            const country = countryMatch ? countryMatch[1].trim() : 'your country';
            const city = cityMatch ? cityMatch[1].trim() : 'your city';

            let dateOfBirth = null;
            let age = null;

            if (dobMatch) {
                dateOfBirth = dobMatch[1].trim();
                const birthDate = new Date(dateOfBirth);
                const today = new Date();
                age = today.getFullYear() - birthDate.getFullYear();

                if (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
                    age--;
                }
            }

            return { name: extractedName, id: extractedId, photo: manPhoto, country: country, city: city, age: age };
        } else {
            console.log('Информация не найдена.');
            return null;
        }
    } catch (error) {
        console.error('Произошла ошибка:', error);
        return null;
    }

}

export default GetUserInfo;
