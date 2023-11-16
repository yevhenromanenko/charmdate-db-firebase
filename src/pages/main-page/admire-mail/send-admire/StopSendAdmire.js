import { clearInterval } from 'worker-timers';

const StopSendAdmire = (sendingInterval, setIsSending) => {
    clearInterval(sendingInterval); // Остановка интервала
    setIsSending(false);     // Установка флага о завершении рассылки
}

export default StopSendAdmire;
