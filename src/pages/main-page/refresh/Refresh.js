import GetTelNumber from "../../../functions/get-tel-number/GetTelNumber";
import axios from "axios";

async function MakeRefresh(ladyId) {

    const urlLady = `https://www.charmdate.com/clagt/woman/women_preview_profile.php?womanid=${ladyId}`;
    const telNumber = await GetTelNumber(urlLady);

    const url = 'https://www.charmdate.com/clagt/woman/women_submit_ok.php';
    const headers = {
        'accept': '*/*',
        'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'x-requested-with': 'XMLHttpRequest',
    };

    const data = new URLSearchParams({
        'telephone': `${telNumber}`,
        'agent_request': 'Please do refresh',
        'Submit': 'Submit',
        'womanid': `${ladyId}`,
        'flag': '3',
    });

    try {
        await axios.post(url, data, {
            headers: headers,
            referrer: 'https://www.charmdate.com/lady/online.php',
            referrerPolicy: 'strict-origin-when-cross-origin',
        });

    } catch (error) {
        console.error(error);
        throw error; // Можно перебросить ошибку или обработать ее здесь, в зависимости от ваших потребностей.
    }
}

export default MakeRefresh;

