
import axios from "axios";

async function SendSayHi(letter, ladyId, telNumber, mailPhoto, setErrMassLetter, setCountMassLetter, replyId) {
    try {

        const mailFoto = mailPhoto ? `${mailPhoto}|` : '';

        const url = "https://www.charmdate.com/clagt/cupidnote/reply3.php";
        const headers = {
            "accept": "*/*",
            "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "x-requested-with": "XMLHttpRequest"
        };
        const referrer = `https://www.charmdate.com/clagt/about/contact_us.php?action=reply-cupid&data=${replyId}`;
        const referrerPolicy = "strict-origin-when-cross-origin";
        const data = new URLSearchParams();
        data.append("replymsg", `${letter}`);
        data.append("noteid", `${replyId}`);
        data.append("attachfilephoto", `${mailFoto}`);
        data.append("btsubmit", "Submit");

        const response = await axios.post(url, data, {
            headers, referrer, referrerPolicy, withCredentials: true
        });

        const res = response.data;
        if (res.includes('Sorry, mail reply operation was forbidden') || res.includes('Sorry, you are unable to send this reply') || res.includes('Undefined error')) {
            setErrMassLetter(err => err + 1)
        } else {
            setCountMassLetter(todayCountLetter => todayCountLetter + 1);// выводим кол-во отправленных
        }

    } catch (error) {
        console.error("Ошибка при выполнении запроса:", error);
        // Дальнейшие действия при ошибке
    }
}

export default SendSayHi;
