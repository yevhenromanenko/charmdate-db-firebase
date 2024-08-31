import React, {useEffect, useRef, useState} from "react";
import './MainPage.scss'
import GetLoginData from "../../functions/get-login-data/GetLoginData";
import GetInvites from "./invites/get-invites/GetInvites";
import AddedInvites from "./invites/added-invites/AddedInvites";
import InviteSending from "./invites/invite-sending/InviteSending";
import GetViewManList from "./invites/get-view-man-list/GetViewManList";
import Log from "./invites/log/Log";
import LoginAdmin from "../../functions/LoginAdmin/LoginAdmin";
import MakeRefresh from "./refresh/Refresh";
import MassLetterFinishDate from "../letters/mass-letter/mass-letter-finish-date/MassLetterFinishDate";
import AddFavorite from "./add-favorite/add-favorite/AddFavorite";
import GetFavorite from "./add-favorite/add-favorite/get-favorite/GetFavorite";
import LoginPassToLocalStorage from "../../functions/login-pass-to-local-storage/LoginPassToLocalStorage";
import PersonalMenOnline from "./personal-men-online/PersonalMenOnline";
import AddTelegramBot from "./add-telegram-bot/AddTelegramBot";
import AdmireMailFinishDate from "./admire-mail/finish-date/AdmireMailFinishDate";

const MainPage = ({chat, setChat, setLogin, ladyIdsYevhen, ladyIdsViktor, login, adminId, staffId, pass, ladyIdsViktorC2135, ladyIdsViktorC1337, setBanUsers, banUsers, idLady}) => {

    const [loginData, setLoginData] = useState({});
    const [invites, setInvites] = useState([]);
    const [invitesOnConfirmation, setInvitesOnConfirmation] = useState([]);
    const [invitesRejected, setInvitesRejected] = useState([]);

    const [invitesPersonal, setInvitesPersonal] = useState([]);
    const [invitesCamshare, setInvitesCamshare] = useState([]);
    const [myListArray, setMyListArray] = useState([]);
    const myListArrayRef = useRef(myListArray);
    const socket = useRef({});
    const spamUserIdsRef = useRef([]);

    const [countInvitesOnConfirmation, setCountInvitesOnConfirmation] = useState(0);
    const [countInvites, setCountInvites] = useState(0);
    const [countRejected, setCountRejected] = useState(0);

    const [allUsers, setAllUsers] = useState([]);

    const [botToken, setBotToken] = useState(localStorage.getItem(`botToken-${idLady}`) || null);
    const [telegramChatId, setTelegramChatId] = useState(localStorage.getItem(`telegramChatId-${idLady}`) || null);

    const [err, setErr] = useState(0);
    const [log, setLog] = useState([]);
    const [isSending, setIsSending] = useState(false);
    const [startChat, setStartChat] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const [personalListArray, setPersonalListArray] = useState([]);
    const personalListArrayRef = useRef(personalListArray);

    const [idsViewManList, setIdsViewManList] = useState([]);
    const [message, setMessage] = useState([]);

    const [ladyId, setLadyId] = useState(null);

    useEffect(() => {
        async function fetchDataAsync() {
            try {
                const loginData = await GetLoginData();
                setLoginData(loginData)
                setLadyId(loginData.loginUserId);

                await GetInvites(loginData, setInvites, setInvitesCamshare, setCountInvitesOnConfirmation, setCountInvites, setInvitesOnConfirmation, setInvitesRejected, setCountRejected);
                await GetViewManList(loginData.loginUserId, setIdsViewManList);
                await MakeRefresh(loginData.loginUserId);

                if (loginData.loginUserId.length > 0) {
                    if (ladyIdsYevhen.includes(loginData.loginUserId)) {
                        adminId = 'C2436';
                        staffId = 'S64345';
                        pass = '66321005510002';
                        await LoginAdmin(login, setLogin, adminId, staffId, pass)

                    } else if (ladyIdsViktor.includes(loginData.loginUserId)) {
                        adminId = 'C1618';
                        staffId = 'S61636';
                        pass = '8695867001';
                        await LoginAdmin(login, setLogin, adminId, staffId, pass)
                    } else if (ladyIdsViktorC2135.includes(loginData.loginUserId)) {
                        adminId = 'C2135';
                        staffId = 'S63210';
                        pass = 'FNjr8512lJ';
                        await LoginAdmin(login, setLogin, adminId, staffId, pass)
                    } else if (ladyIdsViktorC1337.includes(loginData.loginUserId)) {
                        adminId = 'C1337';
                        staffId = 'S60729';
                        pass = 'htj512Hr291';
                        await LoginAdmin(login, setLogin, adminId, staffId, pass)
                    }
                }

                await LoginPassToLocalStorage(loginData.loginUserId)

            } catch (error) {
                // Обработка ошибки
                console.error(error);
            }
        }

        fetchDataAsync();

        const intervalId = setInterval(async () => {
            const loginData = await GetLoginData();
            await GetViewManList(loginData.loginUserId, setIdsViewManList);
        }, 11000);


        // Очистка интервала при размонтировании компонента
        return () => clearInterval(intervalId);

    }, []);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         socket.current?.send('{"cmd":911}');
    //     }, 7 * 1000);
    //     return () => clearInterval(interval);
    // }, []);

    const handleContinueButtonClick = () => {
        setStartChat(false);
    };

    useEffect(() => {
        // GetBanUsers(setBanUsers, ladyId)
        GetFavorite(setAllUsers, ladyId, personalListArray);
    }, [ladyId, personalListArray]);

    return (
        <>
            {startChat ? (
                <>
                <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '9998' }}></div>
                <div style={{ fontSize: '14px', color: '#ececf1', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '16px', backgroundColor: '#444654', border: '1px solid #ececf1', borderRadius: '5px', zIndex: '9999' }}>
                    <p>Почався чат або був вхід з іншого пристрою. Натисніть "Продовжити розсилку" після того, як чат закінчиться та почніть розсилку заново або "Закрити сайт" для того, щоб вийти та не заважати іншому користувачу!</p>
                    <button
                        style={{
                            backgroundColor: "#444654",
                            color: "#ececf1",
                            border: "1px solid #ececf1",
                            padding: "10px 20px",
                            cursor: "pointer",
                            borderRadius: "5px"
                        }}
                        onClick={handleContinueButtonClick}>Продовжити розсилку</button>
                    <button
                        style={{
                            marginLeft: '10px',
                            backgroundColor: "#444654",
                            color: "#ececf1",
                            border: "1px solid #ececf1",
                            padding: "10px 20px",
                            cursor: "pointer",
                            borderRadius: "5px"
                        }}
                        onClick={() => window.close()}>Закрити сайт</button>
                    <button
                        style={{
                            marginLeft: '10px',
                            backgroundColor: "#444654",
                            color: "#ececf1",
                            border: "1px solid #ececf1",
                            padding: "10px 20px",
                            cursor: "pointer",
                            borderRadius: "5px"
                        }}
                        onClick={() => window.open('https://www.charmdate.com/clagt/livechat/index.php?action=live')}>Переглянути чат</button>

                </div>
                </>
            ) : (
                <>
                    {message.length > 0 && (
                        <>
                            {message.map((msg, index) => (
                                <p key={index} className="auto-answer-message">
                                    {msg}
                                </p>
                            ))}
                        </>
                    )}
                </>
            )}

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <div>
                <AdmireMailFinishDate/>
            </div>
            <div className={'main-page'} >
                <div className={'left-part'}>
                    <AddedInvites
                        invites={invites}
                        invitesOnConfirmation={invitesOnConfirmation}
                        invitesRejected={invitesRejected}
                        setInvites={setInvites}
                        loginData={loginData}
                        invitesPersonal={invitesPersonal}
                        setInvitesPersonal={setInvitesPersonal}
                        invitesCamshare={invitesCamshare}
                        setInvitesCamshare={setInvitesCamshare}
                        countInvites={countInvites}
                        countInvitesOnConfirmation={countInvitesOnConfirmation}
                        countRejected={countRejected}
                    />
                </div>

                <div className={'right-part'} >
                    <InviteSending
                        loginData={loginData}
                        setErrorMessage={setErrorMessage}
                        invites={invites}
                        err={err}
                        setPersonalListArray={setPersonalListArray}
                        personalListArray={personalListArray}
                        personalListArrayRef={personalListArrayRef}
                        setErr={setErr}
                        idsViewManList={idsViewManList}
                        chat={chat}
                        setChat={setChat}
                        setMessage={setMessage}
                        setLog={setLog}
                        log={log}
                        isSending={isSending}
                        setIsSending={setIsSending}
                        setStartChat={setStartChat}
                        invitesPersonal={invitesPersonal}
                        invitesCamshare={invitesCamshare}
                        startChat={startChat}
                        banUsers={banUsers}
                        message={message}
                        myListArray={myListArray}
                        setMyListArray={setMyListArray}
                        myListArrayRef={myListArrayRef}
                        socket={socket}
                        spamUserIdsRef={spamUserIdsRef}
                        telegramChatId={telegramChatId}
                        botToken={botToken}
                    />
                </div>

                <div className={'right-part-down'} >
                    <Log log={log}/>
                </div>

            </div>
            <div>
                <AddTelegramBot
                    setBotToken={setBotToken}
                    setTelegramChatId={setTelegramChatId}
                    ladyId={ladyId}
                />
            </div>
            <div>
                <AddFavorite
                    ladyId={ladyId}
                    allUsers={allUsers}
                    setAllUsers={setAllUsers}
                    setBanUsers={setBanUsers}
                    banUsers={banUsers}
                />
            </div>
            <div>
                <MassLetterFinishDate/>
            </div>
            <div style={{marginBottom: "2%"}}>
                <PersonalMenOnline
                    allUsers={allUsers}
                    myListArray={myListArray}
                    spamUserIdsRef={spamUserIdsRef}
                />
            </div>
        </>
    )
}

export default MainPage;

