const state = {
    manIdArray: [],
    inviteIdArray: [],
    userId: null,
};

async function sendTelegramNotification(manId, womanName) {
    let ladyName;
    const telegramBotToken = '6719549462:AAF5UvUrVzUHuW-2jVJ4OI3jFg7-w4CD6YU';
    const chatId = '418687047';
    const telegramApiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

    console.log(womanName, 'womanName')
    if (womanName && womanName.length > 0) {
        ladyName = womanName;
    } else {
        ladyName = state.userId
    }

    const message = `Чат: ${ladyName}-${state.userId} <-> ${manId}!`;

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: message }),
    };

    try {
        await fetch(telegramApiUrl, options);
    } catch (error) {
        console.error('Error sending Telegram notification:', error);
    }
}

async function fetchData(url, options) {
    try {
        const response = await fetch(url, options);
        return await response.text();
    } catch (error) {
        console.error(error);
    }
}

async function playAudio() {
    const audio = new Audio('https://firebasestorage.googleapis.com/v0/b/charmdate-db.appspot.com/o/new_message_tone-1.mp3?alt=media&token=4b2eaec6-57c0-4ef2-ba96-a1d51b29fd5a');

    if (!state.userId) {
        const infoUrl = "https://www.charmdate.com/lady/man/search_info.php";
        const options = {
            method: 'GET',
            headers: {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                "cache-control": "max-age=0",
                "upgrade-insecure-requests": "1"
            },
            referrer: "https://www.charmdate.com/lady/man/search_info.php",
            referrerPolicy: "strict-origin-when-cross-origin",
            mode: "cors",
            credentials: "include"
        };

        const html = await fetchData(infoUrl, options);
        const loginUserIdRegex = /var\s+loginUserId\s*=\s*"([^"]+)"/;
        const loginUserIdMatch = html.match(loginUserIdRegex);

        console.log(loginUserIdMatch, 'loginUserIdMatch')

        state.userId = loginUserIdMatch && loginUserIdMatch.length > 1 ? loginUserIdMatch[1] : null;
    }

    const chatUrl = 'https://www.charmdate.com/clagt/livechat/index.php?action=live';
    const chatOptions = {
        method: 'GET',
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
            'Cache-Control': 'max-age=0',
            'Upgrade-Insecure-Requests': '1'
        },
        mode: 'cors',
        credentials: 'include'
    };

    const chatPage = await fetchData(chatUrl, chatOptions);
    const trRegex = /<tr align="center" bgcolor="#FFFFFF">(.*?)<\/tr>/gs;
    let trMatch;
    let ladyName;

    // Проверяем, есть ли совпадение 'C853966' на странице
    if (chatPage.includes(state.userId)) {
        console.log(state.userId, 'state.userId')
        console.log(state.inviteIdArray, 'state.inviteIdArray')

        while ((trMatch = trRegex.exec(chatPage)) !== null) {
            const [, tdContent] = trMatch;
            const manIdRegex = /men_profile\.php\?manid=([A-Z0-9\s]+)'/;
            const womanIdRegex = /women_preview_profile\.php\?womanid=([A-Z0-9\s]+)'/;
            const inviteIdRegex = /detail\.php\?inviteid=([A-Z0-9-]+)&/;
            const womanNameRegex = /\(\s*([^)]+)\s*\)/;
            const titleRegex = /title="([^"]+)"/;

            const manIdMatch = tdContent.match(manIdRegex);
            const womanIdMatch = tdContent.match(womanIdRegex);
            const inviteIdMatch = tdContent.match(inviteIdRegex);
            const womanNameMatch = tdContent.match(womanNameRegex);
            const titleMatch = tdContent.match(titleRegex);


            if (manIdMatch && womanIdMatch && inviteIdMatch && manIdMatch.length > 1 && womanIdMatch.length > 1 && inviteIdMatch.length > 1) {

                const manId = manIdMatch[1].replace(/\s+/g, '');
                const womanId = womanIdMatch[1].replace(/\s+/g, '');
                const inviteId = inviteIdMatch[1].replace(/\s+/g, '');
                const womanName = womanNameMatch[1];
                const nameFromTitle = titleMatch[1];
                console.log(womanName, 'womanName')
                console.log(nameFromTitle, 'nameFromTitle')

                if (nameFromTitle && nameFromTitle.length > 0) {
                    ladyName = nameFromTitle
                } else {
                    ladyName = null;
                }

                console.log(state.manIdArray, 'state.manIdArray')
                console.log(!state.manIdArray.includes(manId), '!state.manIdArray.includes(manId)')
                console.log(!state.inviteIdArray.includes(inviteId), '!state.inviteIdArray.includes(inviteId)')
                console.log(womanId === state.userId, 'womanId === state.userId');


                if (!state.manIdArray.includes(manId) && !state.inviteIdArray.includes(inviteId) && womanId === state.userId) {

                    state.manIdArray.push(manId);
                    state.inviteIdArray.push(inviteId);
                    await audio.play();

                    // Создаем уведомление
                    chrome.notifications.create({
                        type: 'basic',
                        iconUrl: './48.png', // путь к вашей иконке
                        title: `CharmDate - чат на ${state.userId}`,
                        message: `Повідомлення від ${manId}, натисніть, щоб перейти в чат!`,
                        buttons: [
                            {
                                title: 'Перейти в чат',
                            },
                        ],
                        requireInteraction: true, // Уведомление останется видимым
                    }, (notificationId) => {

                        chrome.notifications.onButtonClicked.addListener((id, buttonIndex) => {
                            if (id === notificationId && buttonIndex === 0) {
                                audio.pause();
                                window.open(`https://www.charmdate.com/livechat/pad/chat-lady.php?manid=${manId}&inviteid=${inviteId}`, '_blank');
                            }
                        });

                        // Обработчик закрытия уведомления
                        chrome.notifications.onClosed.addListener((id, byUser) => {
                            if (id === notificationId && byUser) {
                                chrome.notifications.clear(notificationId); // Очистить уведомление после нажатия
                                // Обработка закрытия уведомления пользователем
                            }
                        });
                        sendTelegramNotification(manId, ladyName);
                    });
                }
            }
        }

    } else {
        // Если нет совпадения C853966, очистить массив
        state.manIdArray.length = 0;
        state.inviteIdArray.length = 0;
    }
}

setInterval(playAudio, 12000);


chrome.browserAction.onClicked.addListener(function(tab) {
    window.open('https://www.charmdate.com/lady/man/search_info.php');
});
