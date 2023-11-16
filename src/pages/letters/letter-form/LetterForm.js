import InfoUserInLetter from "../info-user-in-letter/InfoUserInLetter";
import toggle from "../../../functions/toggle/toggle";
import React from "react";
const LetterForm = ({user, mail, setShowMail, showMail}) => {

    return (
        <>
            <div className={`left-part-letter ${mail.textLetter.length > 1200 ? 'scrollable-letter' : ''}`}>

                <div style={{borderBottom: '1px solid #ddd', padding: '5px'}}>
                    <InfoUserInLetter user={user}/>
                </div>

                <p style={{marginLeft: '10px', marginTop: '5px'}} className={'content-letter-use-answer-emf'}>
                    {mail.textLetter.split('<br>').map((paragraph, index) => (
                        <p style={{color: 'white'}} key={index}>{paragraph}</p>
                    ))}
                </p>

                {mail.photoLetter.length > 0 && (
                    <div style={{marginLeft: '10px'}}>
                        <button className={'show-hide-button-mass'} onClick={toggle(setShowMail, showMail)}>
                            {showMail ? `Фото чоловіка ⬆` : `Фото чоловіка ⬇`}
                        </button>

                        {showMail && (
                            <>
                                {/*тут перебрать фото*/}
                                <p><img className={'photo-answer-emf'} src={`https://www.charmdate.com${mail.photoLetter}`}/></p>
                                <p className={'type-answer-emf'}>{mail.typePhoto}</p>
                            </>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}

export default LetterForm;
