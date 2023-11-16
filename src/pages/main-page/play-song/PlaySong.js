
const PlaySong = (audio) => {
    try {
        console.log(audio, 'audio воспроизводим звук')
        audio.play()
    } catch (error) {
        console.error('Ошибка воспроизведения песни:', error);
    }
}

export default PlaySong;
