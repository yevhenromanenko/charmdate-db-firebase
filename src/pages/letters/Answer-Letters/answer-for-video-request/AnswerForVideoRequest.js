import React, {useEffect, useState} from "react";
import GetContent from "../../../../functions/get-content/GetContent";
import GetPhotos from "../../get-photos/GetPhotos";
import SendVideoRequest from "./SendVideoRequest";
import InfoUserInLetter from "../../info-user-in-letter/InfoUserInLetter";
import AnswerForm from "../answer-form/AnswerForm";
const AnswerForVideoRequest = ({ladyId, firstLetter}) => {

    const answerFrom = 'video-request';
    const placeholder = 'Напишіть відповідь на відео запит тут, якщо ви не додали шаблон, або додайте шаблон натиснувши на "Додати шаблон!"'

    const [count, setCount] = useState(0);
    const [err, setErr] = useState(0);

    const [manId, setManId] = useState(null);
    const [telNumber, setTelNumber] = useState(null);

    const [replyId, setReplyId] = useState(null);

    const [content, setContent] = useState('');
    const [noTemplateFound, setNoTemplateFound] = useState(false);

    const [selectedMail, setSelectedMail] = useState(null);
    const [selectedGift, setSelectedGift] = useState(null);

    const [showPhoto, setShowPhoto] = useState(false);
    const [user, setUser] = useState([]);


    useEffect(() => {
        const getTemplatesFromServer = async () => {
            try {
                const user = await GetContent(firstLetter, ladyId, setNoTemplateFound, setContent, setManId, setTelNumber, setReplyId, setSelectedMail, setSelectedGift)
                setUser(prev => [...prev, ...user])
                // await ReplyTwoSayHi(ladyId, manId);

            } catch (err) {
                console.error(err);
            }
        };
        getTemplatesFromServer();
    }, [])

    // const handlePhotoClick = () => {
    //     setShowPhoto(!showPhoto);
    // };

    const SendingLetter = async () => {

        const mailPhoto = selectedMail ? selectedMail.name || selectedMail : '';
        const gift = selectedGift ? selectedGift.name || selectedGift: "";

        await SendVideoRequest(content, ladyId, telNumber, mailPhoto, setErr, setCount, manId, gift, replyId)
    }

    return (
        <>
            {count === 1 ?
                (<>
                    <p style={{fontSize: '22px'}} className={'content-letter-use-answer-emf'}>Дякую! Лист було відправлено!</p>
                </>) :
                (<div className={'email-form'}>
                        <div className={'temp-answer-emf-letter'}>

                            {noTemplateFound ?  <button style={{marginLeft: '0'}} className={'show-hide-button'} onClick={() => window.open("https://www.charmdate.com/clagt/woman/helpsys.php?help_type=3", '_blank')}>Додати шаблон</button> : null}
                            {err > 0 ?  <p style={{display: 'inline', marginLeft: '10px', color: '#ececf1', fontSize: '16px'}}>Помилка відправки: {err}</p> : ''}
                            <br/>
                            <InfoUserInLetter user={user}/>
                            <br/>
                            <AnswerForm
                                content={content}
                                SendingLetter={SendingLetter}
                                setContent={setContent}
                                setShowPhoto={setShowPhoto}
                                showPhoto={showPhoto}
                                placeholder={placeholder}
                            />
                            {/*<textarea*/}
                            {/*    id="content"*/}
                            {/*    className={'content-letter'}*/}
                            {/*    placeholder={'Напишіть відповідь на відео запит тут, якщо ви не додали шаблон, або додайте шаблон натиснувши на "Додати шаблон!"'}*/}
                            {/*    name="content"*/}
                            {/*    value={content}*/}
                            {/*    onChange={(e) => setContent(e.target.value)}*/}
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
                                    setSelectedGift={setSelectedGift}
                                    ladyId={ladyId}
                                    manId={manId}
                                    answerFrom={answerFrom}
                                    selectedMail={selectedMail}
                                    selectedGift={selectedGift}
                                />
                            )}
                        </div>
                    </div>
                )}
        </>
    );

}

export default AnswerForVideoRequest;
