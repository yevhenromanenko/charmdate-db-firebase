import axios from "axios";
import GenerateRandomNonce from "../../../../functions/generate-random-nonce/GenerateRandomNonce";

const ReplyTwoSayHi = async (ladyId, manId) => {
    try {
        let replyId;
        const element = document.querySelector(".STYLE4");
        const text = element.textContent;
        const match = text.match(/Say Hi ID: (\S+)/);

        if (match) {
            replyId = match[1];
        } else {
            console.log("replyId не найдено");
        }

        const randomNonce = GenerateRandomNonce();
        const url = `https://www.charmdate.com/clagt/emf_sender2.php?r=${randomNonce}`;
        const data = `manid=${manId}&womanid=${ladyId}&messagesub=Next`;
        const referrer = `https://www.charmdate.com/clagt/about/contact_us.php?action=reply-cupid&data=${replyId}`;
        const headers = {
            "accept": "*/*",
            "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "x-requested-with": "XMLHttpRequest"
        };

        await axios.post(url, data, {
            headers,
            referrer,
            referrerPolicy: "strict-origin-when-cross-origin",
            withCredentials: true // Это аналог "credentials": "include"
        });

    } catch (error) {
        console.error('Axios Request Error:', error);
    }
}

export default ReplyTwoSayHi;
