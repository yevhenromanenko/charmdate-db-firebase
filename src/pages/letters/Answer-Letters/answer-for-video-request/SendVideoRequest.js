import axios from "axios";

async function SendVideoRequest(letter, ladyId, telNumber, mailPhoto, setErrMassLetter, setCountMassLetter, manId, gift, keyRequest) {
    try {
        const url = "https://www.charmdate.com/clagt/emf_sender5.php";
        const headers = {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
            "cache-control": "max-age=0",
            "content-type": "application/x-www-form-urlencoded",
            "upgrade-insecure-requests": "1",
        };

        const data = new URLSearchParams();
        data.append("body", `${letter}`);
        data.append("attachfilephoto", `${mailPhoto}|`);
        data.append("private_attachfilephoto", "");
        data.append("short_video_attachfilephoto", "");
        data.append("select_vg_id", `${gift}`);
        data.append("agreeLaw", "Y");
        data.append("womanid", `${ladyId}`);
        data.append("manid", `${manId}`);
        data.append("access_key_request_id", `${keyRequest}`);
        data.append("reply_id", "");
        data.append("reply_id2", "");
        data.append("reply_flag", "");
        data.append("lady_tel", `${telNumber}`);
        data.append("checkcomment", "Y");
        data.append("rmethod", "1");
        data.append("sendtimes", "0");
        data.append("submit_emf_restrictions_action", "");

        const referrer = "https://www.charmdate.com/clagt/emf_sender4.php";
        const referrerPolicy = "strict-origin-when-cross-origin";


        const response = await axios.post(url, data, {
            headers, referrer, referrerPolicy, withCredentials: true
        });


        const res = response.data;
        if (res.includes('Sorry, mail reply operation was forbidden') || res.includes('Sorry, you are unable to send this reply') || res.includes('Undefined error')) {
            if (res.includes('duplicate')) {
                alert('Дублікат минулого листа цьому чоловіку! Cпробуйте трохи змінити лист та відправте ще раз!')
                setErrMassLetter(err => err + 1)
            } else {
                setErrMassLetter(err => err + 1)
            }
        } else {
            setCountMassLetter(todayCountLetter => todayCountLetter + 1);// выводим кол-во отправленных
        }

    } catch (error) {
        console.error("Ошибка при выполнении запроса:", error);
        // Дальнейшие действия при ошибке
    }
}

export default SendVideoRequest;
