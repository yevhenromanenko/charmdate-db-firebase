import {BeatLoader} from "react-spinners";
import {override} from "../../../functions/override-css/OverRideCss";
import React from "react";

const TranslateTextInLetter = ({trLetter}) => {

    return (
        <>
            {trLetter.length > 0 ?
            <>
                <p style={{marginLeft: '10px', marginTop: '5px'}} className={'content-letter-use-answer-emf'}>
                    {trLetter.split('<br>').map((paragraph, index) => (
                        <p style={{color: 'white'}} key={index}>{paragraph}</p>
                    ))}
                </p>
            </> :
            <>
                <div className={'loading-form'}>
                    <p className={"info-about"}>Завантаження перекладу...</p>
                    <BeatLoader css={override} size={15} color={"#ececf1"} />
                </div>
            </>}
        </>
    )
}
export default TranslateTextInLetter;
