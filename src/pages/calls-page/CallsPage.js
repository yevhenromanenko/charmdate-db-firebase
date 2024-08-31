import toggle from "../../functions/toggle/toggle";
import AddBanUserForm from "../main-page/add-favorite/add-ban/AddBanUserForm";
import {BeatLoader} from "react-spinners";
import {override} from "../../functions/override-css/OverRideCss";
import React, {useEffect, useState} from "react";
import '../letters/mass-letter/MassLetter.scss'
import CallsForm from "./CallsForm";
import GetMenForMassLetter from "../letters/mass-letter/get-men-for-mass-letter/GetMenForMassLetter";
import GetTelNumber from "../../functions/get-tel-number/GetTelNumber";

const CallsPage = ({ladyId, banUsers, setBanUsers}) => {
    const [menForCalls, setMenForCalls] = useState(null);
    const [showUsers, setShowUsers] = useState(false); // State for showing ban list
    const [errCalls, setErrCalls] = useState(0)
    const [countCalls, setCountCalls] = useState(0)
    const [isSendingCalls, setIsSendingCalls] = useState(false);
    const [sendingIntervalCalls, setSendingIntervalCalls] = useState(null);
    const [telNumber, setTelNumber] = useState(null);
    const [renderedOnce, setRenderedOnce] = useState(false); // Состояние для отслеживания отрисовки один раз

    const removeUser = (manId) => {
        const updatedUsers = menForCalls.filter((item) => item !== manId);
        setMenForCalls(updatedUsers);
    };

    useEffect(() => {
        async function fetchDataAsync() {
            const men = await GetMenForMassLetter();
            setMenForCalls(men)

            const urlLady = `https://www.charmdate.com/clagt/woman/women_preview_profile.php?womanid=${ladyId}`;
            const telNumber = await GetTelNumber(urlLady);
            setTelNumber(telNumber)
        }
        fetchDataAsync();

    }, []);

    useEffect(() => {
        if (!renderedOnce && menForCalls && banUsers) {
            const idsAsObjects = menForCalls.map((item) => item.manId);
            const bannedUserIds = banUsers.map((bannedUser) => bannedUser.id.trim());
            const filteredUsers = idsAsObjects.filter((user) => !bannedUserIds.includes(user));

            setMenForCalls(filteredUsers);
            setRenderedOnce(true); // Помечаем, что отрисовка уже выполнена
        }
    }, [banUsers, menForCalls, renderedOnce]);


    return (
        <>
            <p className={'info-email-form-mass'}>
                Calls – запит на дзвінок. Якщо чоловік прийме цей запит, то можно буде йому зробити дзвінок, <br/> якщо ви не хочете дзвонити йому, тоді ви просто заробите 1 кредит (але прийдеться пояснити чоловіку у листі чому ви не хочете дзвонити йому) <br/> <br/>

                Список вже підтверджених запитів <a className={'a-calls'} href={'https://www.charmdate.com/clagt/lovecall/index.php?flag=2'} target={'_blank'}>тут</a>. <br/>  Список запитів, які очікують на підтвердження від чоловіка <a className={'a-calls'} href={'https://www.charmdate.com/clagt/lovecall/index.php?flag=1'} target={'_blank'}>тут</a>.

                <br/> <br/> Користь від функції в тому, що дуже мало хто надсилає такі запити чоловікам, а у чоловіків цілий розділ присвячений цьому. <br/> І вони бачать дівчат, які їм надсилають ці запити. Чоловік може відповісти листом на такий запит і це може перерости у листування.
            </p>

            {menForCalls ?
                <>
                    <p className={'info-email-form-mass'}>Знайдено чоловіків: {menForCalls.length}
                        <button className={'show-button-mass'} onClick={toggle(setShowUsers, showUsers)}>
                            {showUsers ? 'Сховати ⬆' : 'Показати ⬇'}
                        </button>
                        <p style={{color: '#ececf1', marginLeft: '2%', display: 'inline', borderBottom: '0'}} className={'info-email-form-mass'}>Надіслано сьогодні: {countCalls}/{menForCalls.length}, помилки: {errCalls}</p>

                        <CallsForm
                            ladyId={ladyId}
                            isSendingCalls={isSendingCalls}
                            setIsSendingCalls={setIsSendingCalls}
                            sendingIntervalCalls={sendingIntervalCalls}
                            setSendingIntervalCalls={setSendingIntervalCalls}
                            menForCalls={menForCalls}
                            banUsers={banUsers}
                            setErrCalls={setErrCalls}
                            setCountCalls={setCountCalls}
                            telNumber={telNumber}
                        />
                    </p>


                    {showUsers && (
                        <>
                            <p style={{color: '#ececf1'}} className={'info-email-form-mass'}>Ви можете видалити чоловіка, якому не хочете відправляти листа!</p>
                            <div className={'users-ids'}>
                                {menForCalls.map((user) => (
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

        </>
    )
}
export default CallsPage;
