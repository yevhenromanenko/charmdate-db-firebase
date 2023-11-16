import React, {useState} from 'react';
import './AddFavorite.css'
import RemoveUser from "../../../../functions/remove-ban-users/RemoveUsers";
import AddBanUserForm from "../add-ban/AddBanUserForm";
import AddFavoriteUserForm from "./AddFavoriteUserForm";

const AddFavorite = ({ladyId, allUsers, setAllUsers, banUsers, setBanUsers}) => {

    const [showUserList, setShowUserList] = useState(false)

    return (
        <div className={'add-favorite-container'}>

            <AddFavoriteUserForm
                setShowUserList={setShowUserList}
                showUserList={showUserList}
                allUsers={allUsers}
                setAllUsers={setAllUsers}
                ladyId={ladyId}
            />

            <AddBanUserForm
                banUsers={banUsers}
                setBanUsers={setBanUsers}
                ladyId={ladyId}
                showInputFirst={false}
            />

            {showUserList && (
                <div className={'users-ids'}>
                    <p className={'text-user-ids'}>Постояльці: {allUsers.length}! Додайте ID чоловіків, яким буде відправлено "персональні інвайти" для постояльців, а також, для яких буде зроблена "масова розсилка"!</p>
                    {allUsers.map((user) => (
                        <>
                            <a href={`https://www.charmdate.com/clagt/admire/men_profile.php?manid=${user.id}`} target="_blank" className="user-item" key={user.id}>
                                {user.id}
                            </a>
                            <button className="delete-id-button" onClick={() => RemoveUser(user.id, setAllUsers, allUsers, ladyId)}>x</button>
                            <span style={{color: 'white', display: 'inline'}}>{'; '}</span>
                        </>
                    ))}
                </div>
            )}

        </div>
    );
};

export default AddFavorite;
