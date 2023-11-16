import './AutoAnswer.scss'
import PlaySong from "../../play-song/PlaySong";
import React from "react";
import FocusTab from "../../../../functions/focus/Focus";

const AutoAnswer = async (eventData, whoGetAnswer, socket, setChat, setMessage, setIsSending, setStartChat, startChat, setSendInvite) => {
    const usersData = ((eventData.split(`"data":{`) || [])[1] || '').split('},')[0];
    const audio = new Audio('https://soulmate-agency.com/findapp/sound/test');

    // Используем регулярные выражения для извлечения значений
    const fromUserNameMatch = usersData.match(/"fromUserName":"([^"]*)"/);
    const fromUserIdMatch = usersData.match(/"fromUserId":"([^"]*)"/);
    const text = usersData.match(/"msg":"([^"]*)"/);
    const id = usersData.match(/"inviteId":"([^"]*)"/);

    // Извлекаем значения из совпадений
    const fromUserName = fromUserNameMatch ? fromUserNameMatch[1] : null;
    const fromUserId = fromUserIdMatch ? fromUserIdMatch[1] : null;
    const msg = text ? text[1] : null;
    const inviteId = id ? id[1] : null;

    // Создаем объект user
    const user = {
        name: fromUserName,
        id: fromUserId,
        msg: msg,
        inviteId: inviteId,
    };

    console.log(whoGetAnswer.current, 'whoGetAnswer.current 0')

    if(!whoGetAnswer.current.includes(user.id)) {
        const reqTicket = 1;
        const reqCounter = 0;

        const inChatLink = () => `https://www.charmdate.com/livechat/pad/chat-lady.php?manid=${user.id}&inviteid=${user.inviteId}`;
        const invite = [`${user.name}, nice to see you!`, `Hey dear`, `Hi ${user.name}`, `how are u today?`];
        const manProfileLink = `https://www.charmdate.com/livechat/lady/history/profile.php?manid=${user.id}`
        const randomInvite = invite[Math.floor(Math.random() * invite.length)];

        const handleChatButtonClick = () => {
            socket.current.close();
            setSendInvite(false)
            setIsSending(false);
            setStartChat(true);
            setMessage('');
            audio.pause();
            window.open(inChatLink(), '_blank');
        };

        setChat(chat => chat + 1);

        const newMessage = (
            <div key={user.id}>
                Почався чат з{" "}
                <a href={manProfileLink} target="_blank">{user.id} - {user.name}!</a>{" "}
                {" "}-{" "}<span style={{color: 'peru', display: 'inline'}}>{user.msg}</span>{" => "}
                Перейдіть {" "}
                <button className={'auto-answer-button'} onClick={handleChatButtonClick}>в чат</button>
                {" "}
            </div>
        );

        console.log(whoGetAnswer.current, 'whoGetAnswer.current 1')
        whoGetAnswer.current.push(user.id);
        const message = {"cmd":15, "req":reqCounter, "data": {"ticket":reqTicket,"type":0,"illegal":false,"targetId":`${user.id}`,"msg":`${randomInvite}`}}
        socket.current.send(JSON.stringify(message));

        if (!startChat) {
            console.log(document.hidden, 'document.hidden')

            console.log(socket.current.readyState)
            if (socket.current.readyState !== WebSocket.CLOSED) {
                console.log(socket.current.readyState)

                if (document.hidden) {
                    FocusTab();
                    console.log('если скрыта вкладка - делаем активной и воспроизводим звук')
                    await PlaySong(audio);
                } else {
                    console.log('если не скрыта вкладка - звук')
                    await PlaySong(audio);
                }
            }

            setMessage(prevMessages => [...prevMessages, newMessage]);
        }

        // сделать еще отправку фото здесь
        // SendInviteToUser(user, randomInvite, socket, reqCounter, reqTicket);
    }
    if(whoGetAnswer.current.includes(user.id)) {
        console.log(whoGetAnswer.current, 'whoGetAnswer.current 2')
        console.log('мужчина уже получил Hi dear, пора бы отправить ему фото')
    }

}

export default AutoAnswer;
