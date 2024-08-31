import axios from "axios";

const getLetterFromServer = async (letter, ladyId) => {
    try {
        const res = await axios.get(`https://charmdate-db-default-rtdb.europe-west1.firebasedatabase.app/${letter}/${ladyId}.json`);
        const resData = res.data;
        const letterData = resData.letterData;

        return letterData

    } catch (e) {
        console.log('mb no data, so error:', letter)
    }
}

export default getLetterFromServer;
