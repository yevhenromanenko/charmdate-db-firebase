import axios from "axios";


async function ReplyTwoBP(ladyId, manId, replyId) {
    const url = "https://www.charmdate.com/clagt/emf_sender2.php?c=1";
    const headers = {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
        "cache-control": "max-age=0",
        "content-type": "application/x-www-form-urlencoded",
        "sec-ch-ua": "\"Chromium\";v=\"118\", \"Google Chrome\";v=\"118\", \"Not=A?Brand\";v=\"99\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1"
    };

    const referrer = `https://www.charmdate.com/clagt/mw_emf_agt.php?messageid=${replyId}`;
    const referrerPolicy = "strict-origin-when-cross-origin";

    // Создаем объект FormData и добавляем поля формы
    const formData = new FormData();
    formData.append("reply_id", `${replyId}`);
    formData.append("messageid", `${replyId}`);
    formData.append("reply_flag", "yes");
    formData.append("womanid", `${ladyId}`);
    formData.append("manid", `${manId}`);
    formData.append("orig_progress", "3");

    try {
        await axios.post(url, formData, {
            headers,
            referrer,
            referrerPolicy,
            withCredentials: true,
        });
    } catch (error) {
        console.error(error);
    }
}

export default ReplyTwoBP;
