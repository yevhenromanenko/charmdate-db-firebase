import axios from "axios";

const saveLetterToServer = async (letter, ladyId, letterData) => {
    try {
        const response = await axios.put(`https://charmdate-db-default-rtdb.europe-west1.firebasedatabase.app/${letter}/${ladyId}.json`, {letterData});
        const savedLetter = response.data;

        console.log(savedLetter, 'savedLetter')

    } catch (error) {
        console.error('Ошибка при сохранении письма:', error);
    }
}

export default saveLetterToServer;
