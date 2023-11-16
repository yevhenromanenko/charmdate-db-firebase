import React from 'react';

const LocalStorageDataRenderer = () => {
    const getAllDataFromLocalStorage = () => {
        const localStorageData = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.includes('loginData-')) {
                const data = JSON.parse(localStorage.getItem(key));
                localStorageData.push(data);
            }
        }
        return localStorageData;
    };

    const dataFromLocalStorage = getAllDataFromLocalStorage();
    const renderData = () => {
        return dataFromLocalStorage.map((data) => (
            <>
                <button className={'button-login-data'} onClick={() => fillFields(data.ladyId, data.password)}>{data.ladyName}</button>
            </>
        ));
    };

    const fillFields = (ladyId, password) => {

        if (ladyId && password) {
            const loginInputs = document.querySelectorAll('.login_inpout');
            loginInputs.forEach(input => {
                if (input.name === 'profileid') {
                    input.value = ladyId;
                } else if (input.name === 'password') {
                    input.value = password;
                }
            });
        }
    };

    return (
        dataFromLocalStorage.length > 0 ?
            <div className={'login-data'}>
                <h2 style={{color: '#ececf1', marginLeft: '10px', marginBottom: '5px'}}>Збережені профайли:</h2>
                {renderData()}
                <hr/>
            </div>
            :
            <div className={'login-data'}>
                <p  style={{color: '#ececf1', fontSize: '18px'}}>Нема збережених профайлів!</p>
            </div>
    );
};

export default LocalStorageDataRenderer;
