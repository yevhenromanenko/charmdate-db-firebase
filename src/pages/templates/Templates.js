import {useEffect, useState} from "react";
import TemplatesFromLocalStorage from "./templates-from-local-storage/TemplatesFromLocalStorage";
import './Templates.scss'
import EmailForm from "./email-form/EmailForm";
import {InfoBP} from "./info/InfoBP";
import {InfoSayHi} from "./info/InfoSayHi";
import {InfoFirstEmfLetter} from "./info/InfoFirstEmfLetter";
import {InfoVideoRequestLetter} from "./info/InfoVideoRequestLetter";

const Templates = ({ladyId, firstLetter, sayHiLetter, videoRequestLetter, bpMail}) => {

    const [selectedMail, setSelectedMail] = useState(null);
    const [selectedPrivate, setSelectedPrivate] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [selectedGift, setSelectedGift] = useState(null);

    const [selectedMailSayHi, setSelectedMailSayHi] = useState(null);

    const [selectedMailBP, setSelectedMailBP] = useState(null);
    const [selectedPrivateBP, setSelectedPrivateBP] = useState([]);
    const [selectedVideoBP, setSelectedVideoBP] = useState(null);
    const [selectedGiftBP, setSelectedGiftBP] = useState(null);

    const [selectedMailVideoRequest, setSelectedMailVideoRequest] = useState(null);
    const [selectedGiftVideoRequest, setSelectedGiftVideoRequest] = useState(null);

    const [selectedType, setSelectedType] = useState(null);

    const [firstLetterContent, setFirstLetterContent] = useState([]);
    const [letter, setLetter] = useState('');

    const [SayHiLetterContent, setSayHiLetterContent] = useState([]);
    const [SayHiLetter, setSayHiLetter] = useState('');

    const [bpContent, setBPContent] = useState([]);
    const [bpLetter, setBPLetter] = useState('');

    const [VideoRequestLetterContent, setVideoRequestLetterContent] = useState([]);
    const [VideoRequestLetter, setVideoRequestLetter] = useState('');

    useEffect(() => {
        TemplatesFromLocalStorage(setFirstLetterContent, setLetter, firstLetter, ladyId, setSelectedMail, setSelectedGift, setSelectedPrivate, setSelectedVideo);
        TemplatesFromLocalStorage(setSayHiLetterContent, setSayHiLetter, sayHiLetter, ladyId, setSelectedMailSayHi);
        TemplatesFromLocalStorage(setBPContent, setBPLetter, bpMail, ladyId, setSelectedMailBP, setSelectedGiftBP, setSelectedPrivateBP, setSelectedVideoBP);
        TemplatesFromLocalStorage(setVideoRequestLetterContent, setVideoRequestLetter, videoRequestLetter, ladyId, setSelectedMailVideoRequest, setSelectedGiftVideoRequest);
    }, []);

    const toggleDiv = (icon) => {
        setSelectedType(prevType => (prevType === icon ? null : icon));
    };

    return (
        <>
            <div>
            <button className={'show-hide-button'} onClick={() => toggleDiv(firstLetter)}>
                {selectedType === firstLetter ? 'Перший лист ⬆' : 'Перший лист ⬇'}
            </button>

            <button className={'show-hide-button'} onClick={() => toggleDiv(sayHiLetter)}>
                {selectedType === sayHiLetter ? 'SayHi ⬆' : 'SayHi ⬇'}
            </button>

            <button className={'show-hide-button'} onClick={() => toggleDiv(bpMail)}>
                {selectedType === bpMail ? 'Bonus Point ⬆' : 'Bonus Point ⬇'}
            </button>

            <button className={'show-hide-button'} onClick={() => toggleDiv(videoRequestLetter)}>
                {selectedType === videoRequestLetter ? 'Відео запит ⬆' : 'Відео запит ⬇'}
            </button>

                {selectedType === firstLetter && (
                    <>
                        <p className={'info-email-form'}>{InfoFirstEmfLetter}</p>
                        <EmailForm
                            setLetter={setLetter}
                            letter={letter}
                            ladyId={ladyId}
                            firstLetterContent={firstLetterContent}
                            firstLetter={firstLetter}
                            setFirstLetterContent={setFirstLetterContent}
                            setSelectedMail={setSelectedMail}
                            setSelectedPrivate={setSelectedPrivate}
                            setSelectedVideo={setSelectedVideo}
                            setSelectedGift={setSelectedGift}
                            selectedMail={selectedMail}
                            selectedPrivate={selectedPrivate}
                            selectedVideo={selectedVideo}
                            selectedGift={selectedGift}
                        />
                    </>
                )}

                {selectedType === sayHiLetter && (
                    <>
                        <p className={'info-email-form'}>{InfoSayHi}</p>
                        <EmailForm
                            setLetter={setSayHiLetter}
                            letter={SayHiLetter}
                            ladyId={ladyId}
                            firstLetterContent={SayHiLetterContent}
                            firstLetter={sayHiLetter}
                            setFirstLetterContent={setSayHiLetterContent}
                            setSelectedMail={setSelectedMailSayHi}
                            selectedMail={selectedMailSayHi}
                        />
                    </>
                )}

                {selectedType === bpMail && (
                    <>
                        <p className={'info-email-form'}>{InfoBP}</p>
                        <EmailForm
                            setLetter={setBPLetter}
                            letter={bpLetter}
                            ladyId={ladyId}
                            firstLetterContent={bpContent}
                            firstLetter={bpMail}
                            setFirstLetterContent={setBPContent}
                            setSelectedMail={setSelectedMailBP}
                            setSelectedPrivate={setSelectedPrivateBP}
                            setSelectedVideo={setSelectedVideoBP}
                            setSelectedGift={setSelectedGiftBP}
                            selectedMail={selectedMailBP}
                            selectedPrivate={selectedPrivateBP}
                            selectedVideo={selectedVideoBP}
                            selectedGift={selectedGiftBP}
                        />
                    </>
                )}


                {selectedType === videoRequestLetter && (
                    <>
                        <p className={'info-email-form'}>{InfoVideoRequestLetter}</p>
                        <EmailForm
                            setLetter={setVideoRequestLetter}
                            letter={VideoRequestLetter}
                            ladyId={ladyId}
                            firstLetterContent={VideoRequestLetterContent}
                            firstLetter={videoRequestLetter}
                            setFirstLetterContent={setVideoRequestLetterContent}
                            setSelectedMail={setSelectedMailVideoRequest}
                            setSelectedGift={setSelectedGiftVideoRequest}
                            selectedMail={selectedMailVideoRequest}
                            selectedGift={selectedGiftVideoRequest}
                        />
                    </>
                )}
            </div>
        </>
    )
}

export default Templates;

// bp letters
// fetch("https://www.charmdate.com/clagt/emf_men_women_unprinted_integral.php?groupshow=4&rnd=0.0495034906698506", {
//     "headers": {
//         "accept": "*/*",
//         "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
//         "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
//         "sec-ch-ua-mobile": "?0",
//         "sec-ch-ua-platform": "\"macOS\"",
//         "sec-fetch-dest": "empty",
//         "sec-fetch-mode": "cors",
//         "sec-fetch-site": "same-origin",
//         "x-requested-with": "XMLHttpRequest"
//     },
//     "referrer": "https://www.charmdate.com/clagt/emf_men_women_unprinted.php?groupshow=4&act=list-emf",
//     "referrerPolicy": "strict-origin-when-cross-origin",
//     "body": null,
//     "method": "GET",
//     "mode": "cors",
//     "credentials": "include"
// });
