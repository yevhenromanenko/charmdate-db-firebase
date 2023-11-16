import React, {useEffect, useState} from "react";
import GetMenForMassLetter from "./get-men-for-mass-letter/GetMenForMassLetter";
import './MassLetter.scss'
import MassLetterForm from "./mass-letter-form/MassLetterForm";
import {BeatLoader} from "react-spinners";
import {override} from "../../../functions/override-css/OverRideCss";
import GetTelNumber from "../../../functions/get-tel-number/GetTelNumber";
import AddBanUserForm from "../../main-page/add-favorite/add-ban/AddBanUserForm";
import toggle from "../../../functions/toggle/toggle";

const MassLetter = ({ladyId, banUsers, setBanUsers}) => {

    const [countMassLetter, setCountMassLetter] = useState(0)
    const [errMassLetter, setErrMassLetter] = useState(0)
    const [isSendingMassLetter, setIsSendingMassLetter] = useState(false);
    const [sendingIntervalMassLetter, setSendingIntervalMassLetter] = useState(null);
    const [telNumber, setTelNumber] = useState(null);

    const [menForMassLetter, setMenForMassLetter] = useState(null);
    const [massLetter, setMassLetter] = useState('');
    const [showUsers, setShowUsers] = useState(false); // State for showing ban list
    const [renderedOnce, setRenderedOnce] = useState(false); // Состояние для отслеживания отрисовки один раз

    useEffect(() => {
        async function fetchDataAsync() {
            const men = await GetMenForMassLetter();
            setMenForMassLetter(men)

            const urlLady = `https://www.charmdate.com/clagt/woman/women_preview_profile.php?womanid=${ladyId}`;
            const telNumber = await GetTelNumber(urlLady);
            setTelNumber(telNumber)
        }
        fetchDataAsync();

    }, []);


    useEffect(() => {
        if (!renderedOnce && menForMassLetter && banUsers) {
            const idsAsObjects = menForMassLetter.map((item) => item.manId);
            const bannedUserIds = banUsers.map((bannedUser) => bannedUser.id);
            const filteredUsers = idsAsObjects.filter((user) => !bannedUserIds.includes(user));
            setMenForMassLetter(filteredUsers);
            setRenderedOnce(true); // Помечаем, что отрисовка уже выполнена
        }
    }, [banUsers, menForMassLetter, renderedOnce]);

    const removeUser = (manId) => {
        const updatedUsers = menForMassLetter.filter((item) => item !== manId);
        setMenForMassLetter(updatedUsers);
    };

    return (
        <>
                <>
                    <p className={'info-email-form-mass'}>
                        Масова розсилка листів своїм постояльцям! При масовій розсильці краще обирайте всі приватні фото (є галочка, яка обирає всі фото)!
                    </p>

                    {menForMassLetter ?
                        <>
                        <p className={'info-email-form-mass'}>Знайдено чоловіків: {menForMassLetter.length}
                        <button className={'show-button-mass'} onClick={toggle(setShowUsers, showUsers)}>
                            {showUsers ? 'Сховати ⬆' : 'Показати ⬇'}
                        </button>
                        <p style={{color: '#ececf1', marginLeft: '2%', display: 'inline', borderBottom: '0'}} className={'info-email-form-mass'}>Надіслано сьогодні: {countMassLetter}/{menForMassLetter.length}, помилки: {errMassLetter}</p>
                        </p>

                            {showUsers && (
                                <>
                                    <p style={{color: '#ececf1'}} className={'info-email-form-mass'}>Ви можете видалити чоловіка, якому не хочете відправляти листа!</p>
                                    <div className={'users-ids'}>
                                        {menForMassLetter.map((user) => (
                                            <>
                                                <a href={`https://www.charmdate.com/clagt/admire/men_profile.php?manid=${user}`} target="_blank" className="user-item" key={user}>
                                                    {user}
                                                </a>
                                                <button className="delete-id-button" onClick={() => removeUser(user)}>x</button>
                                                <span style={{color: 'white'}}>{'; '}</span>
                                            </>
                                        ))}
                                    </div>

                                    <AddBanUserForm
                                        banUsers={banUsers}
                                        setBanUsers={setBanUsers}
                                        ladyId={ladyId}
                                        showInputFirst={true}
                                    />

                                </>
                            )}
                        </> :
                        <>
                            <div className={'man-form'}>
                                <p className={"info-about-count-man"}>Завантаження чоловіків...<BeatLoader css={override} size={15} color={"#ececf1"} /></p>
                            </div>
                        </>
                    }
                    <MassLetterForm
                        telNumber={telNumber}
                        ladyId={ladyId}
                        massLetter={massLetter}
                        setMassLetter={setMassLetter}
                        setCountMassLetter={setCountMassLetter}
                        setErrMassLetter={setErrMassLetter}
                        isSendingMassLetter={isSendingMassLetter}
                        sendingIntervalMassLetter={sendingIntervalMassLetter}
                        setIsSendingMassLetter={setIsSendingMassLetter}
                        setSendingIntervalMassLetter={setSendingIntervalMassLetter}
                        menForMassLetter={menForMassLetter}
                        banUsers={banUsers}
                    />
                </>
        </>
    )
}

export default MassLetter;
