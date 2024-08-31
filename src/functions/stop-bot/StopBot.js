const StopBot = (socket, setSendInvite, setHasSentCmd98, setReconnect, setIsSending, setStartChat, setMessage) => {
        socket.current.close();
        setSendInvite(false);
        setHasSentCmd98(false);
        setReconnect(false);
        setIsSending(false);
        setStartChat(true);
        setMessage('');
}

export default StopBot;
