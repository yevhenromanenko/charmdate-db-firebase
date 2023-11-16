import React, {useEffect, useState} from "react";
import SentLetter from "./SentLetters";
import {BeatLoader} from "react-spinners";
import {override} from "../../../functions/override-css/OverRideCss";
import '../inbox-letter/InboxLetter.scss'

const RenderSendLetter = ({ladyId}) => {
    const [sentLetter, setSentLetter] = useState(null);
    const [showRead, setShowRead] = useState(false);
    const [showUnread, setShowUnread] = useState(false);


    useEffect(() => {
        async function fetchDataAsync() {
            const sent = await SentLetter(ladyId);
            console.log(sent)
            setSentLetter(sent);
        }

        fetchDataAsync();

    }, []);

    const filterReadLetters = (letters) => {
        return letters.filter((letter) => letter.readLetter === 'прочитав');
    };

    // Функция для фильтрации объектов, у которых readLetter не равно 'прочитав'
    const filterUnreadLetters = (letters) => {
        return letters.filter((letter) => letter.readLetter !== 'прочитав');
    };

    const toggle = (setShow, show) => () => {
        setShow(!show);
    };

    return (
        <>
            <div className="inbox-container">
                {(!sentLetter) ? (
                    <div className={'inbox-form'}>
                        <p className={"info-about-inbox"}>Завантаження листів...</p>
                        <BeatLoader css={override} size={15} color={"#ececf1"} />
                    </div>
                ) : (
                <>
                <p style={{color: '#ececf1'}} className={'info-email-form-mass'}>Надіслані листи від {ladyId} за останні 3 місяці!</p>


                    <button style={{marginLeft: '10px'}} className={'show-hide-button-mass'} onClick={toggle(setShowRead, showRead)}>
                        {showRead ? `Прочитані ⬆` : `Прочитані ⬇`}
                    </button>

                    <button style={{marginLeft: '10px'}} className={'show-hide-button-mass'} onClick={toggle(setShowUnread, showUnread)}>
                        {showUnread ? `Не прочитані ⬆` : `Не прочитані ⬇`}
                    </button>

                    {showRead && (
                        <>
                            <div className={'sent-letters'}>
                                {filterReadLetters(sentLetter).map((letter) => (
                                    <>
                                        <div className="inbox-item" key={letter.messageId}>
                                            <p className={"info-about-inbox"}>
                                                <a
                                                    className={'link-to-detail-sent'}
                                                    href={`https://www.charmdate.com/clagt/admire/men_profile.php?manid=${letter.manId}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {letter.manId}
                                                </a>
                                                {' '}{letter.readLetter}{' '}лист{' '}
                                                <a
                                                    className={'link-to-detail-sent'}
                                                    href={`https://www.charmdate.com/clagt/wm_emf_agt01.php?messageid=${letter.messageId}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {letter.messageId}
                                                </a>
                                                {', який було відправлено '}<span className={'link-to-detail-sent'}>{letter.lastSentDate}</span>{' назад '}
                                            </p>
                                            {/*https://www.charmdate.com/clagt/emf_sender2.php?manid=${letter.manId}&womanid=${letter.womenId}*/}
                                            <button style={{marginRight: '40%'}} className={'answer-button'} onClick={() => window.open(`https://www.charmdate.com/clagt/admire/men_profile.php?manid=${letter.manId}`)}>Написати</button>
                                        </div>
                                    </>
                                ))}
                            </div>
                        </>
                    )}

                    {showUnread && (
                        <>
                            <div className={'users-ids'}>
                                {filterUnreadLetters(sentLetter).map((letter) => (
                                    <>
                                        <div className="inbox-item" key={letter.messageId}>
                                            <p className={"info-about-inbox"}>
                                                <a
                                                    className={'link-to-detail-sent'}
                                                    href={`https://www.charmdate.com/clagt/admire/men_profile.php?manid=${letter.manId}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {letter.manId}
                                                </a>
                                                {' '}{letter.readLetter}{' '}лист{' '}
                                                <a
                                                    className={'link-to-detail-sent'}
                                                    href={`https://www.charmdate.com/clagt/wm_emf_agt01.php?messageid=${letter.messageId}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {letter.messageId}
                                                </a>
                                                {', який було відправлено '}<span className={'link-to-detail-sent'}>{letter.lastSentDate}</span>{' назад'}
                                                <button style={{marginRight: '35%', marginLeft: 'auto'}} className={'answer-button'} onClick={() => window.open(`https://www.charmdate.com/clagt/admire/men_profile.php?manid=${letter.manId}`)}>Написати</button>
                                            </p>
                                        </div>
                                    </>
                                ))}
                            </div>
                        </>
                    )}
                </>
            )}
            </div>
        </>
    )
}

export default RenderSendLetter;

// добавить этот запрос на просмотр отправленных sayHi
//
// fetch("https://www.charmdate.com/clagt/cupidnote/approved_replies.php", {
//   "headers": {
//     "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
//     "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
//     "cache-control": "max-age=0",
//     "sec-ch-ua": "\"Chromium\";v=\"118\", \"Google Chrome\";v=\"118\", \"Not=A?Brand\";v=\"99\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"macOS\"",
//     "sec-fetch-dest": "document",
//     "sec-fetch-mode": "navigate",
//     "sec-fetch-site": "same-origin",
//     "sec-fetch-user": "?1",
//     "upgrade-insecure-requests": "1"
//   },
//   "referrer": "https://www.charmdate.com/clagt/cupidnote/recommend_resubmit.php",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": null,
//   "method": "GET",
//   "mode": "cors",
//   "credentials": "include"
// });
//  можешь переделать на axios
// найди совпадения по
// <tr align="center" bgcolor="#FFFFFF">
//               <td>1</td>
//               <td>2023-10-26 06:13</td>
//               <td>2023-10-28 02:35</td>
//               <td align="left">&nbsp;
//                 &nbsp; <a href="javascript:Show('./view_reply.php?rid=HBHFFBAJ')">Stasia C206042 -- Tim CM67083527</a>
//                                                               </td>
//               <td>Sent</td>
//             </tr>
// запиши в переменные
// msgid = HBHFFBAJ
// ladyId = C206042
// manId = CM67083527
// sentDate = 2023-10-28 02:35

//  перебрать все страницы и найти совпадения по айди
