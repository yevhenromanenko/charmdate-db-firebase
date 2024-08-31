import axios from "axios";

const CheckOnlineStatus = async (womanId) => {
    const onlineStatusUrl = "https://www.charmdate.com/clagt/livechat/lady_online.php";

    try {
        const response = await axios.get(onlineStatusUrl, {
            headers: {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                "cache-control": "max-age=0",
                "upgrade-insecure-requests": "1"
            },
            referrer: "https://www.charmdate.com/clagt/livechat/index.php?action=live",
            referrerPolicy: "strict-origin-when-cross-origin",
            credentials: "include"
        });

        // Check if womanId is present in the response
        const isOnline = response.data.includes(womanId);
        return isOnline ? '1' : '0';
    } catch (error) {
        console.error('Error checking online status:', error);
        return '0'; // Assuming offline if there's an error
    }
}

export default CheckOnlineStatus;
