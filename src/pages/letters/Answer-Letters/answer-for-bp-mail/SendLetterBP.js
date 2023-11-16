import axios from "axios";
async function SendLetterBP(letter, manId, ladyId, telNumber, mailPhoto, privatePhotoOne, privatePhotoTwo, privatePhotoThree, video, setErr, gift, setCount, replyId, answerFrom) {

    const mailFoto = mailPhoto ? `${mailPhoto}|` : '';
    const privateOne = privatePhotoOne ? `${privatePhotoOne}|` : '';
    const privateTwo = privatePhotoTwo ? `${privatePhotoTwo}|` : '';
    const privateThree = privatePhotoThree ? `${privatePhotoThree}|` : '';
    const privateVideo = video ? `${video}|` : '';

    const url = 'https://www.charmdate.com/clagt/emf_sender5.php';
    const headers = {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
        "cache-control": "max-age=0",
        "content-type": "application/x-www-form-urlencoded",
        "upgrade-insecure-requests": "1",
    };

    const formData = new URLSearchParams();
    formData.append("body", `${letter}`);
    formData.append("attachfilephoto", `${mailFoto}`);
    formData.append("private_attachfilephoto", `${privateOne}${privateTwo}${privateThree}`);
    formData.append("short_video_attachfilephoto", `${privateVideo}`);
    formData.append("select_vg_id", `${gift}`);
    formData.append("agreeLaw", "Y");
    formData.append("womanid", `${ladyId}`);
    formData.append("manid", `${manId}`);
    formData.append("reply_id", `${replyId}`);
    formData.append("reply_id2", ``);
    formData.append("reply_flag", "yes");
    formData.append("lady_tel", `${telNumber}`);
    formData.append("checkcomment", "Y");
    formData.append("rmethod", "1");
    formData.append("sendtimes", "0");
    formData.append("submit_emf_restrictions_action", "");

    try {
        const response = await axios.post(url, formData.toString(), {
            headers: headers,
            referrer: 'https://www.charmdate.com/clagt/emf_sender4.php',
        });

        const res = response.data;
        if (res.includes('Sorry, mail reply operation was forbidden') || res.includes('Sorry, you are unable to send this reply') || res.includes('Undefined error') || res.includes('short') || res.includes('duplicate')) {
            if (res.includes('duplicate')) {
                alert('Дублікат минулого листа цьому чоловіку! Cпробуйте трохи змінити лист та відправте ще раз!')
                setErr(err => err + 1)
            } else if (res.includes('short')) {
                alert('Ви можете відправляти лист з проміжком 5 хвилин! На даний момент пройшло менше 5 хв, почекайте ще декілька хвилин та спробуйте знову!')
                setErr(err => err + 1)
            } else {
                setErr(err => err + 1)
            }
        } else {
            setCount(todayCountLetter => todayCountLetter + 1);
        }


    } catch (error) {
        // Обработка ошибки
        console.error(error);
    }
}

export default SendLetterBP;
