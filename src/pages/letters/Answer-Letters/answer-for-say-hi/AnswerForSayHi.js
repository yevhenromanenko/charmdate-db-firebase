import React, {useEffect, useState} from 'react';
import '../../../templates/Templates.scss'
import GetPhotos from "../../get-photos/GetPhotos";
import ReplyTwoSayHi from "./ReplyTwoSayHi";
import GetContent from "../../../../functions/get-content/GetContent";
import SendSayHi from "./SendSayHi";
import AnswerForm from "../answer-form/AnswerForm";
import InfoUserInLetter from "../../info-user-in-letter/InfoUserInLetter";

const AnswerForSayHi = ({ladyId, firstLetter}) => {

    const answerFrom = 'sayHi';
    const placeholder = 'Додайте шаблон, якщо тут його нема, або напишіть лист власноруч!'

    const [count, setCount] = useState(0);
    const [err, setErr] = useState(0);
    const [manId, setManId] = useState(null);
    const [telNumber, setTelNumber] = useState(null);
    const [replyId, setReplyId] = useState(null);

    const [content, setContent] = useState('');
    const [noTemplateFound, setNoTemplateFound] = useState(false);
    const [selectedMail, setSelectedMail] = useState(null);
    const [showPhoto, setShowPhoto] = useState(false);
    const [user, setUser] = useState([]);


    useEffect(() => {
        const getTemplatesFromServer = async () => {
            try {
                const user = await GetContent(firstLetter, ladyId, setNoTemplateFound, setContent, setManId, setTelNumber, setReplyId, setSelectedMail)
                setUser(prev => [...prev, ...user])

            } catch (err) {
                console.error(err);
            }
        };
        getTemplatesFromServer();
    }, [])

    const SendingLetter = async () => {
        await ReplyTwoSayHi(ladyId, manId);

        const mailPhoto = selectedMail ? selectedMail.name || selectedMail : '';
        await SendSayHi(content, ladyId, telNumber, mailPhoto, setErr, setCount, replyId)
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
                                ladyId={ladyId}
                                manId={manId}
                                answerFrom={answerFrom}
                                selectedMail={selectedMail}
                            />
                        )}
                    </div>
            </div>
            )}
        </>
    );
};

export default AnswerForSayHi;
