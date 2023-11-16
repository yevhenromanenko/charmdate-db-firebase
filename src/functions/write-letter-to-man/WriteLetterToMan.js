import GetUserInfo from "../get-user-info/GetUserInfo";
import React, {useEffect, useState} from "react";
import toggle from "../toggle/toggle";
import ReplyTwo from "../../pages/letters/Answer-Letters/answer-for-emf-letter/replyTwo";
import PhotoVideoGift from "../photo-video-gift/PhotoVideoGift";
import SendLetter from "../../pages/letters/Answer-Letters/send-letter/SendLetter";
import InfoUserInLetter from "../../pages/letters/info-user-in-letter/InfoUserInLetter";
import AnswerForm from "../../pages/letters/Answer-Letters/answer-form/AnswerForm";
import GetPhotos from "../../pages/letters/get-photos/GetPhotos";
import GetTelNumber from "../get-tel-number/GetTelNumber";

const WriteLetterToMan = ({ladyId}) => {

    const placeholder = 'Напишіть чоловіку листа тут та відправте!'
    const answerFrom = 'mass-letter';

    const [showUsers, setShowUsers] = useState(false); // State for showing ban list
    const [manId, setManId] = useState(null)
    const [telNumber, setTelNumber] = useState(null);

    const [err, setErr] = useState(0);
    const [count, setCount] = useState(0);

    const [user, setUser] = useState([]);
    const [content, setContent] = useState('');
    const [showPhoto, setShowPhoto] = useState(false);

    const [selectedMail, setSelectedMail] = useState(null);
    const [selectedPrivate, setSelectedPrivate] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [selectedGift, setSelectedGift] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                const currentUrl = window.location.href;
                const manId = currentUrl.split('manid=')[1];
                setManId(manId);

                const urlLady = `https://www.charmdate.com/clagt/woman/women_preview_profile.php?womanid=${ladyId}`;
                const telNumber = await GetTelNumber(urlLady);
                setTelNumber(telNumber);

                if (manId) {
                    const userArray = [];
                    const user = await GetUserInfo(manId)
                    userArray.push(user)

                    setUser(prev => [...prev, ...userArray])
                }
            } catch (error) {
                console.error('Error fetching telNumber:', error);
            }
        }
        fetch();
    }, [ladyId]);

    const SendingLetter = async () => {
        await ReplyTwo(ladyId, manId, answerFrom);
        const {mailPhoto, privatePhotoOne, privatePhotoTwo, privatePhotoThree, video, gift} = await PhotoVideoGift(selectedMail, selectedPrivate, selectedVideo, selectedGift, ladyId, manId)
        await SendLetter(content, manId, ladyId, telNumber, mailPhoto, privatePhotoOne, privatePhotoTwo, privatePhotoThree, video, setErr, gift, setCount, answerFrom, answerFrom)
    }

    return (
        <div style={{backgroundColor: '#444654'}}>
                <button style={{margin: '10px'}} className={'show-button-mass'} onClick={toggle(setShowUsers, showUsers)}>
                    {showUsers ? 'Сховати ⬆' : `Написати листа ⬇`}
                </button>

            {showUsers && (
                <>
                {count === 1 ?
                    <>
                        <p style={{fontSize: '22px', margin: "10px"}} className={'content-letter-use-answer-emf'}>Дякую! Лист було відправлено!</p>
                    </> :
                    <div className={'email-form'}>
                            <div className={'temp-answer-emf-letter'}>
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
                    }
                </>
            )}
        </div>
    )
}

export default WriteLetterToMan;
