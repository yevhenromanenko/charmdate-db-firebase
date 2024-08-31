import axios from "axios";
import GetTimeZone from "./GetTimeZone";
import GetCountryCode from "./GetCountryCode";
import {clearInterval} from "worker-timers";

let callHour = 6; // начальное значение

const SendCalls = async (ladyId, manId, telNumber, setErrCalls, setCountCalls, country, city, setErrSending, intervalCalls, setIsSendingCalls) => {
    try {
        let timezone;
        const getCountryCode = await GetCountryCode(manId)

        if (city || country) {
            timezone = await GetTimeZone(city, country, getCountryCode)
        } else {
            timezone = ''
        }

        const currentDate = new Date();
        const futureDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const formattedFutureDate = futureDate.toISOString().split('T')[0];

        const formData = new FormData();
        formData.append('womanid', `${ladyId}`);
        formData.append('manid', `${manId}`);
        formData.append('manid_azx', '');
        formData.append('country', `${getCountryCode}`);
        formData.append('timezone', `${timezone}`);
        formData.append('calldate', formattedFutureDate);
        formData.append('callh', callHour.toString().padStart(2, '0'));
        formData.append('callm', '45');
        formData.append('bjtdate', formattedFutureDate);
        formData.append('bjth',  callHour.toString().padStart(2, '0'));
        formData.append('bjtm', '45');
        formData.append('womanphone', `${telNumber}`);
        formData.append('needtrans', 'N');

        const response = await axios.post(
            'https://www.charmdate.com/clagt/lovecall/add.php?act=saveandsubmit',
            formData,
            {
                headers: {
                    accept: '*/*',
                    'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'x-requested-with': 'XMLHttpRequest',
                },
                referrer: 'https://www.charmdate.com/clagt/about/contact_us.php?action=mass-call',
                referrerPolicy: 'strict-origin-when-cross-origin',
                mode: 'cors',
                credentials: 'include',
            }
        );

        callHour = (callHour + 1) % 24;

        const res = response.data;
        if (res.includes('successfully')) {
            setCountCalls(todayCountLetter => todayCountLetter + 1);// выводим кол-во отправленных
        }
        // else if (res.includes('limit')) {
        //     setErrCalls(err => err + 1)
        //     setErrSending(true);
        //     clearInterval(intervalCalls);
        //     setIsSendingCalls(false);
        //     alert('Нажаль, сайт не дає розіслати більше. Закрийте сторінку та повторіть завтра або через 5 днів');
        // }
        else {
            setErrCalls(err => err + 1)
        }

    } catch (error) {
        // Обработка ошибки, если необходимо
        console.error(error);
    }
}

export default SendCalls;
