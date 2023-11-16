import GetPhotos from "../../get-photos/GetPhotos";
import React, {useEffect, useState} from "react";
import '../answer-for-emf-letter/AnswerForEmfLetter.scss'
import TranslateText from "../../../../functions/func-translate/TranslateText";
import {BeatLoader} from "react-spinners";
import {override} from "../../../../functions/override-css/OverRideCss";
import GetContent from "../../../../functions/get-content/GetContent";
import SendLetterBP from "./SendLetterBP";
import GetInfoBonusPoint from "./GetInfoBP";
import LetterForm from "../../letter-form/LetterForm";
import TranslateForm from "../../translate-form/TranslateForm";
import AnswerForm from "../answer-form/AnswerForm";
import PhotoVideoGift from "../../../../functions/photo-video-gift/PhotoVideoGift";

const AnswerForBPMail = ({ladyId, firstLetter}) => {

    const answerFrom = 'bp-letter';
    const placeholder = 'Напишіть відповідь на лист тут, ви можете написати на будь-якій мові і натиснути кнопку вище "Переклад"'

    const [count, setCount] = useState(0)
    const [err, setErr] = useState(0)
    const [noTemplateFound, setNoTemplateFound] = useState(false);

    const [showPhoto, setShowPhoto] = useState(false);
    const [selectedMail, setSelectedMail] = useState(null);
    const [selectedPrivate, setSelectedPrivate] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [selectedGift, setSelectedGift] = useState(null);
    const [letter, setLetter] = useState('');
    const [letterFromMan, setLetterFromMan] = useState([])

    const [showMail, setShowMail] = useState(false);
    const [showTranslateRu, setShowTranslateRu] = useState(false);
    const [showTranslateUa, setShowTranslateUa] = useState(false);

    const [trLetter, setTrLetter] = useState('');
    const [trLetterUa, setTrLetterUa] = useState('');
    const [isTranslating, setIsTranslating] = useState(false);
    const [telNumber, setTelNumber] = useState(null);
    const [manId, setManId] = useState(null);
    const [replyId, setReplyId] = useState(null);
    const [user, setUser] = useState([]);


    useEffect(() => {

        const fetch = async () => {
            try {
                const languageRu = 'ru';
                const languageUa = 'uk';

                const letter = await GetInfoBonusPoint();
                const manId = letter[0].manId;
                setManId(manId)
                const text = letter[0].textLetter;
                setLetterFromMan(letter);

                const translateText = await TranslateText(text, languageRu);
                const translateTextUa = await TranslateText(text, languageUa);

                const user = await GetContent(firstLetter, ladyId, setNoTemplateFound, setLetter, setManId, setTelNumber, setReplyId, setSelectedMail, setSelectedGift, setSelectedPrivate, setSelectedVideo, manId)
                setUser(prev => [...prev, ...user])

                setTrLetter(translateText)
                setTrLetterUa(translateTextUa)

            } catch (err) {
                console.error(err);
            }
        };

        fetch();

    }, [])

    const SendingLetter = async () => {

        const {mailPhoto, privatePhotoOne, privatePhotoTwo, privatePhotoThree, video, gift} = PhotoVideoGift(selectedMail, selectedPrivate, selectedVideo, selectedGift, ladyId, manId)
        await SendLetterBP(letter, manId, ladyId, telNumber, mailPhoto, privatePhotoOne, privatePhotoTwo, privatePhotoThree, video, setErr, gift, setCount, replyId, answerFrom)
    }

    const handleTranslation = async () => {
        try {
            setIsTranslating(true); // Устанавливаем isTranslating в true при начале перевода

            // Получите текст из textarea
            const textToTranslate = letter;

            // Выполните перевод с помощью функции TranslateText
            const languageEn = 'en'; // Укажите целевой язык для перевода, если необходимо
            const translateText = await TranslateText(textToTranslate, languageEn);

            // Установите переведенный текст в состояние letter
            setLetter(translateText);
        } catch (err) {
            console.error(err);
        } finally {
            setIsTranslating(false); // Устанавливаем isTranslating в false после завершения перевода
        }
    };

    return(
        <>
            {count === 1 ?
                (<>
                    <p style={{marginLeft: '10px', fontSize: '22px'}} className={'content-letter-use-answer-emf'}>Дякую! Лист було відправлено!</p>
                </>) :
                (<div className="email-form">
                        <div>

                            <div className={'temp-answer-emf'}>
                                {letterFromMan.length > 0 && (
                                    <>
                                        {letterFromMan.map((mail) => (
                                            <>
                                                <LetterForm
                                                    user={user}
                                                    mail={mail}
                                                    setShowMail={setShowMail}
                                                    showMail={showMail}
                                                />

                                                <TranslateForm
                                                    showTranslateRu={showTranslateRu}
                                                    showTranslateUa={showTranslateUa}
                                                    trLetter={trLetter}
                                                    trLetterUa={trLetterUa}
                                                    setShowTranslateRu={setShowTranslateRu}
                                                    setShowTranslateUa={setShowTranslateUa}
                                                />
                                            </>
                                            // <>
                                            //     <div className={`left-part-letter ${mail.textLetter.length > 1200 ? 'scrollable-letter' : ''}`}>
                                            //         <p style={{color: '#e09f3e', fontSize: '16px'}}>
                                            //             Текст листа від{" "}
                                            //             <a
                                            //                 className={'link-to-detail'}
                                            //                 href={`https://www.charmdate.com/clagt/admire/men_profile.php?manid=${mail.manId}`}
                                            //                 target="_blank"
                                            //                 rel="noopener noreferrer"
                                            //             >
                                            //                 {mail.manId}:
                                            //             </a>
                                            //         </p>
                                            //         <p style={{marginLeft: '0', marginTop: '0'}} className={'content-letter-use-answer-emf'}>{mail.textLetter}</p>
                                            //
                                            //         {mail.photoLetter.length > 0 && (
                                            //             <>
                                            //                 <button className={'show-hide-button-mass'} onClick={toggle(setShowMail, showMail)}>
                                            //                     {showMail ? `Фото чоловіка ⬆` : `Фото чоловіка ⬇`}
                                            //                 </button>
                                            //
                                            //                 {showMail && (
                                            //                     <>
                                            //                         {/*тут перебрать фото*/}
                                            //                         <p><img className={'photo-answer-emf'} src={`https://www.charmdate.com${mail.photoLetter}`}/></p>
                                            //                         <p className={'type-answer-emf'}>{mail.typePhoto}</p>
                                            //                     </>
                                            //                 )}
                                            //             </>
                                            //         )}
                                            //     </div>
                                            //
                                            //     <div className={`right-part-letter ${trLetter.length > 1200 ? 'scrollable-letter' : ''}`}>
                                            //         <p style={{color: '#e09f3e', fontSize: '16px', display: 'inline'}}>Переклад листа:</p>
                                            //         <button className={'show-hide-button-translate'} onClick={() => toggleLanguage('ru')}>
                                            //             {showTranslateRu ? `російською ⬆` : `російською ⬇`}
                                            //         </button>
                                            //         <button className={'show-hide-button-translate'} onClick={() => toggleLanguage('ua')}>
                                            //             {showTranslateUa ? `Українською ⬆` : `Українською ⬇`}
                                            //         </button>
                                            //
                                            //
                                            //         {showTranslateRu && (
                                            //             trLetter.length > 0 ?
                                            //                 <>
                                            //                     <p className={'content-letter-use-answer-emf'}>{trLetter}</p>
                                            //                 </> :
                                            //                 <>
                                            //                     <div className={'loading-form'}>
                                            //                         <p className={"info-about"}>Завантаження перекладу...</p>
                                            //                         <BeatLoader css={override} size={15} color={"#ececf1"} />
                                            //                     </div>
                                            //                 </>
                                            //         )}
                                            //
                                            //         {showTranslateUa && (
                                            //             trLetterUa.length > 0 ?
                                            //                 <>
                                            //                     <p className={'content-letter-use-answer-emf'}>{trLetterUa}</p>
                                            //                 </> :
                                            //                 <>
                                            //                     <div className={'loading-form'}>
                                            //                         <p className={"info-about"}>Завантаження перекладу...</p>
                                            //                         <BeatLoader css={override} size={15} color={"#ececf1"} />
                                            //                     </div>
                                            //                 </>
                                            //         )}
                                            //     </div>
                                            //
                                            // </>
                                        ))}
                                    </>
                                )}
                            </div>
                        </div>


                        <div className={'temp-answer-emf-letter'}>
                            <button className={'btn-photo-mass-letter'} onClick={handleTranslation}>
                                {isTranslating ?
                                    (
                                        <BeatLoader css={override} size={15} color={"#ececf1"} />
                                    ) : 'Переклад на англійську'
                                }

                            </button>

                            {noTemplateFound ?  <button style={{marginLeft: '10px'}} className={'btn-photo-mass-letter'} onClick={() => window.open("https://www.charmdate.com/clagt/woman/helpsys.php?help_type=3", '_blank')}>Додати шаблон</button> : null}
                            {err > 0 ?  <p style={{display: 'inline', marginLeft: '10px', color: '#ececf1', fontSize: '16px'}}>Помилка відправки: {err}</p> : ''}
                            <br/>
                            <AnswerForm
                                content={letter}
                                SendingLetter={SendingLetter}
                                setContent={setLetter}
                                setShowPhoto={setShowPhoto}
                                showPhoto={showPhoto}
                                placeholder={placeholder}
                            />
                            {/*<textarea*/}
                            {/*    id="content"*/}
                            {/*    className={'content-letter'}*/}
                            {/*    placeholder={'Напишіть відповідь на лист тут, ви можете написати на будь-якій мові і натиснути кнопку вище "Переклад"'}*/}
                            {/*    name="content"*/}
                            {/*    value={letter}*/}
                            {/*    onChange={(e) => setLetter(e.target.value)}*/}
                            {/*/>*/}
                            {/*<br/>*/}
                            {/*<button className={'btn-photo-mass-letter'} onClick={handlePhotoClick}>*/}
                            {/*    {showPhoto ? 'Фото ⬆' : 'Фото ⬇'}*/}
                            {/*</button>*/}

                            {/*<button className={'btn-answer-letter'} onClick={SendingLetter}>Надіслати</button>*/}


                            <br/>
                            {showPhoto && (
                                <GetPhotos
                                    setSelectedMail={setSelectedMail}
                                    selectedPrivate={selectedPrivate}
                                    setSelectedPrivate={setSelectedPrivate}
                                    setSelectedVideo={setSelectedVideo}
                                    setSelectedGift={setSelectedGift}
                                    ladyId={ladyId}
                                    manId={manId}
                                    answerFrom={answerFrom}
                                    selectedMail={selectedMail}
                                    selectedVideo={selectedVideo}
                                    selectedGift={selectedGift}
                                />
                            )}
                        </div>
                    </div>
                )}
        </>
    )
}

export default AnswerForBPMail;
