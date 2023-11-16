// import { clearInterval } from 'worker-timers';

const StopSendingInvites = (socket, messageInterval, setIsSending, setMessageInterval, setIsConnectSocket, setErrorMessage, setShouldStartSendingAutomatically) => {

    if (socket && socket.current) {
        socket.current.close();
    }
    setShouldStartSendingAutomatically(false); // Нажатие на кнопку - отключаем автозапуск
    setIsSending(false);
    setIsConnectSocket(false);
    setErrorMessage('');
};

export default StopSendingInvites;
