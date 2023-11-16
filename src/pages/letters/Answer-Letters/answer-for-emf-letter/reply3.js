import axios from "axios";

async function Reply3(replyId, ladyId, manId) {
    try {
        const response = await axios.post('https://www.charmdate.com/clagt/emf_sender3.php', {
            messagesub: 'Next >>',
            womanid: `${ladyId}`,
            manid: `${manId}`,
            reply_id: `${replyId}`,
            reply_id2: `${replyId}`,
            reply_flag: 'yes',
            surveyid: '',
        }, {
            headers: {
                Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                'Cache-Control': 'max-age=0',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Upgrade-Insecure-Requests': '1',
            },
            referrer: 'https://www.charmdate.com/clagt/emf_sender2.php?c=1',
            referrerPolicy: 'strict-origin-when-cross-origin',
            withCredentials: true,
        });

        return response;
    } catch (error) {
        throw error;
    }
}

export default Reply3;
