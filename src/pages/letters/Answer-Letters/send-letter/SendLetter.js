import axios from "axios";

async function SendLetter(letter, manId, ladyId, telNumber, mailPhoto, privatePhotoOne, privatePhotoTwo, privatePhotoThree, video, setErrMassLetter, gift, setCountMassLetter, replyId, answerFrom) {
    try {

        let referrer;
        let reply_id;
        let reply_flag;

        const mailFoto = mailPhoto ? `${mailPhoto}|` : '';
        const privateOne = privatePhotoOne ? `${privatePhotoOne}|` : '';
        const privateTwo = privatePhotoTwo ? `${privatePhotoTwo}|` : '';
        const privateThree = privatePhotoThree ? `${privatePhotoThree}|` : '';
        const privateVideo = video ? `${video}|` : '';
        const reply = replyId === 'first-letter' || replyId === 'mass-letter' ? '' : replyId;

        const referrerFirst = `https://www.charmdate.com/clagt/emf_sender4.php?action=reply-first&mid=${manId}`
        const referrerBP = `https://www.charmdate.com/clagt/mw_emf_agt.php?messageid=${reply}&ids=${reply}&manid=${manId}&act=reply-emf&template=1`;
        const referrerElse = "https://www.charmdate.com/clagt/emf_sender4.php"

        if (answerFrom === 'first-letter') {
            referrer = referrerFirst;
            reply_id = '';
            reply_flag = '';
        } else if (answerFrom === 'bp-letter') {
            referrer = referrerBP;
            reply_id = reply;
            reply_flag = 'yes';
        } else {
            referrer = referrerElse;
            reply_id = '';
            reply_flag = '';
        }



        const requestData = {
            body: `${letter}`,
            attachfilephoto: `${mailFoto}`,
            private_attachfilephoto: `${privateOne}${privateTwo}${privateThree}`,
            short_video_attachfilephoto: `${privateVideo}`,
            select_vg_id: `${gift}`,
            agreeLaw: "Y",
            womanid: `${ladyId}`,
            manid: `${manId}`,
            reply_id: `${reply_id}`,
            reply_id2: `${reply}`,
            reply_flag: `${reply_flag}`,
            lady_tel: `${telNumber}`,
            checkcomment: "Y",
            rmethod: "1",
            sendtimes: "0",
            messagesub: "Submit",
            submit_emf_restrictions_action: ""
        };

        console.log(referrer, 'referrer')
        const config = {
            headers: {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                "cache-control": "max-age=0",
                "content-type": "application/x-www-form-urlencoded",
                "upgrade-insecure-requests": "1"
            },
            referrer: referrer,
            referrerPolicy: "strict-origin-when-cross-origin",
            method: "POST",
        };

        const response = await axios.post('https://www.charmdate.com/clagt/emf_sender5.php', new URLSearchParams(requestData), config)

        const res = response.data;
        if (res.includes('Sorry, mail reply operation was forbidden') || res.includes('Sorry, you are unable to send this reply') || res.includes('Undefined error') || res.includes('short') || res.includes('duplicate')) {
            if (res.includes('duplicate')) {
                alert('Дублікат минулого листа цьому чоловіку! Cпробуйте трохи змінити лист та відправте ще раз!')
                setErrMassLetter(err => err + 1)
            } else if (res.includes('short')) {
                alert('Ви можете відправляти лист з проміжком 5 хвилин! На даний момент пройшло менше 5 хв, почекайте ще декілька хвилин та спробуйте знову!')
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

export default SendLetter;
