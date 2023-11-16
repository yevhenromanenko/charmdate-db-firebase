const state = {
    manIdArray: [],
    inviteIdArray: [],
    userId: null,
};

async function fetchData(url, options) {
    try {
        const response = await fetch(url, options);
        return await response.text();
    } catch (error) {
        console.error(error);
    }
}

async function playAudio() {
    const audio = new Audio('https://soulmate-agency.com/findapp/sound/test');

    console.log(state.userId, 'state.userId')
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

        state.userId = loginUserIdMatch && loginUserIdMatch.length > 1 ? loginUserIdMatch[1] : null;
    }
    console.log(state.userId, 'state.userId2')

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

    // Проверяем, есть ли совпадение 'C853966' на странице
    if (chatPage.includes(state.userId)) {
        console.log(state.inviteIdArray, 'state.inviteIdArray')

        while ((trMatch = trRegex.exec(chatPage)) !== null) {
            const [, tdContent] = trMatch;
            const manIdRegex = /men_profile\.php\?manid=([A-Z0-9\s]+)'/;
            const womanIdRegex = /women_preview_profile\.php\?womanid=([A-Z0-9\s]+)'/;
            const inviteIdRegex = /detail\.php\?inviteid=([A-Z0-9-]+)&/;

            const manIdMatch = tdContent.match(manIdRegex);
            const womanIdMatch = tdContent.match(womanIdRegex);
            const inviteIdMatch = tdContent.match(inviteIdRegex);

            if (manIdMatch && womanIdMatch && inviteIdMatch && manIdMatch.length > 1 && womanIdMatch.length > 1 && inviteIdMatch.length > 1) {
                const manId = manIdMatch[1].replace(/\s+/g, '');
                const womanId = womanIdMatch[1].replace(/\s+/g, '');
                const inviteId = inviteIdMatch[1].replace(/\s+/g, '');

                console.log(state.manIdArray, 'state.manIdArray')


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
                    });

                    // chrome.tabs.query({}, function(tabs) {
                    //     // Находим вкладку по URL или другим критериям
                    //     const tabToActivate = tabs.find(tab => tab.url === 'https://www.charmdate.com');
                    //     console.log(tabToActivate, 'tabToActivate')
                    //
                    //     // Если нашлась вкладка
                    //     if (tabToActivate) {
                    //         console.log('сделали активной?')
                    //         // Выбираем вкладку
                    //         chrome.tabs.update(tabToActivate.id, { active: true });
                    //     }
                    // });
                }

                // Use manId, womanId, and inviteId as needed in your logic
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
