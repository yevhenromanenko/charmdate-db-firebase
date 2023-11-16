// import GetUserInfo from "./src/pages/main-page/invites/get-user-info/GetUserInfo";
//
// self.addEventListener('message', function (e) {
//     const {
//         socket,
//         loginData,
//         whoViewProfile,
//         whoGetAnswer,
//         setErrorMessage,
//         setIsConnectSocket,
//         invites,
//         setMyListArray,
//         setIsSending,
//         myListArrayRef,
//         setMessageInterval,
//         setCountInvite,
//         setPersonalListArray,
//         personalListArrayRef,
//         setErr,
//         isConnectSocket
//     } = e.data;
//
//     let reqCounter = 6; // Инициализируем счетчик req значением 6
//     let reqTicket = 1;
//
//     if (invites.length === 0) {
//         postMessage({ type: 'error', message: 'Додайте хоча б один інвайт для розсилки!' });
//         return;
//     }
//
//     setIsSending(true);
//
//     // Запускаем отправку инвайта каждые 5-7 секунд
//     const newInterval = setInterval(async () => {
//
//         const myListArray = myListArrayRef.current;
//         const user = myListArray[Math.floor(Math.random() * myListArray.length)];
//         const randomInvite = invites[Math.floor(Math.random() * invites.length)];
//
//         const randomUser = await GetUserInfo(user);
//
//         if (socket.current.readyState === WebSocket.CONNECTING) {
//             postMessage({ type: 'info', message: 'WebSocket подключается...' });
//         } else if (socket.current.readyState === WebSocket.OPEN) {
//
//             if (reqTicket % 5 === 0) {
//                 socket.current?.send(`{"cmd":170,"req":${reqCounter},"data":null}`);
//                 reqCounter++;
//             }
//
//             if (reqTicket % 8 === 0) {
//                 socket.current?.send(`{"cmd": 98, "req":${reqCounter}, "data": {"endAge": 99, "beginAge": 18}}`);
//                 reqCounter++;
//             }
//
//             if (reqTicket % 90 === 0) {
//                 socket.current?.send(`{"cmd":257,"req":${reqCounter},"data":1}`);
//                 reqCounter++;
//                 socket.current?.send(`{"cmd":262,"req":${reqCounter},"data":0}`);
//                 reqCounter++;
//             }
//
//             postMessage({ type: 'info', message: 'WebSocket открыт и готов к отправке персонального инвайта.' });
//             postMessage({
//                 type: 'sendInvite',
//                 data: {
//                     randomUser,
//                     randomInvite,
//                     socket,
//                     reqCounter,
//                     reqTicket
//                 }
//             });
//
//             setCountInvite(count => count + 1); // выводим кол-во отправленных
//             reqCounter++;
//             reqTicket++;
//
//         } else {
//             postMessage({ type: 'info', message: 'WebSocket закрыт или закрывается. Переподключаемся...' });
//             if (!isConnectSocket) {
//                 postMessage({
//                     type: 'reconnectSocket',
//                     data: {
//                         socket,
//                         setIsConnectSocket,
//                         setErrorMessage,
//                         whoViewProfile,
//                         whoGetAnswer,
//                         loginData,
//                         setMyListArray,
//                         myListArrayRef,
//                         setErr,
//                         setPersonalListArray,
//                         personalListArrayRef
//                     }
//                 });
//             }
//         }
//
//     }, Math.floor(Math.random() * (4000 - 2000 + 1) + 2000));
//
//     postMessage({ type: 'info', message: 'Завершена отправка инвайтов.' });
//     setMessageInterval(newInterval);
// });
