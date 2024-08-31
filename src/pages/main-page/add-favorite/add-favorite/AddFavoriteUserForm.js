import toggle from "../../../../functions/toggle/toggle";
import React, {useState} from "react";

const AddFavoriteUserForm = ({setShowUserList, showUserList, allUsers, setAllUsers, ladyId}) => {
    const [inputValue, setInputValue] = useState('');

    const isValidUserId = (userId) => {
        // Используйте регулярное выражение для проверки формата
        const regex = /^CM\d+$/;
        return regex.test(userId);
    };

    const handleAddUser = () => {
        if (inputValue !== '') {

            const formattedId = inputValue.trim();

            if (!isValidUserId(formattedId)) {
                alert('ID користувача повинен починатися з CM і містити тільки цифри');
                return null;
            }

            const ids = {
                id: formattedId
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
