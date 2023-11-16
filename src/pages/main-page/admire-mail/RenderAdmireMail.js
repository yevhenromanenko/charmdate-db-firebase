import './RenderAdmireMail.scss'
import React, {useEffect, useState} from "react";
import DeleteAdmire from "./delete-admire/DeleteAdmire";
import {BeatLoader} from "react-spinners";
import {override} from "../../../functions/override-css/OverRideCss";
import StartSendAdmire from "./send-admire/StartSendAdmire";
import GetAdmireManIds from "./get-admire-man-ids/GetAdmireManIds";
import GetLoginData from "../../../functions/get-login-data/GetLoginData";
import StopSendAdmire from "./send-admire/StopSendAdmire";
import UseLocalStorage from "../use-local-storage/UseLocalStorage";

const RenderAdmireMail = ({admire, setAdmire, loginData}) => {

    const [show, setShow] = useState(false);
    const [isSendingAdmire, setIsSendingAdmire] = useState(false);
    const [sendingIntervalAdmire, setSendingIntervalAdmire] = useState(null);
    const [countAdmire, setCountAdmire] = UseLocalStorage("todayCount", 0);

    const [errAdmire, setErrAdmire] = useState(0)
    const [selectedAdmire, setSelectedAdmire] = useState([]); // State to track selected admire items
    const [admireManIds, setAdmireManIds] = useState([]);
    const [lastSavedDate, setLastSavedDate] = UseLocalStorage("lastSavedDate", new Date().toISOString().slice(0, 10));
    const [ladyId, setLadyId] = useState('');


    useEffect(() => {
        const savedSelectedAdmire = localStorage.getItem("selectedAdmire");
        if (savedSelectedAdmire) {
            setSelectedAdmire(JSON.parse(savedSelectedAdmire));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("selectedAdmire", JSON.stringify(selectedAdmire));
    }, [selectedAdmire]);

    useEffect(() => {
        async function fetchDataAsync() {
            try {

                const loginData = await GetLoginData();
                setLadyId(loginData.loginUserId)
                const generator = GetAdmireManIds(loginData);

                let result;
                for await (const data of generator) {
                    result = data;
                    setAdmireManIds(prevIds => [...prevIds, ...result]); // Добавление новых данных к предыдущим
                }
            } catch (error) {
                // Обработка ошибки
                console.error(error);
            }
        }
        fetchDataAsync();

    }, []);

    const handleClick = () => {
        setShow(!show);
    };

    const toggleSelectAdmire = (admireId) => {
        setSelectedAdmire((prevSelected) =>
            prevSelected.includes(admireId) ? prevSelected.filter((id) => id !== admireId) : [...prevSelected, admireId]
        );
    };

    const startSendingAdmire = async () => {
        if (admireManIds.length > 150 && ladyId.length > 0) {
            StartSendAdmire(selectedAdmire, setIsSendingAdmire, setSendingIntervalAdmire, admireManIds, setErrAdmire, setCountAdmire, lastSavedDate, setLastSavedDate, ladyId, sendingIntervalAdmire, isSendingAdmire);
        } else {
            alert('Зачекайте 10 сек, завантажую користувачів...')
        }
    };

    const stopSendingAdmire = () => {
          StopSendAdmire(sendingIntervalAdmire, setIsSendingAdmire)
    };

    const addAdmireMail = () => {
        const url = `https://www.charmdate.com/clagt/admire/template/add2.php?womanid=${loginData.loginUserId}`;
        window.open(url, '_blank');
    };

    if (admire.length > 0) {
        return (
            <>
                <div className="add-admire-container">
                    <button className={'show-hide-button'} onClick={handleClick}>
                        {show ? 'Admire Mail ⬆' : 'Admire Mail ⬇'}
                    </button>
                    <button className={'letter-button-letter'} onClick={addAdmireMail}>
                        Додати Admire Mail
                    </button>
                    {isSendingAdmire ? (
                        <button className={'letter-button-letter'} onClick={stopSendingAdmire}>Зупинити розсилку</button>
                    ) : (
                        <button className={'letter-button-letter'} onClick={startSendingAdmire}>Почати розсилку</button>
                    )}
                    <p className={"info-about"}>Готові до розсилки: {admire.length}, знайдено чоловіків: {admireManIds.length}</p>
                    <span className={"info-about"}>Надіслано: {countAdmire}/50, помилки: {errAdmire}</span>


                    {show && (
                        <div style={{borderTop: '1px solid #ddd'}}>
                            <p className={"info-about-admire"}>Admire Mail розсилка - лист-листівка, який дівчина надсилає чоловікові для збільшення кількості відповідей від чоловіка.</p>
                            <ul className={`invite-list ${admire.length > 3 ? 'scrollable' : ''}`}>
                                {admire.map((item) => (
                                    <li className="invite-item" key={item.admireId}>
                                        <span style={{ maxWidth: '75%' }}>{item.textMatches}</span>
                                        <div>
                                            {item.imgUrls.map((url, index) => (
                                                <a style={{alignItems: "center"}} key={index} href={`https://www.charmdate.com/album_pics/${url}`} target="_blank" rel="noopener noreferrer">
                                                    <img src={`https://www.charmdate.com/album_pics/${url}`} alt={`img-${index}`} style={{ marginRight: '15px', display: 'inline', maxWidth: '25px', maxHeight: '35px' }} />
                                                </a>
                                            ))}
                                            <input
                                                type="checkbox"
                                                checked={selectedAdmire.includes(item.admireId)}
                                                onChange={() => toggleSelectAdmire(item.admireId)}
                                            />
                                            <button className="delete-button" onClick={() => window.open(`https://www.charmdate.com/clagt/admire/template/browse.php?womanid=${item.ladyId}&at_code=${item.admireId}&status=A`, '_blank')}>Перейти</button>
                                            <button className="delete-button" onClick={() => DeleteAdmire(setAdmire, admire, item.ladyId, item.admireId)}>Видалити</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className={'admire-form'}>
                    <p className={"info-about"}>Розсилка Admire Mail, для збільшення кількості відповідей від чоловіків.</p>
                    <BeatLoader css={override} size={15} color={"#ececf1"} />
                    <p className={"info-about"}>Завантаження Admire Mails... {admire.length}</p>
                </div>
            </>
        )
    }
}
export default RenderAdmireMail;
