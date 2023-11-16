import SetOnline from "./SetOnline";
import CreateWebSocket from "./CreateWebSocket";
import AutoAnswer from "../invites/auto-answer/AutoAnswer";
import SendingInvites from "../invites/sending-invites/SendingInvites";
import Sending from "../invites/sending/Sending";

const ConnectWebSocket = async (socket, setIsConnectSocket, setErrorMessage, whoViewProfile, whoGetAnswer, loginData, setMyListArray, myListArrayRef, setErr, setPersonalListArray, personalListArrayRef, setChat, setMessage, setIsSending, setStartChat, setReconnect, setSendInvite, startChat, invitesPersonal, banUsers, checkCamshareInvite, invites, invitesCamshare, setLog, log, sendInviteRef, setCountInvite, hasSentCmd98, setHasSentCmd98, hasSentCmd98Ref) => {

    socket.current = CreateWebSocket(loginData);

    socket.current.onopen = () => {
        SetOnline(socket)
        setErrorMessage(''); // Clear any previous error messages when the WebSocket is reconnected.
        setIsConnectSocket(true);
    };

    socket.current.onerror = (err) => {
        console.log('Socket onerror', err);
        setErrorMessage('Ошибка, обновите программу!');
        setIsConnectSocket(false);
    };

    socket.current.onmessage = (event) => {
        const eventData = event.data;
        setErrorMessage('');

        if(eventData.includes('"cmd":98')) {

            const users = ((eventData.split(`"data":"`) || [])[1] || '').split('",')[0];
            const myListArray = users.split(',').map(item => `${item}`);

            setMyListArray(myListArray);
            myListArrayRef.current = myListArray;

            if (!hasSentCmd98Ref.current) {
                let reqCounter = 6;
                let reqTicket = 1;
                Sending(socket, startChat, setIsSending, setIsConnectSocket, setErrorMessage, myListArrayRef, personalListArrayRef, invitesPersonal, banUsers, setErr, checkCamshareInvite, invites, invitesCamshare, reqTicket, reqCounter, setLog, whoViewProfile, whoGetAnswer, loginData, setMyListArray, setPersonalListArray, setChat, setMessage, setStartChat, log, setReconnect, sendInviteRef, setSendInvite, setCountInvite, hasSentCmd98, setHasSentCmd98);
                setHasSentCmd98(true);
            }
        }


        if(eventData.includes('"cmd":162')) {
            const usersData = ((eventData.split(`"data":[`) || [])[1] || '').split('],')[0];
            const personalListArray = usersData.split(',').map(item => item.replace(/"/g, ''));

            setPersonalListArray(personalListArray);
            personalListArrayRef.current = personalListArray;
        }

        if (eventData === '{"cmd":27,"data":4}') {
            socket.current.close();
            setSendInvite(false);
            setReconnect(false);
            setStartChat(true);
            setIsSending(false);
            setHasSentCmd98(false);
            setMessage('');
        }


        if (eventData.includes('"cmd":24')) {
            console.log(eventData, 'eventData 24')
            AutoAnswer(eventData, whoGetAnswer, socket, setChat, setMessage, setIsSending, setStartChat, startChat, setSendInvite);
        }

        if(eventData === '{"data":true,"req":1,"cmd":-1}') {
            socket.current?.send(`{"cmd":9,"req":2,"data":{"userId":"${loginData.loginUserId}","password":"${loginData.loginUserSwpid}","fromId":0,"sex":0,"type":0,"authType":0}}`);
        }

        if(eventData === '{"data":true,"req":2,"cmd":9}') {
            socket.current?.send('{"cmd":211,"req":3,"data":true}');
        }

        if(eventData === '{"data":true,"req":3,"cmd":211}') {
            socket.current?.send('{"cmd":98,"req":4,"data":{"endAge":99,"beginAge":18}}');
            socket.current?.send('{"cmd":162,"req":5,"data":null}');
        }

        if (eventData.includes('"cmd":15')) {
            const res = ((eventData.split(`"data":`) || [])[1] || '').split(',')[0];

            if (res === 'false') {
                setErr(err => err + 1);

                setTimeout(() => {
                    SendingInvites(socket, startChat, setIsSending, setIsConnectSocket, setErrorMessage, myListArrayRef, personalListArrayRef, invitesPersonal, banUsers, setErr, checkCamshareInvite, invites, invitesCamshare, setLog, whoViewProfile, whoGetAnswer, loginData, setMyListArray, setPersonalListArray, setChat, setMessage, setStartChat, log, setReconnect, sendInviteRef, setSendInvite, setCountInvite, hasSentCmd98, setHasSentCmd98, hasSentCmd98Ref);
                }, 15000);

            } else if (res === '{"_ok":-2') {
                setErr(err => err + 1);
                SendingInvites(socket, startChat, setIsSending, setIsConnectSocket, setErrorMessage, myListArrayRef, personalListArrayRef, invitesPersonal, banUsers, setErr, checkCamshareInvite, invites, invitesCamshare, setLog, whoViewProfile, whoGetAnswer, loginData, setMyListArray, setPersonalListArray, setChat, setMessage, setStartChat, log, setReconnect, sendInviteRef, setSendInvite, setCountInvite, hasSentCmd98, setHasSentCmd98, hasSentCmd98Ref);
            } else {
                setCountInvite(count => count + 1);// выводим кол-во отправленных
                SendingInvites(socket, startChat, setIsSending, setIsConnectSocket, setErrorMessage, myListArrayRef, personalListArrayRef, invitesPersonal, banUsers, setErr, checkCamshareInvite, invites, invitesCamshare, setLog, whoViewProfile, whoGetAnswer, loginData, setMyListArray, setPersonalListArray, setChat, setMessage, setStartChat, log, setReconnect, sendInviteRef, setSendInvite, setCountInvite, hasSentCmd98, setHasSentCmd98, hasSentCmd98Ref);
            }
        }
    }
};


export default ConnectWebSocket;

// запрос на стикеры

// fetch("https://www.charmdate.com/livechat/setstatus.php?action=magicicon_list&gender=0&jsoncallback=success_magicData&url=%2Flivechat%2Fsetstatus.php%3Faction%3Dmagicicon_list%26gender%3D0&gender=0&jsonpCallback=success_magicData&curwomanid=C890734", {
//     "headers": {
//         "accept": "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01",
//         "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
//         "content-type": "true",
//         "sec-ch-ua": "\"Google Chrome\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
//         "sec-ch-ua-mobile": "?0",
//         "sec-ch-ua-platform": "\"macOS\"",
//         "sec-fetch-dest": "empty",
//         "sec-fetch-mode": "cors",
//         "sec-fetch-site": "same-origin",
//         "x-requested-with": "XMLHttpRequest"
//     },
//     "referrer": "https://www.charmdate.com/livechat/pad/chat-lady.php?memberid=C890734&manid=CM70461251&sid=dsbq8kjjvsu7u9hakltpl6n6i5",
//     "referrerPolicy": "strict-origin-when-cross-origin",
//     "body": null,
//     "method": "GET",
//     "mode": "cors",
//     "credentials": "include"
// });


// запрос на перевод сообщения
// fetch("https://www.charmdate.com/livechat/googleapis.php", {
//     "headers": {
//         "accept": "*/*",
//         "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
//         "content-type": "application/x-www-form-urlencoded",
//         "sec-ch-ua": "\"Google Chrome\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
//         "sec-ch-ua-mobile": "?0",
//         "sec-ch-ua-platform": "\"macOS\"",
//         "sec-fetch-dest": "empty",
//         "sec-fetch-mode": "cors",
//         "sec-fetch-site": "same-origin",
//         "x-requested-with": "XMLHttpRequest"
//     },
//     "referrer": "https://www.charmdate.com/livechat/pad/chat-lady.php?memberid=C890734&manid=CM70461251&sid=dsbq8kjjvsu7u9hakltpl6n6i5",
//     "referrerPolicy": "strict-origin-when-cross-origin",
//     "body": "target=en&q=%D1%8F+%D1%81%D0%B4%D0%B5%D0%BB%D0%B0%D0%BB%D0%B0+%D0%B4%D0%BB%D1%8F+%D1%82%D0%B5%D0%B1%D1%8F+%D0%BD%D0%B5%D1%81%D0%BA%D0%BE%D0%BB%D1%8C%D0%BA%D0%BE+%D1%84%D0%BE%D1%82%D0%BE+%2C+%D1%85%D0%BE%D1%82%D0%B5%D0%BB%D0%B0+%D0%B1%D1%8B+%D1%82%D0%B5%D0%B1%D0%B5+%D0%BF%D0%BE%D0%BA%D0%B0%D0%B7%D0%B0%D1%82%D1%8C+%D1%8D%D1%82%D0%BE+%D0%B5%D1%81%D0%BB%D0%B8+%D1%82%D1%8B+%D1%85%D0%BE%D1%87%D0%B5%D1%88%D1%8C+%D1%83%D0%B2%D0%B8%D0%B4%D0%B5%D1%82%D1%8C+%D1%8D%D1%82%D0%BE&msgid=-1",
//     "method": "POST",
//     "mode": "cors",
//     "credentials": "include"
// });
