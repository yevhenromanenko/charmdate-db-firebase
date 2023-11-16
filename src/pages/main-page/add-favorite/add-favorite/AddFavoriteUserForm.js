import toggle from "../../../../functions/toggle/toggle";
import React, {useState} from "react";

const AddFavoriteUserForm = ({setShowUserList, showUserList, allUsers, setAllUsers, ladyId}) => {
    const [inputValue, setInputValue] = useState('');

    const handleAddUser = () => {
        if (inputValue !== '') {
            const ids = {
                id: inputValue
            }

            const userExists = allUsers.some(user => user.id === ids.id);
            if (userExists) {
                alert('Постоялец уже добавлен');
                return null;
            }

            const updatedUsers = ([...allUsers, ids]);
            setAllUsers(updatedUsers);
            localStorage.setItem(`userIds-${ladyId}`, JSON.stringify(updatedUsers));

            // Очищаем поле ввода
            setInputValue('');
        }
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <>
            <input
                type="text"
                className={'add-favorite-input'}
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Напишіть ID постояльця"
            />
            <button className={'add-favorite-button'} onClick={handleAddUser}>Додати</button>

            <button className={'show-hide-button-fav'} onClick={toggle(setShowUserList, showUserList)}>
                {showUserList ? 'Сховати ⬆' : 'Постояльці ⬇'}
            </button>
        </>
    )
}
export default AddFavoriteUserForm;
