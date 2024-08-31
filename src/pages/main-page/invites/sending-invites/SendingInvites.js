import delay from "../../../../functions/delay/delay";
import Sending from "../sending/Sending";

let reqCounter = 7;
let reqTicket = 2;
const SendingInvites = async (socket, startChat, setIsSending, setIsConnectSocket, setErrorMessage, myListArrayRef, personalListArrayRef, invitesPersonal, banUsers, setErr, checkCamshareInvite, invites, invitesCamshare, setLog, whoViewProfile, whoGetAnswer, loginData, setMyListArray, setPersonalListArray, setChat, setMessage, setStartChat, log, setReconnect, sendInviteRef, setSendInvite, setCountInvite, hasSentCmd98, setHasSentCmd98, hasSentCmd98Ref, markGetAnswer, whoGetSecondAnswer, spamUserIdsRef) => {

    await delay(0.7, 1.6);
    if (sendInviteRef.current === true) {
        const { updatedReqCounter, updatedReqTicket } = await Sending(socket, startChat, setIsSending, setIsConnectSocket, setErrorMessage, myListArrayRef, personalListArrayRef, invitesPersonal, banUsers, setErr, checkCamshareInvite, invites, invitesCamshare, reqTicket, reqCounter, setLog, whoViewProfile, whoGetAnswer, loginData, setMyListArray, setPersonalListArray, setChat, setMessage, setStartChat, log, setReconnect, sendInviteRef, setSendInvite, setCountInvite, hasSentCmd98, setHasSentCmd98, hasSentCmd98Ref, markGetAnswer, whoGetSecondAnswer, spamUserIdsRef)

        reqCounter = updatedReqCounter ? updatedReqCounter : reqCounter;
        reqTicket = updatedReqTicket ? updatedReqTicket : reqTicket;

    }
}

export default SendingInvites;
