import toggle from "../../../../functions/toggle/toggle";
import React, {useState} from "react";
import RemoveUser from "../../../../functions/remove-ban-users/RemoveUsers";


const AddBanUserForm = ({banUsers, setBanUsers, ladyId, showInputFirst}) => {
    const [banInputValue, setBanInputValue] = useState(''); // New state for ban input
    const [showUserBanList, setShowUserBanList] = useState(false); // State for showing ban list


    const handleBanInputChange = (event) => {
        setBanInputValue(event.target.value);
    };
    const addBanUser = () => {
        if (banInputValue !== '') {
            const banIds = {
                id: banInputValue,
            };

            const userExists = banUsers.some((user) => user.id === banIds.id);
            if (userExists) {
                alert('Цей користувач вже заблокований');
                return null;
            }

            const updatedBanUsers = [...banUsers, banIds];
            setBanUsers(updatedBanUsers);
            localStorage.setItem(`userBanIds-${ladyId}`, JSON.stringify(updatedBanUsers));

            // Очищаем поле ввода
            setBanInputValue('');
        }
    };

    return (
        <>
            {showInputFirst ? (
                <>
                    <div style={{borderTop: '1px solid #ddd', margin: '0 10px'}}>
                        <input
                            type="text"
                            className={'add-favorite-input'} // Styling for ban input
                            value={banInputValue}
                            onChange={handleBanInputChange}
                            placeholder="ID користувача для блокування"
                        />
                        <button className={'add-favorite-button'} onClick={addBanUser}>
                            Додати бан юзера
                        </button>
                        <button className={'show-hide-button'} onClick={toggle(setShowUserBanList, showUserBanList)}>
                            {showUserBanList ? 'Сховати ⬆' : 'Бан лист ⬇'}
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <button style={{ marginLeft: '3%' }} className={'show-hide-button-ban'} onClick={toggle(setShowUserBanList, showUserBanList)}>
                        {showUserBanList ? 'Сховати ⬆' : 'Бан лист ⬇'}
                    </button>
                    <button className={'add-favorite-button'} onClick={addBanUser}>
                        Додати бан юзера
                    </button>

                    <input
                        type="text"
                        className={'add-favorite-input'} // Styling for ban input
                        value={banInputValue}
                        onChange={handleBanInputChange}
                        placeholder="ID користувача для блокування"
                    />
                </>
            )}

            {showUserBanList && (
                <div className={'users-ids'}>
                    <p className={'text-user-ids'}>Чоловіки у бані: {banUsers.length}! Додайте ID користувачів, яким не буде відправлено нічого!</p>
                    {banUsers.map((user) => (
                        <>
                            <a href={`https://www.charmdate.com/clagt/admire/men_profile.php?manid=${user.id}`} target="_blank" className="user-item" key={user.id}>
                                {user.id}
                            </a>
                            <button className="delete-id-button" onClick={() => RemoveUser(user.id, setBanUsers, banUsers, ladyId)}>x</button>
                            <span style={{ color: 'white', display: 'inline' }}>{'; '}</span>
                        </>
                    ))}
                </div>
            )}
        </>
    )
}
export default AddBanUserForm;
