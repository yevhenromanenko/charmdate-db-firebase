import ConnectWebSocket from "../../connect-web-socket/ConnectWebSocket";

const StartSendingInvites = async (whoViewProfile, whoGetAnswer, myListArray, isSending, socket, loginData, setErrorMessage, setIsConnectSocket, invites, setMyListArray, setIsSending, myListArrayRef, setMessageInterval, setCountInvite, setPersonalListArray, personalListArrayRef, setErr, isConnectSocket, setChat, setMessage, setLog, log, setStartChat, lastSavedDate, setLastSavedDate, invitesPersonal, invitesCamshare, checkCamshareInvite, startChat, banUsers, getAnswerFromMan, setGetAnswerFromMan, setReconnect, sendInviteRef, setSendInvite, hasSentCmd98, setHasSentCmd98, hasSentCmd98Ref) => {

    if (invites.length === 0) {
        alert("Додайте хоча б один інвайт для розсилки!");
        return;
    }

    if (invitesPersonal.length === 0) {
        alert("Додайте хоча б один персональний інвайт для розсилки своїм постояльцям!");
        return;
    }
    if (checkCamshareInvite && invitesCamshare.length === 0) {
        alert("Додайте хоча б один camshare інвайт для розсилки!");
        return;
    }

    const isSameDate = (date1, date2) => date1.toISOString().slice(0, 10) === date2.toISOString().slice(0, 10);
    const currentDate = new Date();
    if (!isSameDate(currentDate, new Date(lastSavedDate))) {
        // Если текущая дата отличается от сохраненной даты, обнуляем счетчик
        setCountInvite(0);
        // Записываем текущую дату в локальное хранилище
        setLastSavedDate(currentDate.toISOString());
    }

    setIsSending(true);
    await ConnectWebSocket(socket, setIsConnectSocket, setErrorMessage, whoViewProfile, whoGetAnswer, loginData, setMyListArray, myListArrayRef, setErr, setPersonalListArray, personalListArrayRef, setChat, setMessage, setIsSending, setStartChat, setReconnect, setSendInvite, startChat, invitesPersonal, banUsers, checkCamshareInvite, invites, invitesCamshare, setLog, log, sendInviteRef, setCountInvite, hasSentCmd98, setHasSentCmd98, hasSentCmd98Ref)
}

export default StartSendingInvites;
