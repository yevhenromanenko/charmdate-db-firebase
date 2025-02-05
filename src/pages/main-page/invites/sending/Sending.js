import React from "react";
import GetUserInfo from "../../../../functions/get-user-info/GetUserInfo";
import ReplaceTags from "../../../../functions/replace-tags/ReplaceTags";
import CheckForForbiddenTags from "../../../../functions/check-for-forbidden-tags/CheckForForbiddenTags";
import LogInvites from "../log-invites/LogInvites";
import SendPersonalInviteToUser from "../send-personal-invite-to-user/SendPersonalInviteToUser";
import SendInviteToUser from "../send-invite-to-user/SendInviteToUser";
import ConnectWebSocket from "../../connect-web-socket/ConnectWebSocket";
import delay from "../../../../functions/delay/delay";

const Sending = async (socket, startChat, setIsSending, setIsConnectSocket, setErrorMessage, myListArrayRef, personalListArrayRef, invitesPersonal, banUsers, setErr, checkCamshareInvite, invites, invitesCamshare, reqTicket, reqCounter, setLog, whoViewProfile, whoGetAnswer, loginData, setMyListArray, setPersonalListArray, setChat, setMessage, setStartChat, log, setReconnect, sendInviteRef, setSendInvite, setCountInvite, hasSentCmd98, setHasSentCmd98, hasSentCmd98Ref, markGetAnswer, whoGetSecondAnswer, spamUserIdsRef) => {

        if (startChat) {
            socket.current.close();
            setSendInvite(false);
            setIsSending(false);
            setIsConnectSocket(false);
            setHasSentCmd98(false);
            setErrorMessage('');
        }

        let userExists = false;
        let replaceEmailContent;
        let myUserOnline;
        let randomInvite;
        let randomUser;
        let spamUserIdsArray;
        const myListArray = myListArrayRef.current; // Получаем актуальное значение myListArray из useRef
        const personalListArray = personalListArrayRef.current;

        if (spamUserIdsRef) {
            spamUserIdsArray = spamUserIdsRef.current;
        }

        const userToSend = myListArray[Math.floor(Math.random() * myListArray.length)];

        if (spamUserIdsArray && spamUserIdsArray.length > 0) {
            myUserOnline = spamUserIdsArray[Math.floor(Math.random() * spamUserIdsArray.length)];
        } else {
            myUserOnline = myListArray[Math.floor(Math.random() * myListArray.length)];
        }

        const randomPersonalInvite = invitesPersonal[Math.floor(Math.random() * invitesPersonal.length)];

        const userBan = banUsers.some((user) => user.id === userToSend);
        const personalUserBan = banUsers.some((user) => user.id === myUserOnline);
        if (userBan || personalUserBan) {
            setErr(err => err + 1)
            console.log('Спроба відправки користувачу, який у бан листі! Не відправлено!')
            return null;
        }

        if (reqTicket % 10 === 0) {
            randomUser = await GetUserInfo(myUserOnline)
        } else {
            randomUser = await GetUserInfo(userToSend)
        }

        const banUser = banUsers.some((user) => user.id === randomUser.id);
        if (banUser) {
            setErr(err => err + 1)
            console.log('Спроба відправки користувачу, який у бан листі! Не відправлено!')
            return null;
        }

        if (checkCamshareInvite) {
            const result = [...invites, ...invitesCamshare];
            randomInvite = result[Math.floor(Math.random() * result.length)];
        } else {
            randomInvite = invites[Math.floor(Math.random() * invites.length)];
        }

        if (personalListArray.includes(randomUser.id)) {
            userExists = true;

            replaceEmailContent = await ReplaceTags(randomPersonalInvite.msg, randomUser)

            const hasForbiddenTags = CheckForForbiddenTags(replaceEmailContent);

            if (hasForbiddenTags) {
                setErr(err => err + 1)
                console.log('Інвайт має заборонені теги. Не отправили');
                return;
            }
        }

        const logItem = (
            <LogInvites
                randomPersonalInvite={replaceEmailContent}
                userExists={userExists}
                randomInvite={randomInvite}
                randomUser={randomUser}
                key={log.length}
            />
        );

        if (socket.current.readyState === WebSocket.CONNECTING) {
            console.log(socket.current.readyState, "WebSocket подключается...");
        } else if (socket.current.readyState === WebSocket.OPEN) {


            /// 8
            if (reqTicket % 12 === 0) {
                socket.current?.send(`{"cmd": 98, "req":${reqCounter}, "data": {"endAge": 99, "beginAge": 18}}`);
                reqCounter++;
                await delay(1, 2);
            }

            if (reqTicket % 90 === 0) {
                socket.current?.send(`{"cmd":257,"req":${reqCounter},"data":1}`);
                reqCounter++;
                await delay(1, 2);
                socket.current?.send(`{"cmd":262,"req":${reqCounter},"data":0}`);
                reqCounter++;
                await delay(3, 7);
            }
            //
            // if (reqTicket % 10 === 0) {
            //     randomUser = spamUserIdsArray
            // }

            if (userExists === true) {
                SendPersonalInviteToUser(socket, replaceEmailContent, randomUser, logItem, setLog, reqCounter, reqTicket);
            } else {
                SendInviteToUser(randomUser, randomInvite, socket, reqCounter, reqTicket, logItem, setLog);
            }

            reqCounter++;
            reqTicket++;

            return { updatedReqCounter: reqCounter, updatedReqTicket: reqTicket };

        } else {
            console.log("WebSocket закрыт или закрывается. Переподключаемся...");
            await ConnectWebSocket(socket, setIsConnectSocket, setErrorMessage, whoViewProfile, whoGetAnswer, loginData, setMyListArray, myListArrayRef, setErr, setPersonalListArray, personalListArrayRef, setChat, setMessage, setIsSending, setStartChat, setReconnect, setSendInvite, startChat, invitesPersonal, banUsers, checkCamshareInvite, invites, invitesCamshare, reqTicket, reqCounter, setLog, log, sendInviteRef, setCountInvite, hasSentCmd98, setHasSentCmd98, hasSentCmd98Ref, markGetAnswer, whoGetSecondAnswer);
        }
}

export default Sending;
