function delay(min, max) {
    min = Math.ceil(min * 1000); // преобразуем секунды в миллисекунды
    max = Math.floor(max * 1000); // преобразуем секунды в миллисекунды
    const randomDelay = Math.floor(Math.random() * (max - min + 1)) + min; // генерируем случайную задержку между минимумом и максимумом
    return new Promise(resolve => {
        setTimeout(resolve, randomDelay); // ждем случайное время и затем завершаем Promise
    });
}

export default delay;
