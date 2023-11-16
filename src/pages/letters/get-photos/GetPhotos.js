import React, {useEffect, useState} from "react";
import './GetPhotos.scss'
import GetMailPhotos from "./get-mail-photos/GetMailPhotos";
import GenerateRandomNonce from "../../../functions/generate-random-nonce/GenerateRandomNonce";
import GetPrivatePhoto from "./get-private-photos/GetPrivatePhotos";
import GetPrivateVideo from "./get-private-video/GetPrivateVideo";
import TogglePrivatePhoto from "./toogle-private-photo/TogglePrivatePhoto";
import GetVirtualGifts from "../get-virtual-gifts/GetVirtualGifts";
import toggle from "../../../functions/toggle/toggle";
import CheckboxAllPhoto from "./check-box-all-photo/checkBoxAllPhoto";

const GetPhotos = ({setSelectedMail, setSelectedPrivate, setSelectedVideo, setSelectedGift, ladyId, checkAllPrivatePhoto, onPrivatePhotoChange, manId, massLetterCheckBoxForAllPhotos, answerFrom, firstLetter, selectedMail, selectedPrivate, selectedVideo, selectedGift}) => {

    const [mailPhotos, setMailPhotos] = useState([]);
    const [privatePhotos, setPrivatePhotos] = useState([]);
    const [privateVideos, setPrivateVideos] = useState([]);
    const [virtualGifts, setVirtualGifts] = useState([]);

    const [selectedMailCount, setSelectedMailCount] = useState(0);
    const [selectedPrivateCount, setSelectedPrivateCount] = useState(0);
    const [selectedVideoCount, setSelectedVideoCount] = useState(0);
    const [selectedVirtualGiftsCount, setSelectedVirtualGiftsCount] = useState(0);

    const [selectedMailPhotoIndex, setSelectedMailPhotoIndex] = useState(null);
    const [selectedPrivateVideoIndex, setSelectedPrivateVideoIndex] = useState(null);
    const [selectedVirtualGiftsIndex, setSelectedVirtualGiftsIndex] = useState(null);

    const [showMail, setShowMail] = useState(false);
    const [showPrivate, setShowPrivate] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const [showVirtualGifts, setShowVirtualGifts] = useState(false);


    const isPhotoSelected = (photo) => {
        return selectedPrivate.some(selectedPhoto => selectedPhoto.name === photo.name);
    };

    useEffect(() => {
            async function fetchDataAsync() {
                try {
                    // const loginData = await GetLoginData();
                    const randomNonce = GenerateRandomNonce();

                    const mailPhoto = await GetMailPhotos(ladyId, randomNonce)
                    const privatePhoto = await GetPrivatePhoto(ladyId, randomNonce, manId)
                    const privateVideo = await GetPrivateVideo(ladyId, randomNonce, manId)
                    const virtualGift = await GetVirtualGifts();

                    setMailPhotos(mailPhoto);
                    setPrivatePhotos(privatePhoto);
                    setPrivateVideos(privateVideo);
                    setVirtualGifts(virtualGift);

                } catch (error) {
                    console.error("Error:", error);
                }
            }

        fetchDataAsync();

    }, []);

    useEffect(() => {
        if (selectedMailPhotoIndex !== null) {
            setSelectedMail(mailPhotos[selectedMailPhotoIndex]);
            setSelectedMailCount(1); // Обновляем количество выбранных фотографий для категории "Безкоштовні"
        }
    }, [selectedMailPhotoIndex, mailPhotos]);

    useEffect(() => {
        if (selectedPrivateVideoIndex !== null) {
            setSelectedVideo(privateVideos[selectedPrivateVideoIndex]);
            setSelectedVideoCount(1);

        }
    }, [selectedPrivateVideoIndex, privateVideos]);

    useEffect(() => {
        if (selectedVirtualGiftsIndex !== null) {
            setSelectedGift(virtualGifts[selectedVirtualGiftsIndex]);
            setSelectedVirtualGiftsCount(1);
        }
    }, [selectedVirtualGiftsIndex, virtualGifts]);

    return (
        <>
            <button className={'show-hide-button-mass'} onClick={toggle(setShowMail, showMail)}>
                {showMail ? `Безкоштовні ${selectedMail && selectedMail.length > 0 ? '1' : selectedMailCount} ⬆` : `Безкоштовні ${selectedMail && selectedMail.length > 0 ? '1' : selectedMailCount} ⬇`}
            </button>

            {answerFrom === 'mass-letter' || answerFrom === 'bp-letter' || answerFrom === 'emf-letter' || answerFrom === 'first-letter' || firstLetter === 'first-letter' || firstLetter === 'bp-letter' ? (
                <>
                    <button className={'show-hide-button-mass'} onClick={toggle(setShowPrivate, showPrivate)}>
                        {showPrivate ? `Приватні ${checkAllPrivatePhoto ? privatePhotos.length : selectedPrivate && selectedPrivate.length > 0 ? selectedPrivate.length : selectedPrivateCount} ⬆` : `Приватні ${checkAllPrivatePhoto ? privatePhotos.length : selectedPrivate && selectedPrivate.length > 0 ? selectedPrivate.length : selectedPrivateCount} ⬇`}
                    </button>

                    <button className={'show-hide-button-mass'} onClick={toggle(setShowVideo, showVideo)}>
                        {showVideo ? `Відео ${selectedVideo && selectedVideo.length > 0 ? '1' : selectedVideoCount} ⬆` : `Відео ${selectedVideo && selectedVideo.length > 0 ? '1' : selectedVideoCount} ⬇`}
                    </button>

                    <button className={'show-hide-button-mass'} onClick={toggle(setShowVirtualGifts, showVirtualGifts)}>
                        {showVirtualGifts ? `Подарунок ${selectedGift && selectedGift.length > 0 ? '1' : selectedVirtualGiftsCount} ⬆` : `Подарунок ${selectedGift && selectedGift.length > 0 ? '1' : selectedVirtualGiftsCount} ⬇`}
                    </button>
                </>
            ) : firstLetter === 'videoRequest-letter' || answerFrom === 'video-request' ? (
                <>
                    <button className={'show-hide-button-mass'} onClick={toggle(setShowVirtualGifts, showVirtualGifts)}>
                        {showVirtualGifts ? `Подарунок ${selectedGift && selectedGift.length > 0 ? '1' : selectedVirtualGiftsCount} ⬆` : `Подарунок ${selectedGift && selectedGift.length > 0 ? '1' : selectedVirtualGiftsCount} ⬇`}
                    </button>
                </>
            ) : (
                <>
                    {""}
                </>
            )}


            {showMail && (
                <>
                    <div className={`photos-in-letter ${privatePhotos.length > 50 ? 'scrollable-photos' : ''}`}>
                        {mailPhotos.map((photo, index) => (
                            <span
                                key={index}
                                onClick={() => setSelectedMailPhotoIndex(index)}
                                className={selectedMailPhotoIndex === index || photo.name === selectedMail ? 'selected' : ''}
                            >
                                <img className={'img-in-letter'} src={photo.url} alt={`Mail ${index}`} />
                            </span>
                        ))}
                    </div>
                </>
            )}

            {showPrivate && (
                <>
                    <div className={`photos-in-letter ${privatePhotos.length > 50 ? 'scrollable-photos' : ''}`}>
                        {massLetterCheckBoxForAllPhotos === '1' ?
                            <CheckboxAllPhoto
                                checkAllPrivatePhoto={checkAllPrivatePhoto}
                                onPrivatePhotoChange={onPrivatePhotoChange}
                            /> : null
                        }
                        {privatePhotos.length > 0 ?
                            (privatePhotos.map((photo, index) => (
                            <span
                                key={index}
                                onClick={() => TogglePrivatePhoto(photo, setSelectedPrivate, setSelectedPrivateCount)}
                                className={isPhotoSelected(photo) || checkAllPrivatePhoto || selectedPrivate.includes(photo.name) || selectedPrivate.includes(photo.url) ? 'selected' : ''}
                            >
                                 <img className={'img-in-letter'} src={photo.url} alt={`Private ${index}`} />
                             </span>
                        ))) : (
                                <>
                                    <p className={'info-no-video'}>
                                        Приватних фото більше нема для цього чоловіка, додайте ще:
                                        <button  className={'btn-add-video'} onClick={() => window.open(`https://www.charmdate.com/clagt/woman/private_photo_upload.php?womanid=${ladyId}`)}>Додати</button>
                                    </p>
                                </>
                            )}
                    </div>
                </>
            )}

            {showVideo && (
                <>
                    <div className={`photos-in-letter`}>
                        {privateVideos.length > 0 ?
                            (privateVideos.map((photo, index) => (
                            <span
                                key={index}
                                onClick={() => setSelectedPrivateVideoIndex(index)}
                                className={selectedPrivateVideoIndex === index || photo.name === selectedVideo ? 'selected' : ''}
                            >
                                 <img className={'img-in-letter'} src={photo.url} alt={`Video ${index}`} />
                            </span>
                        ))) : (
                            <>
                                <p className={'info-no-video'}>
                                    Ви ще не додали ні одного приватного відео
                                    <button  className={'btn-add-video'} onClick={() => window.open(`https://www.charmdate.com/clagt/woman/short_video_upload.php?womanid=${ladyId}`)}>Додати</button>
                                </p>
                            </>
                        )}
                    </div>
                </>
            )}

            {showVirtualGifts && (
                <>
                    <div className={`photos-in-letter ${privatePhotos.length > 50 ? 'scrollable-photos' : ''}`}>
                        {virtualGifts.map((gift, index) => (
                            <span
                                key={index}
                                onClick={() => setSelectedVirtualGiftsIndex(index)}
                                className={selectedVirtualGiftsIndex === index || gift.name === selectedGift ? 'selected' : ''}
                            >
                                 <img className={'img-in-letter'} src={`https://www.charmdate.com${gift.url}`} alt={`Gift ${index}`} />
                            </span>
                        ))}
                    </div>
                </>
            )}
        </>
    );
}

export default GetPhotos;
