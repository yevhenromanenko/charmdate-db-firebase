import React, {useState} from "react";
import toggle from "../../functions/toggle/toggle";

const VipUserForm = ({vipUsers, setVipUsers, ladyId}) => {

    const [vipInputValue, setVipInputValue] = useState('');
    const [showUserVipList, setShowUserVipList] = useState(false);

    const handleVipInputChange = (event) => {
        setVipInputValue(event.target.value);
    };

    const RemoveVipUser = (id, setBanUsers, banUsers, ladyId) => {
        const updatedBanUsers = banUsers.filter((item) => item.id !== id);
        setBanUsers(updatedBanUsers);
        localStorage.setItem(`userVipIds-${ladyId}`, JSON.stringify(updatedBanUsers));
    };

    const addVipUser = () => {
        if (vipInputValue !== '') {
            const vipIds = {
                id: vipInputValue,
            };

            const userExists = vipUsers.some((user) => user.id === vipIds.id);
            if (userExists) {
                alert('Цього користувача було вже додано!');
                return null;
            }

            const updatedVipUsers = [...vipUsers, vipIds];
            console.log(updatedVipUsers, 'updatedVipUsers')
            setVipUsers(updatedVipUsers);
            localStorage.setItem(`userVipIds-${ladyId}`, JSON.stringify(updatedVipUsers));

            // Очищаем поле ввода
            setVipInputValue('');
        }
    };

    return (
        <>
            <button style={{ marginLeft: '17%' }} className={'show-hide-button-ban'} onClick={toggle(setShowUserVipList, showUserVipList)}>
                {showUserVipList ? 'Сховати ⬆' : 'VIP лист ⬇'}
            </button>
            <button className={'add-favorite-button'} onClick={addVipUser}>
                Додати vip юзера
            </button>

            <input
                type="text"
                className={'add-favorite-input'}
                value={vipInputValue}
                onChange={handleVipInputChange}
                placeholder="ID користувача для vip розсилки"
            />

            {showUserVipList && (
                <div className={'users-ids'}>
                    <p className={'text-user-ids'}>Vip чоловіки: {vipUsers.length}! Додайте ID користувачів для VIP розсилки!</p>
                    {vipUsers.map((user) => (
                        <>
                            <a href={`https://www.charmdate.com/clagt/admire/men_profile.php?manid=${user.id}`} target="_blank" className="user-item" key={user.id}>
                                {user.id}
                            </a>
                            <button className="delete-id-button" onClick={() => RemoveVipUser(user.id, setVipUsers, vipUsers, ladyId)}>x</button>
                            <span style={{ color: 'white', display: 'inline' }}>{'; '}</span>
                        </>
                    ))}
                </div>
            )}
        </>
    )
}
export default VipUserForm;
