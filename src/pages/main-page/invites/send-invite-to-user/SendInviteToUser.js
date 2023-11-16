//
// const SendInviteToUser = (userId, invite, socket, reqCounter, reqTicket, logItem, setLog, invites) => {
//
//     setLog((prevLog) => [...prevLog, logItem]); // выводим в лог
//
//     const inviteWithName = {"cmd":15,"req":reqCounter,"data":{"ticket":reqTicket,"illegal":false,"targetId":`${userId.id}`,"msg":`${invite.msg}`,"type":0,"id":`${invite.msgid}`,"prefix":`${userId.name}, `}};
//     socket.current.send(JSON.stringify(inviteWithName));
//     reqCounter = reqCounter + 1;
//     reqTicket = reqTicket + 1;
//
//
//     const randomInviteOne = invites[Math.floor(Math.random() * invites.length)];
//     const inviteOne = {"cmd":15, "req":reqCounter, "data": {"ticket":reqTicket,"type":0,"illegal":false,"targetId":`${userId.id}`,"msg":`${randomInviteOne.msg}`}}
//
//     //const message = {"cmd":15, "req":reqCounter, "data": {"ticket":reqTicket,"type":0,"illegal":false,"targetId":`${userId.id}`,"msg":`${invite.msg}`}}
//     // const message = {
//     //     cmd: 15,
//     //     req: reqCounter,
//     //     data: {"ticket":1,"type":0,"illegal":false,"targetId":`${userId}`,"msg":`${invite}`},
//     // };
//     socket.current.send(JSON.stringify(inviteOne));
//     reqCounter++;
//     reqTicket++;
//
// };
//
// export default SendInviteToUser;
//
const SendInviteToUser = ({ id, name }, invite, socket, reqCounter, reqTicket, logItem, setLog) => {

    setLog((prevLog) => [...prevLog, logItem]); // выводим в лог

    const userId = id;
    const targetName = `${name}, `;
    const firstChar = invite.msg[0];

    if ((firstChar >= 'a' && firstChar <= 'z') || (firstChar >= 'а' && firstChar <= 'я')) {
        const inviteWithName = {
            "cmd": 15,
            "req": reqCounter,
            "data": {
                "ticket": reqTicket,
                "illegal": false,
                "targetId": userId,
                "msg": invite.msg,
                "type": 0,
                "id": invite.msgid,
                "prefix": targetName
            }
        };
        socket.current.send(JSON.stringify(inviteWithName));

        // return true; // Starts with a lowercase letter.
    } else if (firstChar >= 'A' && firstChar <= 'Z') {
        const inviteWithOutName = {
            "cmd": 15,
            "req": reqCounter + 1,
            "data": {
                "ticket": reqTicket + 1,
                "type": 0,
                "illegal": false,
                "targetId": userId,
                "msg": invite.msg
            }
        };
        socket.current.send(JSON.stringify(inviteWithOutName));

        // return false; // Starts with an uppercase letter.
    } else {
        console.log('Непредвиденный символ в начале строки.', firstChar);
        const inviteWithOutName = {
            "cmd": 15,
            "req": reqCounter + 1,
            "data": {
                "ticket": reqTicket + 1,
                "type": 0,
                "illegal": false,
                "targetId": userId,
                "msg": invite.msg
            }
        };
        socket.current.send(JSON.stringify(inviteWithOutName));
    }
};

export default SendInviteToUser;
