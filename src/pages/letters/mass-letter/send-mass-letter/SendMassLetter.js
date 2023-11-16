import axios from "axios";

async function SendMassLetter(letter, manId, ladyId, telNumber, mailPhoto, privatePhotoOne, privatePhotoTwo, privatePhotoThree, video, setErrMassLetter, gift, setCountMassLetter) {
    try {

        const mailFoto = mailPhoto ? `${mailPhoto}|` : '';
        const privateOne = privatePhotoOne ? `${privatePhotoOne}|` : '';
        const privateTwo = privatePhotoTwo ? `${privatePhotoTwo}|` : '';
        const privateThree = privatePhotoThree ? `${privatePhotoThree}|` : '';
        const privateVideo = video ? `${video}|` : '';

        const formData = new FormData();
        formData.append("body", `${letter}`);
        formData.append("attachfilephoto", `${mailFoto}`);
        formData.append("private_attachfilephoto", `${privateOne}${privateTwo}${privateThree}`);
        formData.append("short_video_attachfilephoto", `${privateVideo}`);
        formData.append("select_vg_id", `${gift}`);
        formData.append("agreeLaw", "Y");
        formData.append("womanid", `${ladyId}`);
        formData.append("manid", `${manId}`);
        formData.append("reply_id", "");
        formData.append("reply_id2", "");
        formData.append("reply_flag", "");
        formData.append("lady_tel", `${telNumber}`);
        formData.append("checkcomment", "Y");
        formData.append("rmethod", "1");
        formData.append("sendtimes", "0");
        formData.append("messagesub", "Submit");
        formData.append("submit_emf_restrictions_action", "");

        const response = await axios.post("https://www.charmdate.com/clagt/emf_sender5.php", formData, {
            headers: {
                "accept": "*/*",
                "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                "content-type": "multipart/form-data",  // Тип контента изменен на multipart/form-data
                "x-requested-with": "XMLHttpRequest"
            },
            referrer: `https://www.charmdate.com/clagt/emf_sender4.php?action=reply-first&mid=${manId}`,
            referrerPolicy: "strict-origin-when-cross-origin",
            method: "POST",
        });

        const res = response.data;
        if (res.includes('Sorry, mail reply operation was forbidden') || res.includes('Sorry, you are unable to send this reply') || res.includes('Undefined error') || res.includes('short') || res.includes('duplicate')) {
            if (res.includes('duplicate')) {
                console.log('Дублікат минулого листа цьому чоловіку! Cпробуйте трохи змінити лист та відправте ще раз!')
                setErrMassLetter(err => err + 1)
            } else if (res.includes('short')) {
                console.log('Ви можете відправляти лист з проміжком 5 хвилин! На даний момент пройшло менше 5 хв, почекайте ще декілька хвилин та спробуйте знову!')
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

export default SendMassLetter;
