import React, {useEffect, useState} from "react";
import StopSendLetter from "../letters/mass-letter/stop-send-letter/StopSendLetter";
import StartSendCalls from "./StartSendCalls";

const CallsForm = ({ladyId, isSendingCalls, setIsSendingCalls, sendingIntervalCalls, setSendingIntervalCalls, menForCalls, banUsers, setErrCalls, setCountCalls, telNumber}) => {

    const [errSending, setErrSending] = useState(false);

    const startSendingCalls = () => {
        StartSendCalls(telNumber, ladyId, setCountCalls, setIsSendingCalls, setErrCalls, setSendingIntervalCalls, menForCalls, banUsers, errSending, setErrSending);
    }

    const stopSendingCalls = () => {
        StopSendLetter(sendingIntervalCalls, setIsSendingCalls)
    };

    return (
        <>
            {isSendingCalls ? (
                <button style={{marginLeft: '3%'}} className={'btn-save-letter'} onClick={stopSendingCalls}>Зупинити</button>
            ) : (
                <button style={{marginLeft: '3%'}} className={'btn-save-letter'} onClick={startSendingCalls}>Почати</button>
            )}
        </>
    )
}

export default CallsForm;
