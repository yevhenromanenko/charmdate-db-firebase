
const SetOnline = (socket) => {
    socket.current.send('{"cmd":-1,"req":1,"data":"1.1.0.0XCHAT"}');
};

export default SetOnline;
