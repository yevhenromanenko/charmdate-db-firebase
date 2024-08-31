import React, {useState} from "react";
import {clearInterval, setInterval} from "worker-timers";
import './PersonalMenOnline.css'
import ReplaceTags from "../../../functions/replace-tags/ReplaceTags";
import CheckForForbiddenTags from "../../../functions/check-for-forbidden-tags/CheckForForbiddenTags";
import GetUserInfo from "../../../functions/get-user-info/GetUserInfo";

const PersonalMenOnline = ({allUsers, myListArray, spamUserIdsRef}) => {

    const [isSending, setIsSending] = useState({});


    const handleStartSending = async (manId) => {

        setIsSending(prevState => ({ ...prevState, [manId]: true }));
        spamUserIdsRef.current = [...spamUserIdsRef.current, manId];
    }

    const handleStopSending = (manId) => {
        console.log('Остановили спам')

        setIsSending(prevState => ({ ...prevState, [manId]: false }));
        spamUserIdsRef.current = spamUserIdsRef.current.filter(id => id !== manId);

    }

    return (
        <>
            <div>
                {allUsers.map((user) => (
                    myListArray.includes(user.id) ?
                    <>
                        <div className={'personal-men'}>
                            <p className={'personal-men-text'}>
                                <a className={'a-calls-personal'} href={`https://www.charmdate.com/clagt/admire/men_profile.php?manid=${user.id}`} target={'_blank'}>{user.id}</a> зараз онлайн{" "}
                                {isSending[user.id] ? (
                                    <button className="do-send-chat" onClick={() => handleStopSending(user.id)}>
                                        Зупинити спам
                                    </button>
                                ) : (
                                    <button className="do-send-chat" onClick={() => handleStartSending(user.id)}>
                                        Спам персональними інвайтами цього чоловіка
                                    </button>
                                )}
                                {/*{isSending ? (*/}
                                {/*    <button className="do-send-chat" onClick={handleStopSending}>Зупинити спам</button>*/}
                                {/*) : (*/}
                                {/*    <button className="do-send-chat" onClick={() => handleStartSending(user.id)}>Спам персональними інвайтами цього чоловіка</button>*/}
                                {/*)}*/}
                                <button className={'do-send-chat'} onClick={() =>  window.open( `https://www.charmdate.com/livechat/pad/chat-lady.php?manid=${user.id}&inviteid=`)}>Chat now</button>
                                <button className={'do-send-chat'} onClick={() => window.open(`https://www.charmdate.com/clagt/admire/men_profile.php?manid=${user.id}`)}>Написати листа</button>
                            </p>
                        </div>
                    </> : null
                ))}
            </div>
        </>

    );
}

export default PersonalMenOnline;
