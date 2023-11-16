import axios from "axios";
import GenerateRandomNonce from "../../../../functions/generate-random-nonce/GenerateRandomNonce";

const ReplyTwo = async (ladyId, manId, replyId) => {
    try {
        const randomNonce = GenerateRandomNonce();

        const requestData = {
            manid: `${manId}`,
            womanid: `${ladyId}`,
            messagesub: 'Next',
        };

        const config = {
            headers: {
                Accept: '*/*',
                'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'X-Requested-With': 'XMLHttpRequest',
            },
            referrer: replyId === 'first-letter' ? `https://www.charmdate.com/clagt/emf_sender4.php?action=reply-first&mid=${manId}` : `https://www.charmdate.com/clagt/mw_emf_agt.php?messageid=${replyId}&ids=${replyId}&manid=${manId}&act=reply-emf`,
            referrerPolicy: 'strict-origin-when-cross-origin',
            withCredentials: true,
        };

        await axios.post(`https://www.charmdate.com/clagt/emf_sender2.php?r=${randomNonce}`, requestData, config);

    } catch (error) {
        console.error('Axios Request Error:', error);
    }
}

export default ReplyTwo;
