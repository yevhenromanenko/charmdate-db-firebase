import RenderAdmireMail from "../main-page/admire-mail/RenderAdmireMail";
import React, {useEffect, useState} from "react";
import AdmireMail from "../main-page/admire-mail/AdmireMail";

const AdmireMailPage = ({ladyId}) => {
    const [admire, setAdmire] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const admireMail = await AdmireMail(ladyId);
            setAdmire(admireMail);
        }

        fetch();
    }, []);

    return (
        <>
            <div>
                <RenderAdmireMail
                    admire={admire}
                    setAdmire={setAdmire}
                    ladyId={ladyId}
                />
            </div>
        </>
    )

}
export default AdmireMailPage;
