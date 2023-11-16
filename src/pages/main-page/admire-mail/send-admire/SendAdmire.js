import axios from "axios";
import {clearInterval} from "worker-timers";

async function SendAdmire(randomSelectedAdmire, randomUser, ladyId, setCountAdmire, setErrAdmire, setIsSendingAdmire, interval) {
    const url = 'https://www.charmdate.com/clagt/admire/send_admire_mail2.php';
    const headers = {
        'accept': '*/*',
        'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'x-requested-with': 'XMLHttpRequest'
    };

    const referrer = 'https://www.charmdate.com/lady/online.php';
    const referrerPolicy = 'strict-origin-when-cross-origin';

    const data = new URLSearchParams();
    data.append('at_code', `${randomSelectedAdmire}`);
    data.append('favid', '');
    data.append('manid', `${randomUser}`);
    data.append('womanid', `${ladyId}`);
    data.append('template_type', 'B');
    data.append('sendmailsub', '%2BSend%2BMail%2B');

    try {
        const response = await axios.post(url, data, {
            headers: headers,
            referrer: referrer,
            referrerPolicy: referrerPolicy,
        });

        const responseData = response.data;

        if (responseData.includes("We are sorry but this mail")) {
            clearInterval(interval); // Остановка интервала
            setIsSendingAdmire(false);
            alert('На сьогодні більше не можна відправляти Admire Mail')
        } else if (responseData.includes('has been submitted successfully')){
            setCountAdmire(todayCount => todayCount + 1);// выводим кол-во отправленных
        } else {
            setErrAdmire(err => err + 1);
        }
    } catch (error) {
        setErrAdmire(err => err + 1);
        console.error(error);
    }
}

export default SendAdmire;
