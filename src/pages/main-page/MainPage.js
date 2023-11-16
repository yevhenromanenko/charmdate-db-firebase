import React, {useEffect, useRef, useState} from "react";
import './MainPage.scss'
import GetLoginData from "../../functions/get-login-data/GetLoginData";
import GetInvites from "./invites/get-invites/GetInvites";
import AddedInvites from "./invites/added-invites/AddedInvites";
import InviteSending from "./invites/invite-sending/InviteSending";
import GetViewManList from "./invites/get-view-man-list/GetViewManList";
import Log from "./invites/log/Log";
import AdmireMail from "./admire-mail/AdmireMail";
import RenderAdmireMail from "./admire-mail/RenderAdmireMail";
import LoginAdmin from "../../functions/LoginAdmin/LoginAdmin";
import MakeRefresh from "./refresh/Refresh";
import MassLetterFinishDate from "../letters/mass-letter/mass-letter-finish-date/MassLetterFinishDate";
import AddFavorite from "./add-favorite/add-favorite/AddFavorite";
import GetFavorite from "./add-favorite/add-favorite/get-favorite/GetFavorite";
import LoginPassToLocalStorage from "../../functions/login-pass-to-local-storage/LoginPassToLocalStorage";

const MainPage = ({chat, setChat, setLogin, ladyIdsYevhen, ladyIdsViktor, login, adminId, staffId, pass, ladyIdsViktorC2135, ladyIdsViktorC1337, setBanUsers, banUsers}) => {

    const [loginData, setLoginData] = useState({});
    const [invites, setInvites] = useState([]);
    const [invitesPersonal, setInvitesPersonal] = useState([]);
    const [invitesCamshare, setInvitesCamshare] = useState([]);
    const [admire, setAdmire] = useState([]);

    const [allUsers, setAllUsers] = useState([]);

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

                await GetInvites(loginData, setInvites, setInvitesCamshare);
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
                    } else if (ladyIdsViktorC2135.include(loginData.loginUserId)) {
                        adminId = 'C2135';
                        staffId = 'S63210';
                        pass = 'FNjr8512lJ';
                        await LoginAdmin(login, setLogin, adminId, staffId, pass)
                    } else if (ladyIdsViktorC1337.include(loginData.loginUserId)) {
                        adminId = 'C1337';
                        staffId = 'S60729';
                        pass = 'htj512Hr291';
                        await LoginAdmin(login, setLogin, adminId, staffId, pass)
                    }
                }

                await LoginPassToLocalStorage(loginData.loginUserId)

                const admireMail = await AdmireMail(loginData);
                setAdmire(admireMail);

                // return () => {
                //     socket.current.close();
                // };
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

    // useEffect(() => {
    //     const fetchDataInterval = setInterval(async () => {
    //         try {
    //             const data = await Reconnect();
    //             // Обработка успешного ответа
    //             console.log(data);
    //         } catch (error) {
    //             // Обработка ошибок
    //             console.log(error);
    //         }
    //     }, 15000);
    //
    //     // Очистка интервала при размонтировании компонента
    //     return () => {
    //         clearInterval(fetchDataInterval);
    //     };
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

            <div className={'main-page'} >
                <div className={'left-part'}>
                    <AddedInvites
                        invites={invites}
                        setInvites={setInvites}
                        loginData={loginData}
                        invitesPersonal={invitesPersonal}
                        setInvitesPersonal={setInvitesPersonal}
                        invitesCamshare={invitesCamshare}
                        setInvitesCamshare={setInvitesCamshare}
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
                    />
                </div>

                <div className={'right-part-down'} >
                    <Log log={log}/>
                </div>

            </div>
            <div>
                 <RenderAdmireMail
                    admire={admire}
                    setAdmire={setAdmire}
                    loginData={loginData}
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
        </>
    )
}

export default MainPage;

// входящие письма
// fetch("https://www.charmdate.com/lady/emfmails_inbox.php", {
//     "headers": {
//         "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
//         "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
//         "cache-control": "max-age=0",
//         "upgrade-insecure-requests": "1"
//     },
//     "referrer": "https://www.charmdate.com/lady/emfmails_first_mail.php",
//     "referrerPolicy": "strict-origin-when-cross-origin",
//     "body": null,
//     "method": "GET",
// });

// отправка эдмайера
//fetch("https://www.charmdate.com/clagt/admire/send_admire_mail2.php", {
//   "headers": {
//     "accept": "*/*",
//     "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
//     "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//     "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"macOS\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "x-requested-with": "XMLHttpRequest"
//   },
//   "referrer": "https://www.charmdate.com/lady/online.php",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": "at_code=C469616-A72&favid=&manid=CM61487249&womanid=C469616&template_type=B&sendmailsub=%2BSend%2BMail%2B",
//   "method": "POST",
//   "mode": "cors",
//   "credentials": "include"
// });


///добавление инвайта

// fetch("https://www.charmdate.com/livechat/setstatus.php?action=ladyaddinvitetemplate", {
//     "headers": {
//         "accept": "*/*",
//         "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
//         "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//         "sec-ch-ua": "\"Google Chrome\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
//         "sec-ch-ua-mobile": "?0",
//         "sec-ch-ua-platform": "\"macOS\"",
//         "sec-fetch-dest": "empty",
//         "sec-fetch-mode": "cors",
//         "sec-fetch-site": "same-origin",
//         "x-requested-with": "XMLHttpRequest"
//     },
//     "referrer": "https://www.charmdate.com/lady/online.php",
//     "referrerPolicy": "strict-origin-when-cross-origin",
//     "body": "curwomanid=C469616&service_type=0&womanid=C469616&autoflag=1&typeid=1&msg=my+sister+would+like+to+ask+you+something%2C+can+you+answer+pls%3F",
//     "method": "POST",
//     "mode": "cors",
//     "credentials": "include"
// });


// отпрвка письма мужчине от девушки
// fetch("https://www.charmdate.com/clagt/emf_sender5.php", {
//     "headers": {
//         "accept": "*/*",
//         "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
//         "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//         "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
//         "sec-ch-ua-mobile": "?0",
//         "sec-ch-ua-platform": "\"macOS\"",
//         "sec-fetch-dest": "empty",
//         "sec-fetch-mode": "cors",
//         "sec-fetch-site": "same-origin",
//         "x-requested-with": "XMLHttpRequest"
//     },
//     "referrer": "https://www.charmdate.com/clagt/mw_emf_agt.php?messageid=IEEHAHEA&ids=IEEHAHEA&manid=CM23294740&act=reply-emf",
//     "referrerPolicy": "strict-origin-when-cross-origin",
//     "body": "body=Dear+Knut%2C%0A%0AThank+you+for+your+warm+and+thoughtful+message.+I'm+touched+by+your+interest+in+how+to+pronounce+my+name.+You+can+say+it+straightforward%3B+there's+no+need+for+any+special+emphasis.+I+appreciate+your+consideration.%0A%0AIt's+fascinating+to+hear+about+your+commuting+experiences.+It+sounds+like+having+a+car+provides+a+significant+advantage+in+terms+of+time+and+convenience%2C+despite+the+cost.+I+can+imagine+the+challenges+of+relying+on+public+transportation+in+your+situation.+The+cost+of+commuting+and+the+associated+expenses+in+Oslo+seem+to+be+considerable+factors+in+your+decision.+I%E2%80%99m+also+wondering%2C+have+you+ever+calculated+how+much+it+would+cost+to+drive+1+kilometer+by+car%3F+I+sometimes+consider+such+small+things%2C+for+example%2C+in+Ukraine+now+1+kilometer+in+a+car+with+a+consumption+of+10+liters+per+100+kilometers+will+cost+approximately+6.6+UAH%2C+which+is+approximately+0.17+euro+cents.+How+much+euro+will+it+cost+in+your+country+now%3F%0A%0ARegarding+Medvedev%2C+I+think+that+a+sober+person+cannot+say+the+things+he+says.+On+russia%2C+people+often+say+that+he+needs+to+stop+drinking+alcohol.+I+think+that+every+politician+knew+what+they+were+getting+into+when+they+discussed+the+decision+on+war%2C+and+now+I+think+that+some+are+hostages+of+their+stupidity%2C+because+they+can+no+longer+do+anything%2C+they+will+never+be+able+to+wash+their+hands+of+blood%2C+they+can+sell+their+houses+they+can%E2%80%99t+either%2C+because+everyone+knows+that+this+is+their+home%2C+they+can%E2%80%99t+leave+either%2C+and+what+else+can+they+do+in+such+a+situation+if+they+don%E2%80%99t+drink+alcohol+lol%0AHe+was+not+president+for+a+long+time%2C+Putler+appointed+him+for+one+term%2C+because+at+that+time%2C+according+to+their+constitution%2C+Putler+could+not+be+re-elected%2C+and+when+Medvedev+came%2C+Putler+changed+the+constitution+and+again+elected+himself+president%2C+in+any+other+situation+he+would+never+If+I+hadn%E2%80%99t+become+president%2C+I+think+I+equate+this+to+taking+a+homeless+person+off+the+street%2C+sheltering+him+and+telling+him+what+to+do+and+he+will+do+everything.%0A%0AI+appreciate+your+willingness+to+offer+financial+support+for+a+business+idea.+It's+heartening+to+know+that+you+are+supportive+and+open+to+helping+when+the+time+is+right.+I+will+certainly+keep+you+updated+on+any+progress+or+developments.+And+while+I+really+can%E2%80%99t+think+of+anything+myself%2C+no+ideas+come+to+mind+at+all.%0A%0AThank+you+for+your+encouraging+words+about+my+personal+life.+I+will+keep+you+updated+on+all+the+developments%2C+and+who+knows%2C+maybe+in+the+future+the+three+of+us+will+have+a+love+story.%0A%0AYour+thoughts+on+the+property+market+align+with+my+own+considerations.+It+seems+like+a+slow+but+potentially+rewarding+investment%2C+especially+with+the+anticipated+post-war+developments+in+Ukraine.+I'll+continue+to+monitor+the+situation+and+make+informed+decisions.%0A%0AI'm+grateful+for+your+offer+to+check+for+laser-cutting+products+in+Norway.+I+saw+that+there+is+laser+cutting+of+various+boxes+or+plywood%2C+this+can+be+both+for+decoration+and+for+different+industries.+For+example%2C+these+could+be+houses+for+children+or+houses+for+dolls%2C+or+they+could+be+whips+for+rabbits+or+cats.+It+can+also+be+cardboard+vases+for+fresh+flowers+or+bouquets+of+flowers.+Maybe+you've+come+across+something+like+this%3F+That+is%2C+you+can+produce+anything+from+plywood+with+a+maximum+thickness+of+up+to+1+cm.+Or+from+any+cardboard%2C+such+as+packaging+gift+boxes+and+flower+vases.%0A%0ABest+of+luck+with+finishing+your+apartment+this+weekend.+Your+dedication+to+the+project+is+admirable%2C+and+I+look+forward+to+seeing+the+photos.%0A%0AThank+you+once+again+for+your+kind+words+and+support%2C+Knut.+I+appreciate+having+such+a+caring+friend.%0A%0AWarm+regards%2C%0AAnastasia&attachfilephoto=C546584-48446d3bcd19397ee34372294ea7e0cb%7C&private_attachfilephoto=6c3353f6dc4d3171b6c0e33ae7ca1acd%7C&short_video_attachfilephoto=&select_vg_id=&agreeLaw=Y&womanid=C546584&manid=CM23294740&reply_id=IEEHAHEA&reply_id2=IEEHAHEA&reply_flag=yes&lady_tel=%2B%2B43-67762568692&checkcomment=Y&rmethod=1&sendtimes=0&submit_emf_restrictions_action=",
//     "method": "POST",
//     "mode": "cors",
//     "credentials": "include"
// });

// логин на админку
// fetch("https://www.charmdate.com/clagt/login.php", {
//   "headers": {
//     "accept": "*/*",
//     "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
//     "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//     "sec-ch-ua": "\"Google Chrome\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"macOS\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "x-requested-with": "XMLHttpRequest"
//   },
//   "referrer": "https://www.charmdate.com/clagt/?login_page&id=C853966&ssid=0989eb97f0b60d694c2d612db97c0f4c042693a90eed3d57010a9d1bfcefb35a4f161404f827c9afa53d5a205161927de9002f404ad6029f84bb657bb2a475ca",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": "agentid=C2436&staff_id=S64345&passwd=66321005510002",
//   "method": "POST",
//   "mode": "cors",
//   "credentials": "include"
// });

// логин на анкету
//fetch("https://www.charmdate.com/lady/login.php", {
//   "headers": {
//     "accept": "*/*",
//     "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
//     "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//     "sec-ch-ua": "\"Google Chrome\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"macOS\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "x-requested-with": "XMLHttpRequest"
//   },
//   "referrer": "https://www.charmdate.com/clagt/?login_page&id=C853966&ssid=0989eb97f0b60d694c2d612db97c0f4c042693a90eed3d57010a9d1bfcefb35a4f161404f827c9afa53d5a205161927de9002f404ad6029f84bb657bb2a475ca",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": "profileid=C853966&password=xx21dz9i&authcode=51865&persistent=Y",
//   "method": "POST",
//   "mode": "cors",
//   "credentials": "include"
// });
