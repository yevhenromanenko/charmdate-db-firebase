import React from "react";

const AnswerForm = ({content, setContent, SendingLetter, setShowPhoto, showPhoto, placeholder}) => {

    const handlePhotoClick = () => {
        setShowPhoto(!showPhoto);
    };

    return (
        <>
             <textarea
                 id="content"
                 className={'content-letter'}
                 placeholder={placeholder}
                 name="content"
                 value={content}
                 onChange={(e) => setContent(e.target.value)}
             />
            <br/>
            <button className={'btn-photo-mass-letter'} onClick={handlePhotoClick}>
                {showPhoto ? 'Фото ⬆' : 'Фото ⬇'}
            </button>

            <button className={'btn-answer-letter'} onClick={SendingLetter}>Надіслати</button>

        </>
    )
}

export default AnswerForm;
