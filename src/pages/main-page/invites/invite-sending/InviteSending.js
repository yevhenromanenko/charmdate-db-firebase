import React, {useEffect, useRef, useState} from "react";
import './InviteSending.scss'
import StartSendingInvites from "../start-sending-invites/StartSendingInvites";
import StopSendingInvites from "../stop-sending-invites/StopSendingInvites";
import GetWordEnding from "../../../../functions/get-word-ending/GetWordEnding";
import {BeatLoader} from "react-spinners";
import {override} from "../../../../functions/override-css/OverRideCss";
import UseLocalStorage from "../../use-local-storage/UseLocalStorage";
import Checkbox from "../../../../functions/checkbox/Checkbox";

const InviteSending = ({loginData, setErrorMessage, invites, err, setPersonalListArray, personalListArray, personalListArrayRef, setErr, idsViewManList, chat, setChat, setMessage, setLog, log, isSending, setIsSending, setStartChat, invitesPersonal, invitesCamshare, startChat, banUsers, message}) => {

    const socket = useRef({});
    const [isConnectSocket, setIsConnectSocket] = useState(false);
    const [myListArray, setMyListArray] = useState([]);
    const myListArrayRef = useRef(myListArray);
    const whoViewProfile = useRef([]);
    const whoGetAnswer = useRef([]);

    const [hasSentCmd98, setHasSentCmd98] = useState(false);
    const hasSentCmd98Ref = useRef(hasSentCmd98);

    const [sendInvite, setSendInvite] = useState(true);
    const sendInviteRef = useRef(sendInvite);

    const [checkCamshareInvite, setCheckCamshareInvite] = useState(false); // State для галочки
    const [getAnswerFromMan, setGetAnswerFromMan] = useState(false); // State для галочки

    const [countInvite, setCountInvite] = UseLocalStorage("todayCountInvite", 0);
    const [messageInterval, setMessageInterval] = useState(null);
    const [lastSavedDate, setLastSavedDate] = UseLocalStorage("lastSavedDateInvite", new Date().toISOString().slice(0, 10));

    const [startSendingTimeout, setStartSendingTimeout] = useState(null);
    const [shouldStartSendingAutomatically, setShouldStartSendingAutomatically] = useState(true);
    const [reconnect, setReconnect] = useState(true);

    const onCamshareInviteChange = (e) => {
        setCheckCamshareInvite(e.target.checked);
    }

    const handleStartSending = async () => {
        setSendInvite(true);
        setShouldStartSendingAutomatically(false); // Нажатие на кнопку - отключаем автозапуск
        setReconnect(true);
        await StartSendingInvites(whoViewProfile, whoGetAnswer, myListArray, isSending, socket, loginData, setErrorMessage, setIsConnectSocket, invites, setMyListArray, setIsSending, myListArrayRef, setMessageInterval, setCountInvite, setPersonalListArray, personalListArrayRef, setErr, isConnectSocket, setChat, setMessage, setLog, log, setStartChat, lastSavedDate, setLastSavedDate, invitesPersonal, invitesCamshare, checkCamshareInvite, startChat, banUsers, getAnswerFromMan, setGetAnswerFromMan, setReconnect, sendInviteRef, setSendInvite, hasSentCmd98, setHasSentCmd98, hasSentCmd98Ref);

    };

    const handleStopSending = () => {
        StopSendingInvites(socket, messageInterval, setIsSending, setMessageInterval, setIsConnectSocket, setErrorMessage, setShouldStartSendingAutomatically);
        setReconnect(false);
        setSendInvite(false);
        setHasSentCmd98(false);
        clearInterval(startSendingTimeout);
    };

    useEffect(() => {
        if (shouldStartSendingAutomatically === true) {
            const startSendingAutomatically = () => {
                if (shouldStartSendingAutomatically === true && invites.length > 0 && !isSending && startChat === false) {
                    handleStartSending();
                }
            };

            const timeout = setInterval(startSendingAutomatically, 5000);
            setStartSendingTimeout(prevTimeout => {
                if (prevTimeout) {
                    clearInterval(prevTimeout);
                }
                return timeout;
            });
            return () => {
                clearInterval(timeout);
            };
        }
    }, [isSending, shouldStartSendingAutomatically, invites]);

    useEffect(() => {

        if (reconnect === true) {
            if (startChat === false && message.length === 0) {
                const interval = setInterval(() => {
                    /* eslint-disable no-restricted-globals */
                    location.reload();
                    /* eslint-enable no-restricted-globals */
                }, 480000); // Обновление страницы каждые 280 секунд

                return () => clearInterval(interval); // Очистка интервала при размонтировании компонента
            }
        }
    }, [reconnect]);

    useEffect(() => {
        sendInviteRef.current = sendInvite;
    }, [sendInvite]);

    useEffect(() => {
        hasSentCmd98Ref.current = hasSentCmd98;
    }, [hasSentCmd98]);

    // useEffect(() => {
    //         const interval = setInterval(() => {
    //                 socket.current?.send('{"cmd":911}');
    //         }, 7 * 1000);
    //         return () => clearInterval(interval);
    // }, []);

    // useEffect(() => {
    //
    //         const intervalId = setInterval(async () => {
    //                 console.log(loginData.loginUserId, 'loginData.loginUserId')
    //                 await GetViewManList(loginData.loginUserId, setIdsViewManList);
    //         }, 11000);
    //
    //         // Очистка интервала при размонтировании компонента
    //         return () => clearInterval(intervalId);
    // }, []);

    return (
        <>
            <div className="invites-container">

                { invites.length === 0 ?
                    <>
                        <div className={'letter-form'}>
                            <BeatLoader css={override} size={15} color={"#ececf1"} loading={invites.length === 0} />
                        </div>
                    </> :
                    <>
                        {!isSending && <p className="online-users-info">Можно починати відправку інвайтів! Відправка зупинена</p>}
                        {isSending && <p className="online-users-info">Відправка увімкнена! Онлайн: {myListArray.length} {GetWordEnding(myListArray.length)}, постояльці: {personalListArray.length}, подивились: {idsViewManList.length}</p>}
                    </>
                }

                {isSending ? (
                    <button className="start-stop-button" onClick={handleStopSending}>Зупинити розсилку</button>
                ) : (
                    <button className="start-stop-button" onClick={handleStartSending}>Почати розсилку</button>
                )}
                <Checkbox
                    checkCamshareInvite={checkCamshareInvite}
                    onCamshareInviteChange={onCamshareInviteChange}
                />
                <p className="today-count-info">Надіслано сьогодні: {countInvite}, помилки: {err}, чат: {chat}</p>
            </div>
        </>
    )
}

export default InviteSending;
