import './RenderAdmireMail.scss'
import React, {useEffect, useState} from "react";
import DeleteAdmire from "./delete-admire/DeleteAdmire";
import {BeatLoader} from "react-spinners";
import {override} from "../../../functions/override-css/OverRideCss";
import StartSendAdmire from "./send-admire/StartSendAdmire";
import GetAdmireManIds from "./get-admire-man-ids/GetAdmireManIds";
import StopSendAdmire from "./send-admire/StopSendAdmire";
import UseLocalStorage from "../use-local-storage/UseLocalStorage";
import VipUserForm from "../../Admire-mail-page/VipUserForm";
import Checkbox from "../../../functions/checkbox/Checkbox";

const RenderAdmireMail = ({admire, setAdmire, ladyId}) => {

    const textAllUsers = `Зробити розсилку по всім користувачам`
    const textVipUsers = `Зробити розсилку по VIP користувачам`
    const [vipUsers, setVipUsers] = useState([]);

    const [show, setShow] = useState(false);
    const [isSendingAdmire, setIsSendingAdmire] = useState(false);
    const [sendingIntervalAdmire, setSendingIntervalAdmire] = useState(null);
    const [countAdmire, setCountAdmire] = UseLocalStorage("todayCount", 0);

    const [errAdmire, setErrAdmire] = useState(0)
    const [selectedAdmire, setSelectedAdmire] = useState([]); // State to track selected admire items
    const [admireManIds, setAdmireManIds] = useState([]);
    const [lastSavedDate, setLastSavedDate] = UseLocalStorage("lastSavedDateAdmire", new Date().toISOString().slice(0, 10));

    const [checkAllUsers, setCheckAllUsers] = useState(false); // State для галочки
    const [checkVipUsers, setCheckVipUsers] = useState(false); // State для галочки

    const onAllUsersChange = (e) => {
        setCheckAllUsers(e.target.checked);
    }
    const onVipUsersChange = (e) => {
        setCheckVipUsers(e.target.checked);
    }

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
                let parsedSavedData;
                const currentDate = new Date().toISOString().slice(0, 10);
                const savedData = localStorage.getItem(`admireManIdsData-${ladyId}`);
                const formattedLastSavedDate = lastSavedDate.slice(0, 10);

                if (savedData) {
                    parsedSavedData = JSON.parse(savedData);
                }

                const storedVipUsers = localStorage.getItem(`userVipIds-${ladyId}`);

                if (storedVipUsers) {
                    const parsedStoredVipUsers = JSON.parse(storedVipUsers);
                    setVipUsers(parsedStoredVipUsers);
                }

                if (parsedSavedData && formattedLastSavedDate === currentDate && parsedSavedData.length > 2000) {
                    // Use data from localStorage
                    setAdmireManIds(parsedSavedData);
                } else {
                    // Fetch data and update localStorage
                    const generator = GetAdmireManIds(ladyId);

                    let result;
                    for await (const data of generator) {
                        result = data;
                        setAdmireManIds(prevIds => [...prevIds, ...result]);
                    }

                    // Save data to localStorage
                    setLastSavedDate(currentDate);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchDataAsync();
    }, [lastSavedDate]);


    useEffect(() => {
        const addInLocalStorage = () => {
            localStorage.setItem(`admireManIdsData-${ladyId}`, JSON.stringify([...admireManIds]));
        }
        addInLocalStorage();
    }, [admireManIds]);


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
            StartSendAdmire(selectedAdmire, setIsSendingAdmire, setSendingIntervalAdmire, admireManIds, setErrAdmire, setCountAdmire, lastSavedDate, setLastSavedDate, ladyId, checkAllUsers, checkVipUsers, vipUsers);
        } else {
            alert('Зачекайте 10 сек, завантажую користувачів...')
        }
    };

    const stopSendingAdmire = () => {
          StopSendAdmire(sendingIntervalAdmire, setIsSendingAdmire)
    };

    const addAdmireMail = () => {
        const url = `https://www.charmdate.com/clagt/admire/template/add2.php?womanid=${ladyId}`;
        window.open(url, '_blank');
    };

    if (admire.length > 0) {
        return (
            <>
                <div style={{height: '200px'}} className={"add-admire-container"}>

                    <div className={'left-part'}>
                            <p className={"info-about"}>Готові до розсилки: {selectedAdmire.length}/{admire.length}, знайдено чоловіків: {admireManIds.length}</p>
                            <span className={"info-about"}>Надіслано: {countAdmire}/50, помилки: {errAdmire}</span>
                            <br/>
                            <Checkbox
                                checkCamshareInvite={checkAllUsers}
                                onCamshareInviteChange={onAllUsersChange}
                                text={textAllUsers}

                            />
                            <br/>
                            <Checkbox
                                checkCamshareInvite={checkVipUsers}
                                onCamshareInviteChange={onVipUsersChange}
                                text={textVipUsers}
                            />
                    </div>

                    <div style={{padding: '3px'}} className={'right-part'}>
                        <p style={{marginLeft: '10px'}} className={"info-about"}>Рекомендації щодо розсилки:</p>
                        <ul>
                            <li className={"info-rec"}>не розсилайте у день менше 50 Admire Mail, зараз надіслано: {countAdmire}</li>
                            <li className={"info-rec"}>якщо у вас VIP чоловіків менше 50, тоді продовжіть розсилку по всім чоловікам, зараз VIP чоловіків: {vipUsers.length}</li>
                            <li className={"info-rec"}>додавайте нові Admire Mail на свята та розсилайте їх, АЛЕ не розсилайте після свят ці Admire Mail</li>
                            <li className={"info-rec"}>кожен Admire Mail має бути не менше 120 та не більше 150 символів, та мати 3 найкращі фото</li>
                            <li className={"info-rec"}>ви маєте тільку одну можливість на місяць надіслати Admire Mail чоловіку, тому Admire Mail має бути ідеальним</li>
                        </ul>
                    </div>
                </div>

                <div className={"add-admire-container"}>
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

                    <VipUserForm
                        vipUsers={vipUsers}
                        setVipUsers={setVipUsers}
                        ladyId={ladyId}
                    />

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
