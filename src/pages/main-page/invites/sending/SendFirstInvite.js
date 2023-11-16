// import GetUserInfo from "../../../../functions/get-user-info/GetUserInfo";
// import ReplaceTags from "../../../../functions/replace-tags/ReplaceTags";
// import CheckForForbiddenTags from "../../../../functions/check-for-forbidden-tags/CheckForForbiddenTags";
//
// const SendFirstInvite = async ({ id, name }, invite, socket, reqCounter, reqTicket, myListArrayRef, personalListArrayRef, invitesPersonal, invites, invitesCamshare, checkCamshareInvite) => {
//
//     let userExists = false;
//     let replaceEmailContent;
//
//     const myListArray = myListArrayRef.current; // Получаем актуальное значение myListArray из useRef
//     const personalListArray = personalListArrayRef.current
//
//     const userToSend = myListArray[Math.floor(Math.random() * myListArray.length)];
//     let randomInvite;
//     const randomPersonalInvite = invitesPersonal[Math.floor(Math.random() * invitesPersonal.length)];
//
//     const userBan = banUsers.some((user) => user.id === userToSend);
//     if (userBan) {
//         setErr(err => err + 1)
//         console.log('Спроба відправки користувачу, який у бан листі! Не відправлено!')
//         return null;
//     }
//     const randomUser = await GetUserInfo(userToSend)
//
//     if (checkCamshareInvite) {
//         const result = [...invites, ...invitesCamshare];
//         randomInvite = result[Math.floor(Math.random() * result.length)];
//     } else {
//         randomInvite = invites[Math.floor(Math.random() * invites.length)];
//     }
//
//     if (personalListArray.includes(randomUser.id)) {
//         userExists = true;
//
//         replaceEmailContent = await ReplaceTags(randomPersonalInvite.msg, randomUser)
//
//         const hasForbiddenTags = CheckForForbiddenTags(replaceEmailContent);
//
//         if (hasForbiddenTags) {
//             setErr(err => err + 1)
//             console.log('Інвайт має заборонені теги. Не отправили');
//             return;
//         }
//     }
//
//
//     const userId = id;
//     const targetName = `${name}, `;
//     console.log(targetName, 'targetName')
//
//     const inviteWithOutName = {
//         "cmd": 15,
//         "req": reqCounter + 1,
//         "data": {
//             "ticket": reqTicket + 1,
//             "type": 0,
//             "illegal": false,
//             "targetId": userId,
//             "msg": invite.msg
//         }
//     };
//     socket.current.send(JSON.stringify(inviteWithOutName));
// }
// export default SendFirstInvite;


//===========================================
// // await SendFirstInvite(randomUser, randomInvite, socket, reqCounter, reqTicket)
//
//     // // Запускаем отправку инвата каждые 5-7 секунды
//     // const newInterval = setInterval(async () => {
//     //
//     //     if (startChat) {
//     //         if (socket && socket.current) {
//     //             socket.current.close();
//     //         }
//     //
//     //         setIsSending(false);
//     //         clearInterval(newInterval);
//     //         setMessageInterval(null);
//     //         setIsConnectSocket(false);
//     //         setErrorMessage('');
//     //     }
//     //
//     //     let userExists = false;
//     //     let replaceEmailContent;
//     //     const myListArray = myListArrayRef.current; // Получаем актуальное значение myListArray из useRef
//     //     const personalListArray = personalListArrayRef.current
//     //
//     //     const userToSend = myListArray[Math.floor(Math.random() * myListArray.length)];
//     //
//     //     let randomInvite;
//     //     const randomPersonalInvite = invitesPersonal[Math.floor(Math.random() * invitesPersonal.length)];
//     //
//     //     const userBan = banUsers.some((user) => user.id === userToSend);
//     //     if (userBan) {
//     //         setErr(err => err + 1)
//     //         console.log('Спроба відправки користувачу, який у бан листі! Не відправлено!')
//     //         return null;
//     //     }
//     //
//     //     const randomUser = await GetUserInfo(userToSend)
//     //
//     //     if (checkCamshareInvite) {
//     //         const result = [...invites, ...invitesCamshare];
//     //         randomInvite = result[Math.floor(Math.random() * result.length)];
//     //     } else {
//     //         randomInvite = invites[Math.floor(Math.random() * invites.length)];
//     //     }
//     //
//     //     if (personalListArray.includes(randomUser.id)) {
//     //         userExists = true;
//     //
//     //         replaceEmailContent = await ReplaceTags(randomPersonalInvite.msg, randomUser)
//     //
//     //         const hasForbiddenTags = CheckForForbiddenTags(replaceEmailContent);
//     //
//     //         if (hasForbiddenTags) {
//     //             setErr(err => err + 1)
//     //             console.log('Інвайт має заборонені теги. Не отправили');
//     //             return;
//     //         }
//     //     }
//     //
//     //     const logItem = (
//     //         <LogInvites
//     //             randomPersonalInvite={replaceEmailContent}
//     //             userExists={userExists}
//     //             randomInvite={randomInvite}
//     //             randomUser={randomUser}
//     //             key={log.length}
//     //         />
//     //     );
//     //
//     //     if (socket.current.readyState === WebSocket.CONNECTING) {
//     //         console.log(socket.current.readyState, "WebSocket подключается...");
//     //     } else if (socket.current.readyState === WebSocket.OPEN) {
//     //
//     //         // if (reqTicket % 5 === 0) {
//     //         //     socket.current?.send(`{"cmd":170,"req":${reqCounter},"data":null}`);
//     //         //     reqCounter++;
//     //         // }
//     //
//     //         if (reqTicket % 8 === 0) {
//     //             socket.current?.send(`{"cmd": 98, "req":${reqCounter}, "data": {"endAge": 99, "beginAge": 18}}`);
//     //             reqCounter++;
//     //         }
//     //
//     //         if (reqTicket % 90 === 0) {
//     //             socket.current?.send(`{"cmd":257,"req":${reqCounter},"data":1}`);
//     //             reqCounter++;
//     //             socket.current?.send(`{"cmd":262,"req":${reqCounter},"data":0}`);
//     //             reqCounter++;
//     //         }
//     //
//     //         if (userExists === true) {
//     //             SendPersonalInviteToUser(socket, replaceEmailContent, randomUser, logItem, setLog, reqCounter, reqTicket);
//     //         } else {
//     //             SendInviteToUser(randomUser, randomInvite, socket, reqCounter, reqTicket, logItem, setLog);
//     //         }
//     //
//     //
//     //         // if (reqTicket % 181 === 0) {
//     //         //     if (socket && socket.current) {
//     //         //         console.log(socket.current.readyState, 'состояние перед закрытием ')
//     //         //         socket.current.close();
//     //         //         console.log(socket.current.readyState, 'состояние после закрытия ')
//     //         //         await delay(2000); // Задержка 2 секунды перед повторным подключением
//     //         //         await ConnectWebSocket(socket, setIsConnectSocket, setErrorMessage, whoViewProfile, whoGetAnswer, loginData, setMyListArray, myListArrayRef, setErr, setPersonalListArray, personalListArrayRef, setChat, setMessage, setIsSending, setStartChat);
//     //         //         console.log(socket.current.readyState, 'состояние после коннекта ')
//     //         //         await delay(2000); // Задержка 2 секунды перед повторным подключением
//     //         //     }
//     //         //     reqCounter = 6;
//     //         //     reqTicket = 1;
//     //         // }
//     //
//     //         reqCounter++;
//     //         reqTicket++;
//     //
//     //     } else {
//     //         console.log("WebSocket закрыт или закрывается. Переподключаемся...");
//     //         ConnectWebSocket(socket, setIsConnectSocket, setErrorMessage, whoViewProfile, whoGetAnswer, loginData, setMyListArray, myListArrayRef, setErr, setPersonalListArray, personalListArrayRef, setChat, setMessage, setIsSending, setStartChat, newInterval, setMessageInterval);
//     //     }
//     //
//     // }, Math.floor(Math.random() * (4500 - 2500 + 1) + 2500));
