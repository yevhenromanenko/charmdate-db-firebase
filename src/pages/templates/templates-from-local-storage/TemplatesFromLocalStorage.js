
const TemplatesFromLocalStorage = (setFirstLetterContent, setLetter, firstLetter, ladyId, setSelectedMail, setSelectedGift, setSelectedPrivate, setSelectedVideo) => {

    const letter = JSON.parse(localStorage.getItem(`${firstLetter}-${ladyId}`)) || [];
    setFirstLetterContent(letter);

    if (letter.length > 0) {
        const lastEmail = letter[letter.length - 1];
        setLetter(lastEmail.letter || '');   // Пустая строка - если сохраненного письма нет

        if (firstLetter === 'first-letter' || firstLetter === 'bp-letter') {

            setSelectedMail(letter[0].mailPhoto || null);
            setSelectedGift(letter[0].gift || '');
            setSelectedPrivate([letter[0].privatePhotoOne || '', letter[0].privatePhotoTwo || '', letter[0].privatePhotoThree || ''] || '');
            setSelectedVideo(letter[0].video || '');

        } else if (firstLetter === 'videoRequest-letter') {
            setSelectedMail(letter[0].mailPhoto || '');
            setSelectedGift(letter[0].gift || '');
        } else if (firstLetter === 'sayHi-letter') {
            setSelectedMail(letter[0].mailPhoto || '');
        }
    }
}

export default TemplatesFromLocalStorage;
