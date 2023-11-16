
const SendPersonalInviteToUser = (socket, replaceEmailContent, randomUser, logItem, setLog, reqCounter, reqTicket) => {

    console.log('Или отправили?', replaceEmailContent);
    setLog((prevLog) => [...prevLog, logItem]); // выводим в лог

    const invitePersonalToUser = { "cmd":15,"req":reqCounter,"data":{"ticket":reqTicket,"illegal":false,"targetId":`${randomUser.id}`,"msg":`${replaceEmailContent}`,"type":0 }};
    socket.current.send(JSON.stringify(invitePersonalToUser));
}

export default SendPersonalInviteToUser;
