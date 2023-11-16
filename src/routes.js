import MainPage from "./pages/MAIN-PAGE/MainPage";
import Navbar from "./pages/navbar/Navbar";
import React, {useEffect, useState} from "react";
import getLadyPhotoLink from "./functions/get-lady-photo/GetLadyPhoto";
import InboxLetter from "./pages/letters/inbox-letter/InboxLetter";
import './routes.scss'
import Templates from "./pages/templates/Templates";
import MassLetter from "./pages/letters/mass-letter/MassLetter";
import UnreadLetter from "./functions/unreaded-letters/UnreadLetter";
import RenderSendLetter from "./pages/letters/sent-letters/RenderSentLetter";
import AnswerForEmfLetter from "./pages/letters/Answer-Letters/answer-for-emf-letter/AnswerForEmfLetter";
import AnswerForSayHi from "./pages/letters/Answer-Letters/answer-for-say-hi/AnswerForSayHi";
import AnswerForVideoRequest from "./pages/letters/Answer-Letters/answer-for-video-request/AnswerForVideoRequest";
import AnswerForFirstEmfLetter from "./pages/letters/Answer-Letters/answer-for-first-letter/AnswerForFirstEmfLetter";
import AnswerForBPMail from "./pages/letters/Answer-Letters/answer-for-bp-mail/AnswerForBPMail";
import GetBanUsers from "./pages/main-page/add-favorite/add-ban/GetBanUsers";
import LadyProfit from "./pages/lady-profit/LadyProfit";
import LocalStorageDataRenderer from "./functions/render-login-data-from-local-storage/RenderLoginDataFromLocalStorage";
import WriteLetterToMan from "./functions/write-letter-to-man/WriteLetterToMan";

export const useRoutes = () => {
    let adminId;
    let staffId;
    let pass;
    const firstLetter = 'first-letter';
    const sayHiLetter = 'sayHi-letter';
    const bpMail = 'bp-letter';
    const videoRequestLetter = 'videoRequest-letter';
    const [length, setLength] = useState('');

    // const [translator, setTranslator] = useState(null);
    // const translatorRef = useRef(translator);
    const [banUsers, setBanUsers] = useState([]);


    const [photoLady, setPhotoLady] = useState('');
    const [idLady, setIdLady] = useState('');
    const [chat, setChat] = useState(0)
    const [login, setLogin] = useState(false);

    const ladyIdsYevhen = ['C126657', 'C206042', 'C463543', 'C376351', 'C890734', 'C732259', 'C887670', 'C236953', 'C469616', 'C824939', 'C169721', 'C506027', 'C567282', 'C997135', 'C976365', 'C240448', 'C853966', 'C546584', 'C450615', 'C761532', 'C760077', 'C274363'];
    const ladyIdsViktor = ['C304010', 'C527776', 'C234727', 'C259212', 'C161627', 'C971993', 'C904001', 'C956425', 'C477914', 'C234038', 'C428797', 'C935273', 'C270581', 'C640007', 'C688060', 'C298661', 'C437447', 'C254911', 'C279619', 'C450928', 'C464307'];
    const ladyIdsViktorC2135 = ['C463111', 'C825824', 'C535511', 'C500607', 'C261256', 'C659624'];
    const ladyIdsViktorC1337 = ['C252317', 'C535629', 'C647792', 'C348587', 'C674744', 'C152207', 'C428050', 'C508122', 'C532109', 'C758171', 'C249925', 'C743644', 'C337407', 'C591319', 'C225406', 'C372142', 'C535629', 'C156408']

    useEffect(() => {
        async function fetchDataAsync() {
            try {
                await UnreadLetter(setLength);

                const { userId, ladyPhoto } = await getLadyPhotoLink(ladyIdsYevhen, ladyIdsViktor, ladyIdsViktorC2135, ladyIdsViktorC1337);

                setPhotoLady(ladyPhoto)
                setIdLady(userId);

                await GetBanUsers(setBanUsers, userId)

            } catch (error) {
                console.error(error);
            }
        }

        fetchDataAsync();
    }, []);

    // useEffect(() => {
    //     GetBanUsers(setBanUsers, ladyId)
    //     GetFavorite(setAllUsers, ladyId, personalListArray);
    // }, [ladyId, personalListArray]);

    if (!idLady && window.location.href.includes("lady/index.php")) {
        return (
            <>
                <LocalStorageDataRenderer/>
            </>
        )
    }

    if (idLady && idLady.length > 0) {
        if (ladyIdsYevhen.includes(idLady) || ladyIdsViktor.includes(idLady)) {

            if (window.location.href.includes('online') && !window.location.href.includes('lady_online')) {
                return (
                    <>
                        <div className={'inbox-container-routes'}>
                            <Navbar
                                photoLady={photoLady}
                                idLady={idLady}
                                setLogin={setLogin}
                                login={login}
                                adminId={adminId}
                                ladyIdsYevhen={ladyIdsYevhen}
                                ladyIdsViktor={ladyIdsViktor}
                                ladyIdsViktorC2135={ladyIdsViktorC2135}
                                ladyIdsViktorC1337={ladyIdsViktorC1337}
                                length={length}
                            />
                            <MainPage
                                chat={chat}
                                setChat={setChat}
                                setLogin={setLogin}
                                ladyIdsYevhen={ladyIdsYevhen}
                                ladyIdsViktor={ladyIdsViktor}
                                login={login}
                                adminId={adminId}
                                staffId={staffId}
                                pass={pass}
                                ladyIdsViktorC2135={ladyIdsViktorC2135}
                                ladyIdsViktorC1337={ladyIdsViktorC1337}
                                setBanUsers={setBanUsers}
                                banUsers={banUsers}
                            />
                        </div>
                        <script>
                            {document.title = `Чат ${chat > 0 ? chat + ' - '  : ''} ${idLady}`}
                        </script>
                    </>
                );
            } else if (window.location.href.includes('terms_update')) {
                return (
                    <>
                        <div className={'inbox-container-routes'}>
                            <Navbar
                                photoLady={photoLady}
                                idLady={idLady}
                                setLogin={setLogin}
                                login={login}
                                adminId={adminId}
                                ladyIdsYevhen={ladyIdsYevhen}
                                ladyIdsViktor={ladyIdsViktor}
                                ladyIdsViktorC2135={ladyIdsViktorC2135}
                                ladyIdsViktorC1337={ladyIdsViktorC1337}
                                length={length}
                            />
                            <InboxLetter/>
                        </div>
                        <script>
                            {document.title = `Листи ${length}`}
                        </script>
                    </>
                )
            } else if (window.location.href.includes('help_type=2')) {
                return (
                    <>
                        <div className={'inbox-container-routes'}>
                            <Navbar
                                photoLady={photoLady}
                                idLady={idLady}
                                setLogin={setLogin}
                                login={login}
                                adminId={adminId}
                                ladyIdsYevhen={ladyIdsYevhen}
                                ladyIdsViktor={ladyIdsViktor}
                                ladyIdsViktorC2135={ladyIdsViktorC2135}
                                ladyIdsViktorC1337={ladyIdsViktorC1337}
                                length={length}
                            />
                            <MassLetter
                                ladyId={idLady}
                                banUsers={banUsers}
                                setBanUsers={setBanUsers}
                            />
                            <script>
                                {document.title = `Масова розсилка`}
                            </script>
                        </div>
                    </>
                )
            } else if (window.location.href.includes('reply-emf')) {
                return (
                    <>
                        <div className={'inbox-container-routes'}>
                            <Navbar
                                photoLady={photoLady}
                                idLady={idLady}
                                setLogin={setLogin}
                                login={login}
                                adminId={adminId}
                                ladyIdsYevhen={ladyIdsYevhen}
                                ladyIdsViktor={ladyIdsViktor}
                                ladyIdsViktorC2135={ladyIdsViktorC2135}
                                ladyIdsViktorC1337={ladyIdsViktorC1337}
                                length={length}
                            />
                            <AnswerForEmfLetter
                                ladyId={idLady}
                            />
                            <script>
                                {document.title = `Відповідь на лист`}
                            </script>
                        </div>
                    </>
                )
            } else if (window.location.href.includes('emf_sender2.php?c=1')) {
                return (
                    <>
                        <div className={'inbox-container-routes'}>
                            <Navbar
                                photoLady={photoLady}
                                idLady={idLady}
                                setLogin={setLogin}
                                login={login}
                                adminId={adminId}
                                ladyIdsYevhen={ladyIdsYevhen}
                                ladyIdsViktor={ladyIdsViktor}
                                ladyIdsViktorC2135={ladyIdsViktorC2135}
                                ladyIdsViktorC1337={ladyIdsViktorC1337}
                                length={length}
                            />
                            <AnswerForBPMail
                                ladyId={idLady}
                                firstLetter={bpMail}
                            />
                            <script>
                                {document.title = `Bonus Point Mail`}
                            </script>
                        </div>
                    </>
                )
            } else if (window.location.href.includes('access_key_request_id')) {
                return (
                    <>
                        <div className={'inbox-container-routes'}>
                            <Navbar
                                photoLady={photoLady}
                                idLady={idLady}
                                setLogin={setLogin}
                                login={login}
                                adminId={adminId}
                                ladyIdsYevhen={ladyIdsYevhen}
                                ladyIdsViktor={ladyIdsViktor}
                                ladyIdsViktorC2135={ladyIdsViktorC2135}
                                ladyIdsViktorC1337={ladyIdsViktorC1337}
                                length={length}
                            />
                            <AnswerForVideoRequest
                                ladyId={idLady}
                                firstLetter={videoRequestLetter}
                            />
                            <script>
                                {document.title = `Video Request`}
                            </script>
                        </div>
                    </>
                )
            } else if (window.location.href.includes('emf_sender2.php?manid')) {
                return (
                    <>
                        <div className={'inbox-container-routes'}>
                            <Navbar
                                photoLady={photoLady}
                                idLady={idLady}
                                setLogin={setLogin}
                                login={login}
                                adminId={adminId}
                                ladyIdsYevhen={ladyIdsYevhen}
                                ladyIdsViktor={ladyIdsViktor}
                                ladyIdsViktorC2135={ladyIdsViktorC2135}
                                ladyIdsViktorC1337={ladyIdsViktorC1337}
                                length={length}
                            />
                            <AnswerForFirstEmfLetter
                                ladyId={idLady}
                                firstLetter={firstLetter}
                            />
                            <script>
                                {document.title = `Відповідь на перший лист`}
                            </script>
                        </div>
                    </>
                )
            } else if (window.location.href.includes('help_type=3')) {
                return (
                    <>
                        <div className={'inbox-container-routes'}>
                            <Navbar
                                photoLady={photoLady}
                                idLady={idLady}
                                setLogin={setLogin}
                                login={login}
                                adminId={adminId}
                                ladyIdsYevhen={ladyIdsYevhen}
                                ladyIdsViktor={ladyIdsViktor}
                                ladyIdsViktorC2135={ladyIdsViktorC2135}
                                ladyIdsViktorC1337={ladyIdsViktorC1337}
                                length={length}
                            />
                            <Templates
                                ladyId={idLady}
                                firstLetter={firstLetter}
                                sayHiLetter={sayHiLetter}
                                videoRequestLetter={videoRequestLetter}
                                bpMail={bpMail}

                            />
                        </div>
                        <script>
                            {document.title = `Шаблони`}
                        </script>
                    </>
                )
            } else if (window.location.href.includes("about_us")) {
                return (
                    <>
                        <div className={'inbox-container-routes'}>
                            <Navbar
                                photoLady={photoLady}
                                idLady={idLady}
                                setLogin={setLogin}
                                login={login}
                                adminId={adminId}
                                ladyIdsYevhen={ladyIdsYevhen}
                                ladyIdsViktor={ladyIdsViktor}
                                ladyIdsViktorC2135={ladyIdsViktorC2135}
                                ladyIdsViktorC1337={ladyIdsViktorC1337}
                                length={length}
                            />
                            <RenderSendLetter ladyId={idLady}/>
                        </div>
                        <script>
                            {document.title = `Надіслані листи`}
                        </script>
                    </>
                )
            } else if (window.location.href.includes("approved_pc")) {
                return (
                    <>
                        <div className={'inbox-container-routes'}>
                            <Navbar
                                photoLady={photoLady}
                                idLady={idLady}
                                setLogin={setLogin}
                                login={login}
                                adminId={adminId}
                                ladyIdsYevhen={ladyIdsYevhen}
                                ladyIdsViktor={ladyIdsViktor}
                                ladyIdsViktorC2135={ladyIdsViktorC2135}
                                ladyIdsViktorC1337={ladyIdsViktorC1337}
                                length={length}
                            />
                            <LadyProfit ladyId={idLady}/>
                        </div>
                        <script>
                            {document.title = `Профіт`}
                        </script>
                    </>
                )
            } else if (window.location.href.includes("woman")) {
                return (
                    <>
                        <script>
                            {document.title = `Анкета ${idLady}`}
                        </script>
                    </>
                )
             } else if (window.location.href.includes("men_profile")) {
                return (
                    <>
                        <Navbar
                            photoLady={photoLady}
                            idLady={idLady}
                            setLogin={setLogin}
                            login={login}
                            adminId={adminId}
                            ladyIdsYevhen={ladyIdsYevhen}
                            ladyIdsViktor={ladyIdsViktor}
                            ladyIdsViktorC2135={ladyIdsViktorC2135}
                            ladyIdsViktorC1337={ladyIdsViktorC1337}
                            length={length}
                        />
                        <WriteLetterToMan
                            ladyId={idLady}
                        />
                    </>
                )
            } else if (window.location.href.includes("reply2")) {
                return (
                    <>
                        <div className={'inbox-container-routes'}>
                            <Navbar
                                photoLady={photoLady}
                                idLady={idLady}
                                setLogin={setLogin}
                                login={login}
                                adminId={adminId}
                                ladyIdsYevhen={ladyIdsYevhen}
                                ladyIdsViktor={ladyIdsViktor}
                                ladyIdsViktorC2135={ladyIdsViktorC2135}
                                ladyIdsViktorC1337={ladyIdsViktorC1337}
                                length={length}
                            />
                            <AnswerForSayHi
                                ladyId={idLady}
                                firstLetter={sayHiLetter}
                            />
                        </div>
                        <script>
                            {document.title = `Say Hi`}
                        </script>
                    </>
                )
            } else {
                return (
                    <>
                        <Navbar
                            photoLady={photoLady}
                            idLady={idLady}
                            setLogin={setLogin}
                            login={login}
                            adminId={adminId}
                            ladyIdsYevhen={ladyIdsYevhen}
                            ladyIdsViktor={ladyIdsViktor}
                            ladyIdsViktorC2135={ladyIdsViktorC2135}
                            ladyIdsViktorC1337={ladyIdsViktorC1337}
                            length={length}
                        />
                    </>
                )
            }
        } else {
            alert('Ви не маєте права користуватись додатком!')
        }
    }

}

// получить mail photo
//fetch("https://www.charmdate.com/clagt/get-images.php?action=images&womanid=C890734&v=0.48157870738572073", {
//   "headers": {
//     "accept": "*/*",
//     "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
//     "sec-ch-ua": "\"Google Chrome\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"macOS\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "x-requested-with": "XMLHttpRequest"
//   },
//   "referrer": "https://www.charmdate.com/clagt/about/contact_us.php?action=mass-emf",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": null,
//   "method": "GET",
//   "mode": "cors",
//   "credentials": "include"
// });

// получить privat photo
//fetch("https://www.charmdate.com/clagt/get-private-images.php?action=images&womanid=C890734&manid=undefined&_dc=0.5869537088316015", {
//   "headers": {
//     "accept": "*/*",
//     "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
//     "sec-ch-ua": "\"Google Chrome\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"macOS\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "x-requested-with": "XMLHttpRequest"
//   },
//   "referrer": "https://www.charmdate.com/clagt/about/contact_us.php?action=mass-emf",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": null,
//   "method": "GET",
//   "mode": "cors",
//   "credentials": "include"
// });

// получить короткие видео
//fetch("https://www.charmdate.com/clagt/get-short-video.php?action=images&womanid=C890734&manid=undefined&_dc=0.6223013933148891", {
//   "headers": {
//     "accept": "*/*",
//     "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
//     "sec-ch-ua": "\"Google Chrome\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"macOS\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "x-requested-with": "XMLHttpRequest"
//   },
//   "referrer": "https://www.charmdate.com/clagt/about/contact_us.php?action=mass-emf",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": null,
//   "method": "GET",
//   "mode": "cors",
//   "credentials": "include"
// });

// получить курс валют
//fetch("https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11", {
//   "headers": {
//     "accept": "*/*",
//     "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
//     "sec-ch-ua": "\"Google Chrome\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"macOS\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "no-cors",
//     "sec-fetch-site": "cross-site"
//   },
//   "referrer": "https://www.charmdate.com/",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": null,
//   "method": "GET",
//   "mode": "cors",
//   "credentials": "omit"
// });

// получаем дедов , которым можно отправлять письма , получается из 3 запросов и нужно пройтись по каждой странице
//страница первая say hi
//fetch("https://www.charmdate.com/clagt/emf_wm_result.php?adddate_s_m=07&adddate_s_d=09&adddate_s_y=2023&adddate_e_m=10&adddate_e_d=06&adddate_e_y=2023&flag=-Show+All-&womanid=C890734", {
//   "headers": {
//     "accept": "*/*",
//     "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
//     "sec-ch-ua": "\"Google Chrome\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"macOS\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "x-requested-with": "XMLHttpRequest"
//   },
//   "referrer": "https://www.charmdate.com/clagt/about/contact_us.php?action=mass-emf",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": null,
//   "method": "GET",
//   "mode": "cors",
//   "credentials": "include"
// });
// страница вторая
//fetch("https://www.charmdate.com/clagt/cupidnote/can_reply_cupidnote.php?page=Mnw5NnwxNjk2NTUxMjE5", {
//   "headers": {
//     "accept": "*/*",
//     "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
//     "sec-ch-ua": "\"Google Chrome\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"macOS\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "x-requested-with": "XMLHttpRequest"
//   },
//   "referrer": "https://www.charmdate.com/clagt/about/contact_us.php?action=mass-emf",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": null,
//   "method": "GET",
//   "mode": "cors",
//   "credentials": "include"
// });


// страница полученных отвеченных писем
// первая
//fetch("https://www.charmdate.com/clagt/emf_wm_result.php?adddate_s_m=07&adddate_s_d=09&adddate_s_y=2023&adddate_e_m=10&adddate_e_d=06&adddate_e_y=2023&flag=-Show+All-&womanid=C890734", {
//   "headers": {
//     "accept": "*/*",
//     "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
//     "sec-ch-ua": "\"Google Chrome\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"macOS\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "x-requested-with": "XMLHttpRequest"
//   },
//   "referrer": "https://www.charmdate.com/clagt/about/contact_us.php?action=mass-emf",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": null,
//   "method": "GET",
//   "mode": "cors",
//   "credentials": "include"
// });

// вторая
// fetch("https://www.charmdate.com/clagt/emf_frequent_result.php?adddate_s_m=07&adddate_s_d=09&adddate_s_y=2023&adddate_e_m=10&adddate_e_d=06&adddate_e_y=2023&manid=&womanid=C890734&page=MnwxMzl8MTY5NjU1MTIxOQ==", {
//   "headers": {
//     "accept": "*/*",
//     "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
//     "sec-ch-ua": "\"Google Chrome\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"macOS\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "x-requested-with": "XMLHttpRequest"
//   },
//   "referrer": "https://www.charmdate.com/clagt/about/contact_us.php?action=mass-emf",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": null,
//   "method": "GET",
//   "mode": "cors",
//   "credentials": "include"
// });

// а также страницы прибыли девушки
// первая
//fetch("https://www.charmdate.com/clagt/livechat/search_result.php?postdate_s_y=2022&postdate_s_m=05&postdate_s_d=24&postdate_e_y=2023&postdate_e_m=10&postdate_e_d=06&status=close&womanid=C890734", {
//   "headers": {
//     "accept": "*/*",
//     "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
//     "sec-ch-ua": "\"Google Chrome\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"macOS\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "x-requested-with": "XMLHttpRequest"
//   },
//   "referrer": "https://www.charmdate.com/clagt/about/contact_us.php?action=mass-emf",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": null,
//   "method": "GET",
//   "mode": "cors",
//   "credentials": "include"
// });

// вторая
// fetch("https://www.charmdate.com/clagt/livechat/search_result.php?postdate_s_y=2022&postdate_s_m=05&postdate_s_d=24&postdate_e_y=2023&postdate_e_m=10&postdate_e_d=06&status=close&womanid=C890734&page=MnwxMTR8MTY5NjU1MTIxOQ==", {
//   "headers": {
//     "accept": "*/*",
//     "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
//     "sec-ch-ua": "\"Google Chrome\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"macOS\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "x-requested-with": "XMLHttpRequest"
//   },
//   "referrer": "https://www.charmdate.com/clagt/about/contact_us.php?action=mass-emf",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": null,
//   "method": "GET",
//   "mode": "cors",
//   "credentials": "include"
// });

// а так же исходящая почта от девушки
//первая
//fetch("https://www.charmdate.com/clagt/emf_wm_result.php?adddate_s_m=07&adddate_s_d=09&adddate_s_y=2023&adddate_e_m=10&adddate_e_d=06&adddate_e_y=2023&flag=-Show+All-&womanid=C890734", {
//   "headers": {
//     "accept": "*/*",
//     "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
//     "sec-ch-ua": "\"Google Chrome\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"macOS\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "x-requested-with": "XMLHttpRequest"
//   },
//   "referrer": "https://www.charmdate.com/clagt/about/contact_us.php?action=mass-emf",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": null,
//   "method": "GET",
//   "mode": "cors",
//   "credentials": "include"
// });
// вторая
// fetch("https://www.charmdate.com/clagt/emf_wm_result.php?adddate_s_m=07&adddate_s_d=09&adddate_s_y=2023&adddate_e_m=10&adddate_e_d=06&adddate_e_y=2023&flag=-Show+All-&womanid=C890734&page=MnwxMTF8MTY5NjU1MTIxOQ==", {
//   "headers": {
//     "accept": "*/*",
//     "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
//     "sec-ch-ua": "\"Google Chrome\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"macOS\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "x-requested-with": "XMLHttpRequest"
//   },
//   "referrer": "https://www.charmdate.com/clagt/about/contact_us.php?action=mass-emf",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": null,
//   "method": "GET",
//   "mode": "cors",
//   "credentials": "include"
// });
