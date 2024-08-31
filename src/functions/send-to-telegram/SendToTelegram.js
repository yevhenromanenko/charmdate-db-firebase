import GetAllDataFromLocalStorage from "../get-all-data-from-local-storage/GetAllDataFromLocalStorage";

async function SendTelegramNotification(manId, loginData, botToken, telegramChatId) {

    // console.log(manId, loginData, botToken, telegramChatId, 'manId, loginData, botToken, telegramChatId')
    let ladyId;
    let ladyPassword;

    const dataFromLocalStorage = GetAllDataFromLocalStorage();
    // console.log(dataFromLocalStorage, 'dataFromLocalStorage')

    if (dataFromLocalStorage) {
        dataFromLocalStorage.map((data) => {
            if (data.ladyId === loginData.loginUserId) {
                ladyId = data.ladyId;
                ladyPassword = data.password;
            }
        });
    }

    const telegramBotToken = botToken;
    const chatId = telegramChatId;

    const telegramApiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

    const message = `CharmDate:\nчат на ${ladyId}!\nповідомлення від ${manId}, перейдіть на сайт https://www.charmdate.com/lady/index.php та зайдіть швидко в чат! \nЛогін: ${ladyId} \nПароль: ${ladyPassword}`;

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

export default SendTelegramNotification;
