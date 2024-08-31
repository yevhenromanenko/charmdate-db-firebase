import {useEffect, useState} from "react";
import TemplatesFromLocalStorage from "./templates-from-local-storage/TemplatesFromLocalStorage";
import './Templates.scss'
import EmailForm from "./email-form/EmailForm";
import {InfoBP} from "./info/InfoBP";
import {InfoSayHi} from "./info/InfoSayHi";
import {InfoFirstEmfLetter} from "./info/InfoFirstEmfLetter";
import {InfoOnlinePersonalLetter, InfoVideoRequestLetter} from "./info/InfoVideoRequestLetter";

const Templates = ({ladyId, firstLetter, sayHiLetter, videoRequestLetter, onlinePersonalLetter, bpMail}) => {

    const [selectedMail, setSelectedMail] = useState(null);
    const [selectedPrivate, setSelectedPrivate] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [selectedGift, setSelectedGift] = useState(null);

    const [selectedMailSayHi, setSelectedMailSayHi] = useState(null);

    const [selectedMailBP, setSelectedMailBP] = useState(null);
    const [selectedPrivateBP, setSelectedPrivateBP] = useState([]);
    const [selectedVideoBP, setSelectedVideoBP] = useState(null);
    const [selectedGiftBP, setSelectedGiftBP] = useState(null);

    const [selectedMailOnlinePersonal, setSelectedMailOnlinePersonal] = useState(null);
    const [selectedPrivateOnlinePersonal, setSelectedPrivateOnlinePersonal] = useState([]);
    const [selectedVideoOnlinePersonal, setSelectedVideoOnlinePersonal] = useState(null);
    const [selectedGiftOnlinePersonal, setSelectedGiftOnlinePersonal] = useState(null);

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

    const [OnlinePersonalLetterContent, setOnlinePersonalLetterContent] = useState([]);
    const [OnlinePersonalLetter, setOnlinePersonalLetter] = useState('');


    useEffect(() => {
        TemplatesFromLocalStorage(setFirstLetterContent, setLetter, firstLetter, ladyId, setSelectedMail, setSelectedGift, setSelectedPrivate, setSelectedVideo);
        TemplatesFromLocalStorage(setSayHiLetterContent, setSayHiLetter, sayHiLetter, ladyId, setSelectedMailSayHi);
        TemplatesFromLocalStorage(setBPContent, setBPLetter, bpMail, ladyId, setSelectedMailBP, setSelectedGiftBP, setSelectedPrivateBP, setSelectedVideoBP);
        TemplatesFromLocalStorage(setVideoRequestLetterContent, setVideoRequestLetter, videoRequestLetter, ladyId, setSelectedMailVideoRequest, setSelectedGiftVideoRequest);
        TemplatesFromLocalStorage(setOnlinePersonalLetterContent, setOnlinePersonalLetter, onlinePersonalLetter, ladyId, setSelectedMailOnlinePersonal, setSelectedGiftOnlinePersonal, setSelectedPrivateOnlinePersonal, setSelectedVideoOnlinePersonal);
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

            <button className={'show-hide-button'} onClick={() => toggleDiv(onlinePersonalLetter)}>
                {selectedType === onlinePersonalLetter ? 'Постояльці онлайн ⬆' : 'Постояльці онлайн ⬇'}
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

                {selectedType === onlinePersonalLetter && (
                    <>
                        <p className={'info-email-form'}>{InfoOnlinePersonalLetter}</p>
                        <EmailForm
                            setLetter={setOnlinePersonalLetter}
                            letter={OnlinePersonalLetter}
                            ladyId={ladyId}
                            firstLetterContent={OnlinePersonalLetterContent}
                            firstLetter={onlinePersonalLetter}
                            setFirstLetterContent={setOnlinePersonalLetterContent}
                            setSelectedMail={setSelectedMailOnlinePersonal}
                            setSelectedPrivate={setSelectedPrivateOnlinePersonal}
                            setSelectedVideo={setSelectedVideoOnlinePersonal}
                            setSelectedGift={setSelectedGiftOnlinePersonal}
                            selectedMail={selectedMailOnlinePersonal}
                            selectedPrivate={selectedPrivateOnlinePersonal}
                            selectedVideo={selectedVideoOnlinePersonal}
                            selectedGift={selectedGiftOnlinePersonal}
                        />
                    </>
                )}
            </div>
        </>
    )
}

export default Templates;
