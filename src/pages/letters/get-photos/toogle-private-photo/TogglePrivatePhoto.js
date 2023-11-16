
const TogglePrivatePhoto = (photo, setSelectedPrivate, setSelectedPrivateCount) => {

    setSelectedPrivate(prevState => {
        const isSelected = prevState.some(p => p.url === photo.url && p.url !== '');

        if (isSelected) {
            // Если фото уже выбрано, удаляем его из массива
            const updatedSelectedPrivatePhotos = prevState.filter(p => p.url !== photo.url && p.url !== '');
            setSelectedPrivateCount(updatedSelectedPrivatePhotos.length);
            return updatedSelectedPrivatePhotos;

        } else if (prevState.length < 3) {
            // Если фото не выбрано и количество выбранных фото меньше 3, добавляем его в массив
            const updatedSelectedPrivatePhotos = [...prevState, photo];
            setSelectedPrivateCount(updatedSelectedPrivatePhotos.length);
            return updatedSelectedPrivatePhotos;
        }

        return prevState;
    });
};
export default TogglePrivatePhoto;
