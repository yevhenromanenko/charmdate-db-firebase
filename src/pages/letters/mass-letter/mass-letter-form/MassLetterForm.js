import HandleTagButtonClick from "../../../templates/handle-tag-button-click/HandleTagButtonClick";
import './MassLetterForm.scss'
import React, {useRef, useState} from "react";
import GetPhotos from "../../get-photos/GetPhotos";
import StopSendLetter from "../stop-send-letter/StopSendLetter";
import StartSendLetter from "../start-send-letter/StartSendLetter";

const MassLetterForm = ({telNumber, ladyId, massLetter, setMassLetter, setCountMassLetter, setErrMassLetter, isSendingMassLetter, sendingIntervalMassLetter, setIsSendingMassLetter, setSendingIntervalMassLetter, menForMassLetter, banUsers}) => {

    const massLetterCheckBoxForAllPhotos = '1';
    const answerFrom = 'mass-letter'
    const [showPhoto, setShowPhoto] = useState(false);
    const inputRef = useRef();
    const [checkAllPrivatePhoto, setCheckAllPrivatePhoto] = useState(false); // State для галочки

    const [selectedMail, setSelectedMail] = useState(null);
    const [selectedPrivate, setSelectedPrivate] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [selectedGift, setSelectedGift] = useState(null);

    const onPrivatePhotoChange = (e) => {
        setCheckAllPrivatePhoto(e.target.checked);
    }

    const startSendingMassLetter = () => {
        StartSendLetter(telNumber, ladyId, setCountMassLetter, massLetter, selectedMail, selectedPrivate, selectedVideo, setIsSendingMassLetter, setErrMassLetter, setSendingIntervalMassLetter, menForMassLetter, selectedGift, checkAllPrivatePhoto, banUsers);
    }

    const stopSendingMassLetter = () => {
        StopSendLetter(sendingIntervalMassLetter, setIsSendingMassLetter)
    };

    const handlePhotoClick = () => {
        setShowPhoto(!showPhoto);
    };

    return (
        <div className="email-form">
            <div>
                <div className="tag-buttons">
                    <button className="tag-button-letter" onClick={() => HandleTagButtonClick('%Name%', 'letter', setMassLetter, massLetter, inputRef)}>Ім'я</button>
                    <button className="tag-button-letter" onClick={() => HandleTagButtonClick('%Age%', 'letter', setMassLetter, massLetter, inputRef)}>Вік</button>
                    <button className="tag-button-letter" onClick={() => HandleTagButtonClick('%Country%', 'letter', setMassLetter, massLetter, inputRef)}>Країна</button>
                    <button className="tag-button-letter" onClick={() => HandleTagButtonClick('%City%', 'letter', setMassLetter, massLetter, inputRef)}>Місто</button>
                </div>
                <textarea
                    ref={inputRef}
                    id="content"
                    className={'content-letter'}
                    placeholder={'Напишіть лист та починайте розсилку'}
                    name="content"
                    value={massLetter}
                    onChange={(e) => setMassLetter(e.target.value)}
                />
                <br/>
                <button className={'btn-photo-mass-letter'} onClick={handlePhotoClick}>
                    {showPhoto ? 'Фото ⬆' : 'Фото ⬇'}
                </button>

                {isSendingMassLetter ? (
                    <button className={'btn-save-letter'} onClick={stopSendingMassLetter}>Зупинити</button>
                ) : (
                    <button className={'btn-save-letter'} onClick={startSendingMassLetter}>Почати</button>
                )}
            </div>

            {showPhoto && (
                    <GetPhotos
                        setSelectedMail={setSelectedMail}
                        selectedPrivate={selectedPrivate}
                        setSelectedPrivate={setSelectedPrivate}
                        setSelectedVideo={setSelectedVideo}
                        setSelectedGift={setSelectedGift}
                        ladyId={ladyId}
                        checkAllPrivatePhoto={checkAllPrivatePhoto}
                        onPrivatePhotoChange={onPrivatePhotoChange}
                        massLetterCheckBoxForAllPhotos={massLetterCheckBoxForAllPhotos}
                        answerFrom={answerFrom}
                    />
            )}
        </div>
    )
}

export default MassLetterForm;
