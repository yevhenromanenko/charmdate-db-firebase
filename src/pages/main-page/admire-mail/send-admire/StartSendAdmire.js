import { setInterval, clearInterval } from 'worker-timers';
import SendAdmire from "./SendAdmire";

const sentUsers = new Set(); // Set to keep track of users who have already received admiration
const StartSendAdmire = (selectedAdmire, setIsSendingAdmire, setSendingIntervalAdmire, admireManIds, setErrAdmire, setCountAdmire, lastSavedDate, setLastSavedDate, ladyId, checkAllUsers, checkVipUsers, vipUsers) => {

    if (selectedAdmire.length === 0) {
        alert('Поставте хоча б одну галочку біля Admire Mail для розсилки!');
        setIsSendingAdmire(false);
        return;
    }

    if (checkVipUsers && vipUsers.length === 0) {
        alert('Додайте хоча б одного чоловіка у VIP список, перед тим як починати розсилку по VIP чоловікам!');
        setIsSendingAdmire(false);
        return;
    }

    const isSameDate = (date1, date2) => date1.toISOString().slice(0, 10) === date2.toISOString().slice(0, 10);
    const currentDate = new Date();
    if (!isSameDate(currentDate, new Date(lastSavedDate))) {
        // Если текущая дата отличается от сохраненной даты, обнуляем счетчик
        setCountAdmire(0);
        // Записываем текущую дату в локальное хранилище
        setLastSavedDate(currentDate.toISOString());
    }

    const finishDate = new Date();
    localStorage.setItem('admireMailFinishDate', finishDate.toISOString());

    setIsSendingAdmire(true);
    const vipUsersToSend = vipUsers.map(item => item.id);

    const interval = setInterval(async () => {

        let randomUser;
        const randomSelectedAdmire = selectedAdmire[Math.floor(Math.random() * selectedAdmire.length)];
        const result = [...vipUsersToSend, ...admireManIds];

        if (sentUsers.size === (checkVipUsers && checkAllUsers ? result.length : checkVipUsers ? vipUsersToSend.length : admireManIds.length)) {
            clearInterval(interval); // Stop the interval
            alert('Всі користувачі отримали Admire Mail!'); // Notify that all users have been sent admiration
            setIsSendingAdmire(false);
            return;
        }

        console.log(checkVipUsers, 'checkVipUsers')
        console.log(checkAllUsers, 'checkAllUsers')

        if (checkVipUsers && checkAllUsers) {
            console.log(result, 'result')
            randomUser = result.find(user => !sentUsers.has(user));
        } else if (checkVipUsers) {
            randomUser = vipUsersToSend.find(user => !sentUsers.has(user));
        } else if (checkAllUsers) {
            randomUser = admireManIds.find(user => !sentUsers.has(user));
        } else {
            randomUser = admireManIds.find(user => !sentUsers.has(user));
        }

        if (!randomUser) {
            // No more users to send admiration
            clearInterval(interval);
            alert('Більше немає користувачів для розсилки Admire Mail!');
            setIsSendingAdmire(false);
            return;
        }

        sentUsers.add(randomUser);

        await SendAdmire(randomSelectedAdmire, randomUser, ladyId, setCountAdmire, setErrAdmire, setIsSendingAdmire, interval)

    }, Math.floor(Math.random() * (12000 - 8000 + 1) + 8000));

    setSendingIntervalAdmire(interval);
}

export default StartSendAdmire;
