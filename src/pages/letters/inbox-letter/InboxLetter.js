import FirstEmf from "./first-emf/FirstEmf";
import GenerateRandomNonce from "../../../functions/generate-random-nonce/GenerateRandomNonce";
import React, {useEffect, useState} from "react";
import GetLoginData from "../../../functions/get-login-data/GetLoginData";
import './InboxLetter.scss'
import {BeatLoader} from "react-spinners";
import {override} from "../../../functions/override-css/OverRideCss";
import EmfMail from "./emf-mail/EmfMail";
import SayHi from "./say-hi/SayHi";
import GetTelNumber from "../../../functions/get-tel-number/GetTelNumber";
import VideoRequest from "./video-request/VideoRequest";
import BPMail from "./bp-letter/BPMail";

const InboxLetter = () => {

    const [data, setData] = useState(null);
    const [emf, setEmf] = useState(null);
    const [sayHi, setSayHi] = useState(null);
    const [bpMail, setBPMail] = useState(null);
    const [videoRequest, setVideoRequest] = useState(null);
    const [ladyId, setLadyId] = useState(null);
    const [telNumber, setTelNumber] = useState(null);

    useEffect(() => {
        async function fetchDataAsync() {
            try {
                const loginData = await GetLoginData();
                const randomNonce = GenerateRandomNonce();

                const url = `https://www.charmdate.com/clagt/first_emf.php?groupshow=4&womanid=${loginData.loginUserId}&sentMail=not_yet&rnd=${randomNonce}`;
                const results = await FirstEmf(url);

                const urlEmfMail = `https://www.charmdate.com/clagt/emf_men_women_unprinted.php?groupshow=4&rnd=${randomNonce}`
                const EMF = await EmfMail(urlEmfMail, loginData.loginUserId);

                const urlSayHi = `https://www.charmdate.com/clagt/cupidnote/index.php?rnd=${randomNonce}`;
                const sayHi = await SayHi(urlSayHi, loginData.loginUserId);

                const urlBP = `https://www.charmdate.com/clagt/emf_men_women_unprinted_integral.php?groupshow=4&rnd=${randomNonce}`;
                const bpMail = await BPMail(urlBP, loginData.loginUserId);

                const videoReqUrl = `https://www.charmdate.com/clagt/videoshow/access_key_request_new.php?groupshow=4&searchWomanId=${loginData.loginUserId}&rnd=${randomNonce}`;
                const videoReq = await VideoRequest(videoReqUrl);

                const urlLady = `https://www.charmdate.com/clagt/woman/women_preview_profile.php?womanid=${loginData.loginUserId}`;
                const telNumber = await GetTelNumber(urlLady);

                setLadyId(loginData.loginUserId);
                setTelNumber(telNumber)
                setSayHi(sayHi);
                setBPMail(bpMail);
                setEmf(EMF);
                setData(results);
                setVideoRequest(videoReq)

                const length = sayHi.length + bpMail.length + EMF.length + results.firstChat.length + results.keyRequest.length + videoReq.length;

                localStorage.setItem('inboxLength', length.toString());

            } catch (error) {
                console.error("Error:", error);
            }
        }

        fetchDataAsync();

    }, []);

    const sendFirst = async (manId, womanId) => {
        try {
            window.open(`https://www.charmdate.com/clagt/emf_sender2.php?manid=${manId}&womanid=${womanId}`, '_blank')
        } catch (error) {
            console.error(error);
        }
    }

    const bp = async (reply, mainId, womanId) => {
        const reply_id = `${reply}`;
        const message_id = `${reply}`;
        const reply_flag = "yes";
        const woman_id = `${womanId}`;
        const man_id = `${mainId}`;
        const orig_progress = "3";

        const url = `https://www.charmdate.com/clagt/emf_sender2.php?c=1&reply_id=${reply_id}&messageid=${message_id}&reply_flag=${reply_flag}&womanid=${woman_id}&manid=${man_id}&orig_progress=${orig_progress}`;
        window.open(url, '_blank')
    }

    return (
        <>
            <div className="inbox-container">
                {(!emf || !sayHi || !bpMail || !videoRequest || !data) ? (
                    <div className={'inbox-form'}>
                        <p className={"info-about-inbox"}>Завантаження листів від чоловіків...</p>
                        <BeatLoader css={override} size={15} color={"#ececf1"} />
                    </div>
                ) : (
                    <>
                        {(emf.length > 0 || sayHi.length > 0 || bpMail.length > 0 || videoRequest.length > 0 || (data.firstChat.length > 0 || data.keyRequest.length > 0)) ? (
                            <div className="inbox-letter-container">
                                {/* Render EMF items */}
                                {emf.length > 0 && (
                                    <div>
                                        {emf.map((mail) => (
                                            <div className="inbox-item" key={mail.data}>
                                                <p className={"info-about-inbox"}>Лист від{' '}
                                                    <a
                                                        className={'link-to-detail'}
                                                        href={`https://www.charmdate.com/clagt/admire/men_profile.php?manid=${mail.manId}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {mail.manName} - {mail.manId}
                                                    </a>
                                                </p>
                                                <button className="answer-button" onClick={() => window.open(`https://www.charmdate.com/clagt/mw_emf_agt.php?messageid=${mail.messageId}&ids=${mail.messageId}&manid=${mail.manId}&act=reply-emf`, '_blank')}>Відповісти</button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Render Say Hi items */}
                                {sayHi.length > 0 && (
                                    <div>
                                        {sayHi.map((mail) => (
                                            <div className="inbox-item" key={mail.date}>
                                                <p className={"info-about-inbox"}>"Say Hi" від{' '}
                                                    <a
                                                        className={'link-to-detail'}
                                                        href={`https://www.charmdate.com/clagt/admire/men_profile.php?manid=${mail.manId}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {mail.manName} - {mail.manId}
                                                    </a>
                                                </p>
                                                <button className="answer-button" onClick={() => window.open(`https://www.charmdate.com/clagt/cupidnote/reply2.php?noteid=${mail.responseId}`, '_blank')}>Відповісти</button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Render BP items */}
                                {bpMail.length > 0 && (
                                    <div>
                                        {bpMail.map((mail) => (
                                            <div className="inbox-item" key={mail.date}>
                                                <p className={"info-about-inbox"}>"Bonus Point Mail" від{' '}
                                                    <a
                                                        className={'link-to-detail'}
                                                        href={`https://www.charmdate.com/clagt/admire/men_profile.php?manid=${mail.manId}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {mail.manName} - {mail.manId}
                                                    </a>
                                                </p>
                                                <button className="answer-button" onClick={() => bp(mail.responseId, mail.manId, mail.womanId)}>Відповісти</button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Render Video Request items */}
                                {videoRequest.length > 0 && (
                                    <div>
                                        {videoRequest.map((request) => (
                                            <div className="inbox-item" key={request.requestId}>
                                                <p className={"info-about-inbox"}>Запит на{" "}
                                                    <a
                                                        className={'link-to-detail'}
                                                        href={`https://www.charmdate.com/clagt/videoshow/access_key_request_detail.php?type=new&request_id=${request.requestId}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        відео{" "}
                                                    </a>
                                                    від{" "}
                                                    <a
                                                        className={'link-to-detail'}
                                                        href={`https://www.charmdate.com/clagt/admire/men_profile.php?manid=${request.manId}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {request.manId}
                                                    </a>
                                                </p>
                                                <button className="answer-button" onClick={() => window.open(`https://www.charmdate.com/clagt/emf_sender2.php?access_key_request_id=${request.requestId}&manid=${request.manId}&womanid=${request.womenId}`)}>Відповісти</button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Render First Chat and Key Request items */}
                                {data.firstChat.length > 0 && (
                                    <div>
                                        {data.firstChat.map((chat) => (
                                            <div className="inbox-item" key={chat.inviteId}>
                                                <p className={"info-about-inbox"}>Перший лист після{' '}
                                                    <a
                                                        className={'link-to-detail'}
                                                        href={`https://www.charmdate.com/clagt/livechat/detail.php?v=close&inviteid=${chat.inviteId}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        чату
                                                    </a>
                                                    {' '}з{' '}
                                                    <a
                                                        className={'link-to-detail'}
                                                        href={`https://www.charmdate.com/clagt/admire/men_profile.php?manid=${chat.manId}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {chat.manId}
                                                    </a>
                                                </p>
                                                <button className="answer-button" onClick={() => sendFirst(chat.manId, chat.womanId)}>Відповісти</button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {data.keyRequest.length > 0 && (
                                    <div>
                                        {data.keyRequest.map((request) => (
                                            <div className="inbox-item" key={request.requestId}>
                                                <p className={"info-about-inbox"}>Перший лист після{" "}
                                                    <a
                                                        className={'link-to-detail'}
                                                        href={`https://www.charmdate.com/clagt/videoshow/access_key_request_detail.php?type=replied&request_id=${request.requestId}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        чату
                                                    </a>
                                                    {' '}з{' '}
                                                    <a
                                                        className={'link-to-detail'}
                                                        href={`https://www.charmdate.com/clagt/admire/men_profile.php?manid=${request.manId}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {request.manId} - {request.manName}
                                                    </a>
                                                </p>
                                                <button className="answer-button" onClick={() => sendFirst(request.manId, request.womanId)}>Відповісти</button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <p className={"info-about-inbox"}>Листів не знайдено!</p>
                        )}
                    </>
                )}
            </div>
        </>
    );

}

export default InboxLetter;

