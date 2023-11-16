
function GetManId(setReplyId) {
    const currentUrl = window.location.href;
    let manId;

    const regex = /noteid=([A-Z0-9-]+)-\d+/;
    const replyId = currentUrl.split('noteid=')[1];
    const keyRequest = currentUrl.split('access_key_request_id=')[1];
    const messageId = currentUrl.split('messageid=')[1];

    manId = currentUrl.split('manid=')[1];

    if (replyId) {
        setReplyId(replyId);
    } else if (keyRequest) {
        const keyR = keyRequest.split('&')[0]
        setReplyId(keyR);
    } else if (messageId) {
        const message = messageId.split('&')[0]
        manId = currentUrl.split('manid=')[2];
        setReplyId(message);
        if (manId) {
            const id = manId.split('&')[0]
            return id;
        } else {
            return null;
        }
    }

    if (replyId) {
        const match = currentUrl.match(regex);
        if (match && match[1]) {
            return match[1];
        } else {
            return null;
        }
    } else {
        if (manId) {
            const id = manId.split('&')[0]
            return id;
        } else {
            return null;
        }
    }

}

export default GetManId;
