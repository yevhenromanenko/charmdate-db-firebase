import './AutoAnswer.scss'
import PlaySong from "../../play-song/PlaySong";
import React from "react";
import FocusTab from "../../../../functions/focus/Focus";
import StopBot from "../../../../functions/stop-bot/StopBot";
import delay from "../../../../functions/delay/delay";
import SendToTelegram from "../../../../functions/send-to-telegram/SendToTelegram";

const AutoAnswer = async (eventData, whoGetAnswer, socket, setChat, setMessage, setIsSending, setStartChat, startChat, setSendInvite, setHasSentCmd98, setReconnect, markGetAnswer, whoGetSecondAnswer, telegramChatId, botToken, loginData) => {
    const usersData = ((eventData.split(`"data":{`) || [])[1] || '').split('},')[0];
    const audio = new Audio('https://firebasestorage.googleapis.com/v0/b/charmdate-db.appspot.com/o/new_message_tone-1.mp3?alt=media&token=4b2eaec6-57c0-4ef2-ba96-a1d51b29fd5a');

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

    if (whoGetAnswer.current.includes(user.id)) {
        const reqTicket = 2;
        const reqCounter = 1;

        await delay(2, 5);

        if (user.id === 'CM68379288' && !markGetAnswer.current.includes(user.id)) {
            markGetAnswer.current.push(user.id);
            const message = {"cmd":15, "req":reqCounter, "data": {"ticket":reqTicket,"type":0,"illegal":false,"targetId":`${user.id}`,"msg":`Hmm`}}
            socket.current.send(JSON.stringify(message));
        }

        if (!whoGetSecondAnswer.current.includes(user.id)) {
            const secondInvite = [`I'm checking the internet`, `what are you thinking about?`, `so?`, `how are u today?`, 'Hmm'];
            const randomSecondInvite = secondInvite[Math.floor(Math.random() * secondInvite.length)];

            whoGetSecondAnswer.current.push(user.id);
            const message = {"cmd":15, "req":reqCounter, "data": {"ticket":reqTicket,"type":0,"illegal":false,"targetId":`${user.id}`,"msg":`${randomSecondInvite}`}}
            socket.current.send(JSON.stringify(message));
        }
        console.log('мужчина уже получил Hi dear и how are u?, пора бы отправить ему фото')
    }

    if (!whoGetAnswer.current.includes(user.id)) {
        const reqTicket = 1;
        const reqCounter = 0;

        const inChatLink = () => `https://www.charmdate.com/livechat/pad/chat-lady.php?manid=${user.id}&inviteid=${user.inviteId}`;
        const invite = [`${user.name}, nice to see you!`, `Hey`, `Hi ${user.name}`, `hey you`, 'Hmm', 'hi', 'hi there', 'hello sir'];
        const manProfileLink = `https://www.charmdate.com/livechat/lady/history/profile.php?manid=${user.id}`
        const randomInvite = invite[Math.floor(Math.random() * invite.length)];

        const handleChatButtonClick = () => {
            StopBot(socket, setSendInvite, setHasSentCmd98, setReconnect, setIsSending, setStartChat, setMessage)
            audio.pause();
            window.open(inChatLink(), '_blank');
        };

        setChat(chat => chat + 1);

        await SendToTelegram(user.id, loginData, botToken, telegramChatId);

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

        whoGetAnswer.current.push(user.id);
        const message = {"cmd":15, "req":reqCounter, "data": {"ticket":reqTicket,"type":0,"illegal":false,"targetId":`${user.id}`,"msg":`${randomInvite}`}}
        socket.current.send(JSON.stringify(message));

        if (!startChat) {

            if (socket.current.readyState !== WebSocket.CLOSED) {

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
}

export default AutoAnswer;
