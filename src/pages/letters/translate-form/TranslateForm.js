import TranslateTextInLetter from "../translate-text-in-letter/TranslateTextInLetter";
import React from "react";
import ToggleLanguage from "./toogleLanguage";
const TranslateForm = ({showTranslateRu, showTranslateUa, trLetter, trLetterUa, setShowTranslateRu, setShowTranslateUa}) => {

    return (
        <>
            <div className={`right-part-letter ${trLetter.length > 1200 ? 'scrollable-letter' : ''}`}>

                <p style={{color: '#e09f3e', fontSize: '16px', display: 'inline'}}>Переклад листа:</p>
                <button className={'show-hide-button-translate'} onClick={() => ToggleLanguage('ru', setShowTranslateRu, setShowTranslateUa)}>
                    {showTranslateRu ? `російською ⬆` : `російською ⬇`}
                </button>
                <button className={'show-hide-button-translate'} onClick={() => ToggleLanguage('ua', setShowTranslateRu, setShowTranslateUa)}>
                    {showTranslateUa ? `Українською ⬆` : `Українською ⬇`}
                </button>

                {showTranslateRu && <TranslateTextInLetter trLetter={trLetter}/>}
                {showTranslateUa && <TranslateTextInLetter trLetter={trLetterUa}/>}
            </div>
        </>
    )
}
export default TranslateForm;
