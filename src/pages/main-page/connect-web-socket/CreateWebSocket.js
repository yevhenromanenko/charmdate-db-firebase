
const CreateWebSocket = (loginData) => {
    // console.log(loginData.chatHost, 'loginDatachatHost')
    // console.log(loginData, 'loginData')
    if (loginData) {
        // return new WebSocket(`${loginData.chatHost}/`);
        return new WebSocket(`wss://chat2.charmdate.com:5024/`);
    } else {
        console.log('проблема с loginData', loginData.chatHost)
    }
};

export default CreateWebSocket;
