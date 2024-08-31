import {useEffect, useState} from "react";
import CheckOnlineStatus from "./CheckOnlineStatus";

const IsOnline = ({ladyId}) => {
    const [online, setOnline] = useState('0');

    useEffect(() => {
        const fetch = async () => {
            const isOnline = await CheckOnlineStatus(ladyId);
            setOnline(isOnline);
        }
        fetch();

    }, [online, ladyId]);


    return (
        <>
            {online === "1" ? <span style={{color: '#059a3a'}}><br/><strong>online</strong></span> : <span style={{color: '#f22c3d'}}><br/><strong>- - -</strong></span>}
        </>
    )
}

export default IsOnline;
