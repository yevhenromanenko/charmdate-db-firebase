import React, {useEffect, useRef, useState} from "react";
import { FaVideo, FaCheck, FaHeart, FaHourglass, FaTimes} from 'react-icons/fa';
import axios from "axios";
import './AddedInvites.scss'
import PersonalInvitesList from "../personal-invites-list/PersonalInvitesList";
import AddNewPersonalInvite from "../add-new-personal-invite/AddNewPersonalInvite";
import AddNewInvite from "../add-new-invite/AddNewInvite";
import AddNewCamshareInvite from "../add-new-camshare-invite/AddNewCamshareInvite";
import HandleTagButtonClick from "../../../templates/handle-tag-button-click/HandleTagButtonClick";
import CheckForForbiddenTags from "../../../../functions/check-for-forbidden-tags/CheckForForbiddenTags";

const AddedInvites = ({invites, setInvites, loginData, invitesPersonal, setInvitesPersonal, invitesCamshare, setInvitesCamshare}) => {

    const [newInvite, setNewInvite] = useState('');
    const inputRef = useRef();

    const [selectedInviteType, setSelectedInviteType] = useState(''); // State for selecting invite type

    const onInviteTypeChange = (e) => {
        setSelectedInviteType(e.target.value);
    };

    const getStatusText = (status) => {
        if (status === "0") {
            return <FaHourglass style={{marginRight: '5px'}} className="hourglass-icon" />;
        } else if (status === "1") {
            return <FaCheck  style={{marginRight: '5px'}} className="check-icon" />;
        } else if (status === "2") {
            return <FaTimes style={{marginRight: '5px'}} className="times-icon" />;
        } else {
            return ""; // You can customize this based on your needs
        }
    };

    const getServiceTypeText = (status) => {
        if (status === "1") {
            return <FaVideo style={{ marginRight: '5px' }} className="video-icon" />
        }  else {
            return ""; // You can customize this based on your needs
        }
    };

    useEffect(() => {
        PersonalInvitesList(setInvitesPersonal)
    }, []);

    useEffect(() => {
        localStorage.setItem('invites-personal', JSON.stringify(invitesPersonal));
    }, [invitesPersonal]);

    const addInvite = async () => {
        if (selectedInviteType === 'personal') {
            AddNewPersonalInvite(newInvite, setInvitesPersonal, invitesPersonal, setNewInvite, loginData);
        } else if (selectedInviteType === 'camshare') {
            const forbiddenTags = CheckForForbiddenTags(newInvite);
            if (forbiddenTags) {
                alert('В інвайті є заборонені теги! Цей інвайт не можна писати з тегами!')
                return
            } else {
                await AddNewCamshareInvite(newInvite, setInvitesCamshare, invitesCamshare, setNewInvite, loginData);
            }
        } else {
            const forbiddenTags = CheckForForbiddenTags(newInvite);
            if (forbiddenTags) {
                alert('В інвайті є заборонені теги! Цей інвайт не можна писати з тегами!')
                return
            } else {
                await AddNewInvite(newInvite, setInvites, invites, setNewInvite, loginData);
            }
        }
    }

    const deleteInvitePersonal = (id) => {
        const updatedInvites = invitesPersonal.filter(item => item.msgid !== id);
        setInvitesPersonal(updatedInvites);
    };

    const deleteInvite = async (id, ladyId) => {
        try {
            const updatedInvites = invites.filter(item => item.msgid !== id);
            setInvites(updatedInvites);

            await axios.post(
                "https://www.charmdate.com/livechat/setstatus.php?action=ladydeleteinvitetemplate",
                `curwomanid=${ladyId}&womanid=${ladyId}&msgid=${id}`,
                {
                    headers: {
                        "accept": "*/*",
                        "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "x-requested-with": "XMLHttpRequest"
                    },
                    referrer: "https://www.charmdate.com/lady/online.php",
                    referrerPolicy: "strict-origin-when-cross-origin",
                }
            );

        } catch (error) {
            console.error("Error deleting invite:", error);
        }
    };

    const deleteCamshareInvite = async (id, ladyId) => {
        try {
            const updatedInvites = invitesCamshare.filter(item => item.msgid !== id);
            setInvitesCamshare(updatedInvites);

            // await axios.post(
            //     "https://www.charmdate.com/livechat/setstatus.php?action=ladydeleteinvitetemplate",
            //     `curwomanid=${ladyId}&womanid=${ladyId}&msgid=${id}`,
            //     {
            //         headers: {
            //             "accept": "*/*",
            //             "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
            //             "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            //             "x-requested-with": "XMLHttpRequest"
            //         },
            //         referrer: "https://www.charmdate.com/lady/online.php",
            //         referrerPolicy: "strict-origin-when-cross-origin",
            //     }
            // );

        } catch (error) {
            console.error("Error deleting invite:", error);
        }
    };


    return (
            <>
                <div className="add-invites-container">
                    <h1 className="add-invites-title">Інвайти:</h1>
                    <div className="tag-buttons">
                        <button className="tag-button-letter" onClick={() => HandleTagButtonClick('%Name%', 'invite', setNewInvite, newInvite, inputRef)}>Ім'я</button>
                        <button className="tag-button-letter" onClick={() => HandleTagButtonClick('%Age%', 'invite', setNewInvite, newInvite, inputRef)}>Вік</button>
                        <button className="tag-button-letter" onClick={() => HandleTagButtonClick('%Country%', 'invite', setNewInvite, newInvite, inputRef)}>Країна</button>
                        <button className="tag-button-letter" onClick={() => HandleTagButtonClick('%City%', 'invite', setNewInvite, newInvite, inputRef)}>Місто</button>
                    </div>
                    <input
                        ref={inputRef}
                        className="add-invites-input"
                        type="text"
                        value={newInvite}
                        onChange={(e) => setNewInvite(e.target.value)}
                        placeholder="Напишіть інвайт"
                    />
                    <br/>
                    <select
                        className="invite-type-select"
                        value={selectedInviteType}
                        onChange={onInviteTypeChange}
                    >
                        <option value="">Інвайт для всіх</option>
                        <option value="personal">Персональний інвайт</option>
                        <option value="camshare">Camshare інвайт</option>
                    </select>
                    <button style={{display: 'inline'}} className="add-invites-button" onClick={addInvite}>Додати</button>

                    <br/>
                    <div>
                        { invites.length > 0 &&
                        <div>
                            <ul className={`invite-list ${(invites.length + invitesCamshare.length + invitesPersonal.length) > 4 ? 'scrollable' : ''}`}>
                                {invites.map((invite) => (
                                    <li className="invite-item" key={invite.msgid}>
                                        <span style={{maxWidth: '72%'}}>{invite.msg}</span>
                                        <div>
                                            <span style={{marginRight: '5px', display: 'inline'}}>{getServiceTypeText(invite.service_type)}</span>
                                            <span style={{marginRight: '5px', display: 'inline'}}>{getStatusText(invite.status)}</span>
                                            <button className="delete-button" onClick={() => deleteInvite(invite.msgid, loginData.loginUserId)}>Видалити</button>
                                        </div>
                                    </li>
                                ))}
                                {invitesCamshare.map((invite) => (
                                    <li className="invite-item" key={invite.msgid}>
                                        <span style={{maxWidth: '72%'}}>{invite.msg}</span>
                                        <div>
                                            <span style={{marginRight: '5px', display: 'inline'}}>{getServiceTypeText(invite.service_type)}</span>
                                            <span style={{marginRight: '5px', display: 'inline'}}>{getStatusText(invite.status)}</span>
                                            <button className="delete-button" onClick={() => deleteCamshareInvite(invite.msgid, loginData.loginUserId)}>Видалити</button>
                                        </div>
                                    </li>
                                ))}
                                {invitesPersonal.map((invite) => (
                                    <li className="invite-item" key={invite.msgid}>
                                        {invite.msg}
                                        <div>
                                            <FaHeart style={{marginRight: '5px'}}/>
                                            <button className="delete-button" onClick={() => deleteInvitePersonal(invite.msgid)}>Видалити</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        }
                    </div>
                </div>
            </>
        )
};

export default AddedInvites;

