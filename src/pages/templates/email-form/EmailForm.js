import HandleTagButtonClick from "../handle-tag-button-click/HandleTagButtonClick";
import '../Templates.scss'
import React, {useRef, useState} from "react";
import GetPhotos from "../../letters/get-photos/GetPhotos";

const EmailForm = ({setLetter, letter, ladyId, firstLetterContent, firstLetter, setFirstLetterContent, setSelectedMail, setSelectedPrivate, setSelectedVideo, setSelectedGift, selectedMail, selectedPrivate, selectedVideo, selectedGift}) => {

    const inputRef = useRef();
    const [showPhoto, setShowPhoto] = useState(false);

    const handleContentChange = (event) => {
        setLetter(event.target.value);
    };

    const handlePhotoClick = () => {
        setShowPhoto(!showPhoto);
    };

    const handleSaveTemplates = async () => {

        if (letter.length < 200) {
            alert('Письмо слишком короткое');
            return;
        }
        if (selectedMail.length === null) {
            alert('Додайте хоча б одне фото!');
            return;
        }


        try {

            if (firstLetter === 'first-letter' || firstLetter === 'bp-letter') {
                const mailPhoto = selectedMail ? selectedMail.name : ''
                const privatePhotoOne = selectedPrivate && selectedPrivate[0] ? selectedPrivate[0] : '';
                const privatePhotoTwo = selectedPrivate && selectedPrivate[1] ? selectedPrivate[1] : '';
                const privatePhotoThree = selectedPrivate && selectedPrivate[2] ? selectedPrivate[2] : '';
                const video = selectedVideo ? selectedVideo.name : '';
                const gift = selectedGift ? selectedGift.name : '';

                const firstLetterObject = {
                    ladyId: ladyId,
                    letter: letter,
                    mailPhoto: mailPhoto,
                    privatePhotoOne: privatePhotoOne,
                    privatePhotoTwo: privatePhotoTwo,
                    privatePhotoThree: privatePhotoThree,
                    video: video,
                    gift: gift,
                };

                // Получить предыдущий объект письма из локального хранилища, если он существует
                const previousLetterContent = JSON.parse(localStorage.getItem(`${firstLetter}-${ladyId}`)) || [];

                if (previousLetterContent.length > 0) {
                    if (previousLetterContent[0].mailPhoto && firstLetterObject.mailPhoto === undefined) {
                        firstLetterObject.mailPhoto = previousLetterContent[0].mailPhoto;
                    }
                    if (previousLetterContent[0].privatePhotoOne && firstLetterObject.privatePhotoOne === undefined) {
                        firstLetterObject.privatePhotoOne = previousLetterContent[0].privatePhotoOne;
                    }
                    if (previousLetterContent[0].privatePhotoTwo && firstLetterObject.privatePhotoTwo === undefined) {
                        firstLetterObject.privatePhotoTwo = previousLetterContent[0].privatePhotoTwo;
                    }
                    if (previousLetterContent[0].privatePhotoThree && firstLetterObject.privatePhotoThree === undefined) {
                        firstLetterObject.privatePhotoThree = previousLetterContent[0].privatePhotoThree;
                    }
                    if (previousLetterContent[0].video && firstLetterObject.video === undefined) {
                        firstLetterObject.video = previousLetterContent[0].video;
                    }
                    if (previousLetterContent[0].gift && firstLetterObject.gift === undefined) {
                        firstLetterObject.gift = previousLetterContent[0].gift;
                    }
                }

                const updatedEmails = previousLetterContent.filter(email => email.ladyId !== firstLetterObject.ladyId);
                updatedEmails.push(firstLetterObject);
                // const updatedEmails = firstLetterContent.filter(email => email.ladyId !== firstLetterObject.ladyId);
                // updatedEmails.push(firstLetterObject);
                // Сохранение обьекта письма в локал сторедж
                localStorage.setItem(`${firstLetter}-${ladyId}`, JSON.stringify(updatedEmails));

                setFirstLetterContent(updatedEmails);
                setLetter(letter);

            } else if (firstLetter === 'videoRequest-letter') {
                const mailPhoto = selectedMail ? selectedMail.name : ''
                const gift = selectedGift ? selectedGift.name : '';

                const videoObject = {
                    ladyId: ladyId,
                    letter: letter,
                    mailPhoto: mailPhoto,
                    gift: gift,
                };
                const updatedEmails = firstLetterContent.filter(email => email.ladyId !== videoObject.ladyId);
                updatedEmails.push(videoObject);
                // Сохранение обьекта письма в локал сторедж
                localStorage.setItem(`${firstLetter}-${ladyId}`, JSON.stringify(updatedEmails));

                setFirstLetterContent(updatedEmails);
                setLetter(letter);

            } else if (firstLetter === 'sayHi-letter') {
                const mailPhoto = selectedMail ? selectedMail.name : ''

                const sayHiObject = {
                    ladyId: ladyId,
                    letter: letter,
                    mailPhoto: mailPhoto,
                };
                const updatedEmails = firstLetterContent.filter(email => email.ladyId !== sayHiObject.ladyId);
                updatedEmails.push(sayHiObject);
                // Сохранение обьекта письма в локал сторедж
                localStorage.setItem(`${firstLetter}-${ladyId}`, JSON.stringify(updatedEmails));
                setFirstLetterContent(updatedEmails);
                setLetter(letter);
            }

            alert('Лист було збережено');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="email-form">
            <div>
                <div className="tag-buttons">
                    <button className="tag-button-letter" onClick={() => HandleTagButtonClick('%Name%', 'letter', setLetter, letter, inputRef)}>Ім'я</button>
                    <button className="tag-button-letter" onClick={() => HandleTagButtonClick('%Age%', 'letter', setLetter, letter, inputRef)}>Вік</button>
                    <button className="tag-button-letter" onClick={() => HandleTagButtonClick('%Country%', 'letter', setLetter, letter, inputRef)}>Країна</button>
                    <button className="tag-button-letter" onClick={() => HandleTagButtonClick('%City%', 'letter', setLetter, letter, inputRef)}>Місто</button>
                </div>
                <textarea
                    ref={inputRef}
                    id="content"
                    className={'content-letter'}
                    placeholder={'Напишіть та збережіть лист для шаблону'}
                    name="content"
                    value={letter}
                    onChange={handleContentChange}
                />
                <br/>
                <button className={'btn-photo-mass-letter'} onClick={handlePhotoClick}>
                    {showPhoto ? 'Фото ⬆' : 'Фото ⬇'}
                </button>
                <button className={'btn-save-letter'} onClick={handleSaveTemplates}>Зберегти</button>
            </div>

            {showPhoto && (
                <GetPhotos
                    setSelectedMail={setSelectedMail}
                    selectedPrivate={selectedPrivate}
                    setSelectedPrivate={setSelectedPrivate}
                    setSelectedVideo={setSelectedVideo}
                    setSelectedGift={setSelectedGift}
                    ladyId={ladyId}
                    firstLetter={firstLetter}
                    selectedMail={selectedMail}
                    selectedVideo={selectedVideo}
                    selectedGift={selectedGift}
                />
            )}
        </div>
    )
}

export default EmailForm;
