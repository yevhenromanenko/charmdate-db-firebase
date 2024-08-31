import React, {useEffect, useState} from "react";
import toggle from "../../../functions/toggle/toggle";

const AddTelegramBot = ({ladyId, setBotToken, setTelegramChatId}) => {

    const [botToken, setLocalBotToken] = useState('');
    const [telegramChatId, setLocalTelegramChatId] = useState('');
    const [tokenConfirmed, setTokenConfirmed] = useState(false);
    const [chatIdConfirmed, setChatIdConfirmed] = useState(false);
    const [showInstruction, setShowInstruction] = useState(false)

    const handleBotTokenChange = (event) => {
        setLocalBotToken(event.target.value);
    };

    const handleTelegramChatIdChange = (event) => {
        setLocalTelegramChatId(event.target.value);
    };

    // Проверка наличия сохраненных данных в локальном хранилище
    useEffect(() => {
        const storedBotToken = localStorage.getItem(`botToken-${ladyId}`);
        const storedTelegramChatId = localStorage.getItem(`telegramChatId-${ladyId}`);

        if (storedBotToken) {
            setTokenConfirmed(true);
            setBotToken(storedBotToken);
        }
        if (storedTelegramChatId) {
            setChatIdConfirmed(true);
            setTelegramChatId(storedTelegramChatId);
        }

    }, [setBotToken, setTelegramChatId, ladyId]);

    const handleSubmitBotToken = () => {
        setBotToken(botToken);
        setLocalBotToken('');
        localStorage.setItem(`botToken-${ladyId}`, botToken);
        setTokenConfirmed(true);
    };

    const handleSubmitTelegramChatId = () => {
        setTelegramChatId(telegramChatId);
        setLocalTelegramChatId('');
        localStorage.setItem(`telegramChatId-${ladyId}`, telegramChatId);
        setChatIdConfirmed(true);
    };

    return (
        <div className={'add-favorite-container'}>
            {tokenConfirmed && chatIdConfirmed ?
            (<p className={'text-user-ids'}>Токен підтверджений! Коли чоловік напише вам у чаті, прийде повідомлення у вашому телеграмі.</p>)
                :
            (<>
                <input
                    style={{margin: '5px'}}
                    className={'add-favorite-input'}
                    type="text"
                    value={botToken}
                    onChange={handleBotTokenChange}
                    placeholder="Bot Token"
                />
                <button className={'add-favorite-button'} onClick={handleSubmitBotToken}>Додати</button>

                <br />
                <input
                    style={{margin: '5px'}}
                    className={'add-favorite-input'}
                    type="text"
                    value={telegramChatId}
                    onChange={handleTelegramChatIdChange}
                    placeholder="Telegram Chat ID"
                />
                <button className={'add-favorite-button'} onClick={handleSubmitTelegramChatId}>Додати</button>
            </>
            )}
            <button className={'show-hide-button-fav'} onClick={toggle(setShowInstruction, showInstruction)}>
                {showInstruction ? 'Інструкція ⬆' : 'Інструкція ⬇'}
            </button>

            {showInstruction && (
                <>
                <div className={'users-ids'}>
                    <p style={{fontSize: '18px'}} className={'text-user-ids'}>Прочитайте уважно інструкцію для того, щоб підвʼязати ваш профайл до телеграму!</p>
                    <br/><p style={{fontSize: '16px'}} className={'text-user-ids'}>Для чого це?</p>
                    <p style={{color: '#e09f3e', fontSize: '14px'}} className={'text-user-ids'}>Це для того, щоб отримати повідомлення про чат навіть коли ви не біля компʼютера. Перевага в тому, що ви можете запустити розсилку і ніколи не вимикати її, навіть, якщо ви не за компʼютером, ви не пропустите чат з чоловіком.</p>
                    <br/><p style={{fontSize: '16px'}} className={'text-user-ids'}>Як це працює?</p>
                    <p style={{color: '#e09f3e', fontSize: '14px'}} className={'text-user-ids'}>За допомогою інструкції нижче, ви привʼязуєте програму до вашого телеграму. Коли буде чат х чоловіком, в телеграмі надійде повідомлення про це.</p>
                    <p style={{color: '#e09f3e', fontSize: '14px'}} className={'text-user-ids'}>Також у повідомленні буде ссилка на сайт, ваш логін та пароль для того, щоб ви швидко могли зайти в чат з телефону через будь-який браузер у вас на телефоні. Якщо ви це зробите на протязі хвилини ви можете продовжити чат з чоловіком з вашого телефону навіть коли ви не біля компʼютера!</p>
                    <p style={{color: '#e09f3e', fontSize: '14px'}} className={'text-user-ids'}>На компʼютері програма повинна зупинити розсилку, а ви продовжите чат з чоловіком у вашому телефоні. Після закінчення чату, підійдіть до компʼютера та просто продовжте розвилку.</p>
                </div>

                <div className={'telegram-info'}>
                    <p style={{marginLeft: '10px'}} className={"info-about"}>Інструкція:</p>
                    <ul style={{fontSize: '14px'}}>
                        <li className={"info-rec"}>- Зайдіть у Telegram та знайдіть бот <a className={'user-item'} href="https://t.me/BotFather" target="_blank">"BotFather"</a>.</li>
                        <li className={"info-rec"}>- Почніть чат з BotFather і використовуйте <span style={{color: '#e09f3e', display: 'inline'}}>/newbot</span>, щоб створити новий бот.</li>
                        <li className={"info-rec"}>- Виконайте вказівки, щоб задати ім'я та ім'я користувача для вашого бота.</li>
                        <li className={"info-rec"}>- Коли бот створений, BotFather надасть вам токен. Збережіть токен; він буде виглядати приблизно так: <span style={{color: '#e09f3e', display: 'inline'}}>1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdef</span>, це буде ваш Bot Token.</li>
                        <li className={"info-rec"}>- Відкрийте Telegram і почніть чат зі своїм щойно створеним ботом. Напишыть йому "hi"</li>
                        <li className={"info-rec"}>- Відкрийте веб-браузер і перейдіть за наступним URL, замініть BOT-TOKEN на ваш реальний токен бота: https://api.telegram.org/botBOT-TOKEN/getUpdates. Це буде виглядати приблизно так: <span style={{color: '#e09f3e', display: 'inline'}}>https://api.telegram.org/bot1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdef/getUpdates</span></li>
                        <li className={"info-rec"}>- Знайдіть схожість з цим: <span style={{color: '#e09f3e', display: 'inline'}}>{`"from";:{"id":123456047,"is_bot":false}`}</span>, те що буде на місті id, тобто "123456047" - це буде ваш Telegram Chat ID</li>
                        <li className={"info-rec"}>- Вводимо "Bot Token" та "Telegram Chat ID" в поля вище та нажимаємо кнопки "Додати"</li>
                    </ul>
                </div>

                <br/><p style={{fontSize: '16px'}} className={'text-user-ids'}>Якщо ви все це зробили, мої ВІТАННЯ, тепер ваше життя стало легче та ви більше не пропустите чат та прибуток ваш стане більший!</p>
                </>
            )}

        </div>
    );
}

export default AddTelegramBot;
