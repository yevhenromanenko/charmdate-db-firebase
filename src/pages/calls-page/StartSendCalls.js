import {setInterval, clearInterval} from "worker-timers";
import GetUserInfo from "../../functions/get-user-info/GetUserInfo";
import SendCalls from "./SendCalls";

const StartSendCalls = (telNumber, ladyId, setCountCalls, setIsSendingCalls, setErrCalls, setSendingIntervalCalls, menForCalls, banUsers, errSending, setErrSending) => {

    const finishDate = new Date();
    localStorage.setItem('callsFinishDate', finishDate.toISOString());

    setIsSendingCalls(true);

    const totalUsersCount = menForCalls.length; // Общее количество пользователей
    let processedUsersCount = 0; // Количество обработанных пользователей


    const intervalCalls = setInterval(async () => {
        if (processedUsersCount >= totalUsersCount || errSending) {
            // Если все пользователи были обработаны, останавливаем рассылку
            clearInterval(intervalCalls);
            setIsSendingCalls(false);
            alert('Розсилка була завершена! Дякую, повторіть, будь ласка через 5 днів!'); // Уведомление о завершении рассылки
            return;
        }

        const currentUser = menForCalls[processedUsersCount];
        processedUsersCount++;

        const userExists = banUsers.some((user) => user.id === currentUser);
        if (userExists) {
            setErrCalls(err => err + 1)
            console.log('Спроба відправки користувачу, який у бан листі! Не відправлено!')
            return null;
        }

        const { id, country, city } = await GetUserInfo(currentUser)

        await SendCalls(ladyId, id,  telNumber, setErrCalls, setCountCalls, country, city, setErrSending, intervalCalls, setIsSendingCalls)

    }, Math.floor(Math.random() * (20000 - 10000 + 1) + 10000))

    setSendingIntervalCalls(intervalCalls);

}
export default StartSendCalls;
