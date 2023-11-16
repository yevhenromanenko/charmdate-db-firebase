import { setInterval } from 'worker-timers';
import SendAdmire from "./SendAdmire";

const StartSendAdmire = (selectedAdmire, setIsSendingAdmire, setSendingIntervalAdmire, admireManIds, setErrAdmire, setCountAdmire, lastSavedDate, setLastSavedDate, ladyId, sendingIntervalAdmire, isSendingAdmire) => {

    if (selectedAdmire.length === 0) {
        alert('Поставте хоча б одну галочку біля Admire Mail для розсилки!');
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

    setIsSendingAdmire(true);

    const interval = setInterval(async () => {

        const randomUser = admireManIds[Math.floor(Math.random() * admireManIds.length)];
        const randomSelectedAdmire = selectedAdmire[Math.floor(Math.random() * selectedAdmire.length)];

        await SendAdmire(randomSelectedAdmire, randomUser, ladyId, setCountAdmire, setErrAdmire, setIsSendingAdmire, interval)

    }, Math.floor(Math.random() * (12000 - 8000 + 1) + 8000));

    setSendingIntervalAdmire(interval);
}

export default StartSendAdmire;
