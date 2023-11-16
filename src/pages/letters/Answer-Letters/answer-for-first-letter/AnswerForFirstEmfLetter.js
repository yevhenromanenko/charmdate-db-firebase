import React, {useEffect, useState} from "react";
import GetContent from "../../../../functions/get-content/GetContent";
import GetPhotos from "../../get-photos/GetPhotos";
import SendLetter from "../send-letter/SendLetter";
import ReplyTwo from "../answer-for-emf-letter/replyTwo";
import InfoUserInLetter from "../../info-user-in-letter/InfoUserInLetter";
import AnswerForm from "../answer-form/AnswerForm";
import PhotoVideoGift from "../../../../functions/photo-video-gift/PhotoVideoGift";
const AnswerForFirstEmfLetter = ({ladyId, firstLetter}) => {

    const answerFrom = 'first-letter';
    const placeholder = 'Напишіть відповідь на перший лист після чату тут, якщо ви не додали шаблон, або додайте шаблон натиснувши на "Додати шаблон!"'

    const [count, setCount] = useState(0);
    const [err, setErr] = useState(0);

    const [manId, setManId] = useState(null);
    const [telNumber, setTelNumber] = useState(null);
    const [replyId, setReplyId] = useState(null);

    const [content, setContent] = useState('');
    const [noTemplateFound, setNoTemplateFound] = useState(false);

    const [selectedMail, setSelectedMail] = useState(null);
    const [selectedPrivate, setSelectedPrivate] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [selectedGift, setSelectedGift] = useState(null);

    const [showPhoto, setShowPhoto] = useState(false);
    const [user, setUser] = useState([]);

    useEffect(() => {
        const getTemplatesFromServer = async () => {
            try {
                const user = await GetContent(firstLetter, ladyId, setNoTemplateFound, setContent, setManId, setTelNumber, setReplyId, setSelectedMail, setSelectedGift, setSelectedPrivate, setSelectedVideo)
                console.log(user);
                setUser(prev => [...prev, ...user])
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
        await ReplyTwo(ladyId, manId, answerFrom);
        const {mailPhoto, privatePhotoOne, privatePhotoTwo, privatePhotoThree, video, gift} = await PhotoVideoGift(selectedMail, selectedPrivate, selectedVideo, selectedGift, ladyId, manId)

        await SendLetter(content, manId, ladyId, telNumber, mailPhoto, privatePhotoOne, privatePhotoTwo, privatePhotoThree, video, setErr, gift, setCount, answerFrom, answerFrom)
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

                            <br/>
                            {showPhoto && (
                                <GetPhotos
                                    setSelectedMail={setSelectedMail}
                                    setSelectedPrivate={setSelectedPrivate}
                                    setSelectedVideo={setSelectedVideo}
                                    setSelectedGift={setSelectedGift}
                                    ladyId={ladyId}
                                    manId={manId}
                                    answerFrom={answerFrom}
                                    selectedMail={selectedMail}
                                    selectedPrivate={selectedPrivate}
                                    selectedVideo={selectedVideo}
                                    selectedGift={selectedGift}
                                />
                            )}
                        </div>
                    </div>
                )}
        </>
    );


}

export default AnswerForFirstEmfLetter;
