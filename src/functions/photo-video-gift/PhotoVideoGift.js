import GetPrivatePhoto from "../../pages/letters/get-photos/get-private-photos/GetPrivatePhotos";
import GenerateRandomNonce from "../generate-random-nonce/GenerateRandomNonce";


const PhotoVideoGift = async (selectedMail, selectedPrivate, selectedVideo, selectedGift, ladyId, manId) => {
    let privatePhotoOne;
    let privatePhotoTwo;
    let privatePhotoThree;

    const mailPhoto = selectedMail ? selectedMail.name || selectedMail : '';
    const video = selectedVideo ? selectedVideo.name || selectedVideo : '';
    const gift = selectedGift ? selectedGift.name || selectedGift : '';

    const randomNonce = GenerateRandomNonce();
    const privatePhoto = await GetPrivatePhoto(ladyId, randomNonce, manId)
    const privatePhotoNames = privatePhoto.map(photo => photo.name);

    const privatePhoto1 = selectedPrivate[0] ? selectedPrivate[0].name || selectedPrivate[0] : '';
    const privatePhoto2 = selectedPrivate[1] ? selectedPrivate[1].name || selectedPrivate[1] : '';
    const privatePhoto3 = selectedPrivate[2] ? selectedPrivate[2].name || selectedPrivate[2] : '';

    privatePhotoOne = privatePhotoNames.includes(privatePhoto1) ? privatePhoto1 : '';
    privatePhotoTwo = privatePhotoNames.includes(privatePhoto2) ? privatePhoto2 : '';
    privatePhotoThree = privatePhotoNames.includes(privatePhoto3) ? privatePhoto3 : '';

    return {mailPhoto, privatePhotoOne, privatePhotoTwo, privatePhotoThree, video, gift}
}

export default PhotoVideoGift;
