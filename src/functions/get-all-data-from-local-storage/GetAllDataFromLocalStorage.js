

const GetAllDataFromLocalStorage = () => {
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

export default GetAllDataFromLocalStorage;
