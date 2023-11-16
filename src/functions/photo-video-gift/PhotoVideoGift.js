import GetPrivatePhoto from "../../pages/letters/get-photos/get-private-photos/GetPrivatePhotos";
import GenerateRandomNonce from "../generate-random-nonce/GenerateRandomNonce";


const PhotoVideoGift = async (selectedMail, selectedPrivate, selectedVideo, selectedGift, ladyId, manId) => {
    let privatePhotoOne;
    let privatePhotoTwo;
    let privatePhotoThree;

    const mailPhoto = selectedMail ? selectedMail.name || selectedMail : '';
    console.log(mailPhoto, 'mailPhoto')
    const video = selectedVideo ? selectedVideo.name || selectedVideo : '';
    console.log(video, 'video')
    const gift = selectedGift ? selectedGift.name || selectedGift : '';
    console.log(gift, 'gift')

    const randomNonce = GenerateRandomNonce();
    const privatePhoto = await GetPrivatePhoto(ladyId, randomNonce, manId)
    console.log(privatePhoto, 'privatePhoto')
    const privatePhotoNames = privatePhoto.map(photo => photo.name);
    console.log(privatePhotoNames, 'privatePhotoNames')

    const privatePhoto1 = selectedPrivate[0] ? selectedPrivate[0].name || selectedPrivate[0] : '';
    console.log(privatePhoto1, 'privatePhoto1')
    const privatePhoto2 = selectedPrivate[1] ? selectedPrivate[1].name || selectedPrivate[1] : '';
    console.log(privatePhoto2, 'privatePhoto2')
    const privatePhoto3 = selectedPrivate[2] ? selectedPrivate[2].name || selectedPrivate[2] : '';

    privatePhotoOne = privatePhotoNames.includes(privatePhoto1) ? privatePhoto1 : '';
    privatePhotoTwo = privatePhotoNames.includes(privatePhoto2) ? privatePhoto2 : '';
    privatePhotoThree = privatePhotoNames.includes(privatePhoto3) ? privatePhoto3 : '';

    return {mailPhoto, privatePhotoOne, privatePhotoTwo, privatePhotoThree, video, gift}
}

export default PhotoVideoGift;
