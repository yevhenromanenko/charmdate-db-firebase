import axios from 'axios';
import GenerateRandomNonce from '../../../../functions/generate-random-nonce/GenerateRandomNonce';

const parseXML = (xml) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, 'text/xml');
    return xmlDoc;
};

const GetInvites = async (loginData, setInvites, setInvitesCamshare) => {

    const requestData = {
        curwomanid: `${loginData.loginUserId}`,
        womanid: `${loginData.loginUserId}`,
    };

    const config = {
        headers: {
            'accept': '*/*',
            'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'x-requested-with': 'XMLHttpRequest',
        },
        referrer: 'https://www.charmdate.com/lady/online.php',
        referrerPolicy: 'strict-origin-when-cross-origin',
    };

    const randomNonce = GenerateRandomNonce();

    try {
        const response = await axios.post(`https://www.charmdate.com/livechat/setstatus.php?action=ladygetinvitetemplate&rnd=${randomNonce}`, requestData, config);

        // Обработка успешного ответа
        const xmlDoc = parseXML(response.data);
        const messages = Array.from(xmlDoc.querySelectorAll('list')).map((item) => ({
            msgid: item.querySelector('msgid').textContent,
            msg: item.querySelector('msg').textContent,
            status: item.querySelector('status').textContent,
            service_type: item.querySelector('service_type').textContent,
        }));

        messages.forEach((message) => {
            if (message.service_type === '1') {
                // Если service_type равно 1, добавить в setInvitesCamshare
                setInvitesCamshare((prevInvitesCamshare) => [...prevInvitesCamshare, message]);
            } else if (message.service_type === '0') {
                // Если service_type равно 0, добавить в setInvites
                setInvites((prevInvites) => [...prevInvites, message]);
            }
        });
        // return messages;
    } catch (error) {
        // Обработка ошибки
        console.error(error);
        throw error;
    }
};

export default GetInvites;
