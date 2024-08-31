import React from 'react';
import GetAllDataFromLocalStorage from "../get-all-data-from-local-storage/GetAllDataFromLocalStorage";

const LocalStorageDataRenderer = () => {

    const dataFromLocalStorage = GetAllDataFromLocalStorage();
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
            <>
                <div className={'login-data'}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        {/*<a style={{color: 'peru', fontSize: '14px'}} href={'https://www.charmdate.com/clagt/loginb.htm'} rel="noopener noreferrer">вхід адміна</a>*/}
                        <button onClick={() => window.open('https://www.charmdate.com/clagt/loginb.htm')} style={{ cursor: 'pointer', background: 'none', border: 'none', color: '#ececf1', fontSize: '16px' }}>вхід адміна</button>
                    </div>
                    <h2 style={{color: '#ececf1', marginLeft: '10px', marginBottom: '5px'}}>Збережені профайли:</h2>
                    {renderData()}
                    <hr/>
                </div>

            </>
            :
            <>
                <div className={'login-data'}>
                    <p  style={{color: '#ececf1', fontSize: '18px'}}>Нема збережених профайлів!</p>
                    <hr/>
                    <div>
                        <a style={{color: 'peru', fontSize: '14px'}} href={'https://www.charmdate.com/clagt/loginb.htm'} rel="noopener noreferrer">вхід адміна</a>
                    </div>
                </div>
            </>

    );
};

export default LocalStorageDataRenderer;
