import { setInterval } from 'worker-timers';
import GetUserInfo from "../../../../functions/get-user-info/GetUserInfo";
import ReplaceTags from "../../../../functions/replace-tags/ReplaceTags";
import CheckForForbiddenTags from "../../../../functions/check-for-forbidden-tags/CheckForForbiddenTags";
import SendMassLetter from "../send-mass-letter/SendMassLetter";
import GetPrivatePhoto from "../../get-photos/get-private-photos/GetPrivatePhotos";
import GenerateRandomNonce from "../../../../functions/generate-random-nonce/GenerateRandomNonce";
import GetRandomIndexes from "../../../../functions/get-random-indexes/GetRandomIndexes";

const StartSendMassLetter = (telNumber, ladyId, setCountMassLetter, massLetter, selectedMail, selectedPrivate, selectedVideo, setIsSendingMassLetter, setErrMassLetter, setSendingIntervalMassLetter, menForMassLetter, selectedGift, checkAllPrivatePhoto, banUsers) => {

    let privatePhotoOne;
    let privatePhotoTwo;
    let privatePhotoThree;

    if (!massLetter || !selectedMail) {
        alert('Заповніть всі необхідні поля та додайти хоча б одне фото до листа!');
        setIsSendingMassLetter(false);
        return;
    }

    const mailPhoto = selectedMail ? selectedMail.name : ''
    const video = selectedVideo ? selectedVideo.name : '';
    const gift = selectedGift ? selectedGift.name : '';


    const finishDate = new Date();
    localStorage.setItem('massLetterFinishDate', finishDate.toISOString());

    setIsSendingMassLetter(true);

    const totalUsersCount = menForMassLetter.length; // Общее количество пользователей
    let processedUsersCount = 0; // Количество обработанных пользователей

    const intervalMassLetter = setInterval(async () => {

        if (processedUsersCount >= totalUsersCount) {
            // Если все пользователи были обработаны, останавливаем рассылку
            clearInterval(intervalMassLetter);
            setIsSendingMassLetter(false);
            alert('Розсилка була завершена! Дякую, повторіть, будь ласка через 5 днів!'); // Уведомление о завершении рассылки
            return;
        }

        const currentUser = menForMassLetter[processedUsersCount];
        processedUsersCount++;

        // const userExists = banUsers.some((user) => user.id === currentUser.manId);
        // if (userExists) {
        //     setErrMassLetter(err => err + 1)
        //     console.log('Спроба відправки користувачу, який у бан листі! Не відправлено!')
        //     return null;
        // }

        const randomUser = await GetUserInfo(currentUser)

        const replaceEmailContent = await ReplaceTags(massLetter, randomUser)

        const hasForbiddenTags = CheckForForbiddenTags(replaceEmailContent);

        if (hasForbiddenTags) {
            setErrMassLetter(err => err + 1)
            console.log('Письмо содержит запрещенные теги. Начинаем заново рассылку');
            return;
        }

        if (checkAllPrivatePhoto) {
            const randomNonce = GenerateRandomNonce();
            const privatePhoto = await GetPrivatePhoto(ladyId, randomNonce, randomUser.id)
            const randomIndexes = GetRandomIndexes(privatePhoto.length, 3);

            privatePhotoOne = privatePhoto[randomIndexes[0]] ? privatePhoto[randomIndexes[0]].name : '';
            privatePhotoTwo = privatePhoto[randomIndexes[1]] ? privatePhoto[randomIndexes[1]].name : '';
            privatePhotoThree = privatePhoto[randomIndexes[2]] ? privatePhoto[randomIndexes[2]].name : '';
        } else {
            privatePhotoOne = selectedPrivate[0] ? selectedPrivate[0].name : '';
            privatePhotoTwo = selectedPrivate[1] ? selectedPrivate[1].name : '';
            privatePhotoThree = selectedPrivate[2] ? selectedPrivate[2].name : '';
        }


        await SendMassLetter(replaceEmailContent, randomUser.id, ladyId, telNumber, mailPhoto, privatePhotoOne, privatePhotoTwo, privatePhotoThree, video, setErrMassLetter, gift, setCountMassLetter)

    }, Math.floor(Math.random() * (40000 - 20000 + 1) + 20000));

    setSendingIntervalMassLetter(intervalMassLetter);

}

export default StartSendMassLetter;


/// делать перед отправкой письма запрос на фото и выбирать 3 рандомных которые не отправлялись , приват фото
// fetch("https://www.charmdate.com/clagt/get-private-images.php?action=images&womanid=C126657&manid=CM24353177&_dc=1698117043535", {
//   "headers": {
//     "accept": "*/*",
//     "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
//     "sec-ch-ua": "\"Chromium\";v=\"118\", \"Google Chrome\";v=\"118\", \"Not=A?Brand\";v=\"99\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"macOS\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "x-requested-with": "XMLHttpRequest"
//   },
//   "referrer": "https://www.charmdate.com/clagt/about/contact_us.php?action=mass-emf",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": null,
//   "method": "GET",
//   "mode": "cors",
//   "credentials": "include"
// });
