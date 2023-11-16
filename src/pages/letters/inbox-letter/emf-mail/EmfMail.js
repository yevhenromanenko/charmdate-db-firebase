import axios from "axios";


async function EmfMail(url, ladyId) {
    try {
        const response = await axios.get(url, {
            headers: {
                'accept': '*/*',
                'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                'x-requested-with': 'XMLHttpRequest',
            },
            referrer: 'https://www.charmdate.com/clagt/emf_men_women_unprinted.php?groupshow=4&act=list-emf',
            referrerPolicy: 'strict-origin-when-cross-origin',
        });

        const htmlContent = response.data;

        const regex = /<td class="emf" title="([^"]+)">([^<]+)<\/td>\s*<td align="left" class="emf">&nbsp;<a\s+href="javascript:Show\('.\/mw_emf_agt.php\?messageid=([^']+)'\)">([^&]+)&nbsp;([^&]+)--([^&]+)&nbsp;([^&]+)\s*<\/a>/g;
        const objEmf = [];

        let matchData;
        while ((matchData = regex.exec(htmlContent)) !== null) {

            const data = matchData[1];
            const messageId = matchData[3].trim();
            const manName = matchData[4].trim();
            const womanId = matchData[7].trim().split(' ')[0];
            const manId = matchData[5].trim();

            if (womanId === ladyId) {
                objEmf.push({manName, manId, womanId, data, messageId});
            }

        }

        return objEmf;

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export default EmfMail;
