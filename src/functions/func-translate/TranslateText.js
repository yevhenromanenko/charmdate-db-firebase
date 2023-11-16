import FuncTranslate from "./FuncTranslate";


const TranslateText = async (text, language) => {
// Разбиваем текст на куски по предложениям и не более 250 символов
    const maxChunkSize = 250;
    const textChunks = [];
    let currentChunk = '';
    const sentences = text.split('.'); // Предполагается, что точка используется для окончания предложения

    for (const sentence of sentences) {
        if ((currentChunk + sentence + '.').length <= maxChunkSize) {
            currentChunk += sentence + '.';
        } else {
            textChunks.push(currentChunk);
            currentChunk = sentence + '.';
        }
    }

// Добавляем последний кусок, если он не пустой
    if (currentChunk.length > 0) {
        textChunks.push(currentChunk);
    }

// Создаем массив для хранения переведенных кусков
    const translatedChunks = [];

// Функция для перевода куска текста
    async function translateChunk(chunk) {
        return await FuncTranslate(chunk, language);
    }

// Запускаем асинхронный цикл для перевода каждого куска
    for (const chunk of textChunks) {
        const translatedChunk = await translateChunk(chunk);
        translatedChunks.push(translatedChunk);
    }

// Объединяем переведенные куски в один текст
    const translatedText = translatedChunks.join(' ');

    return translatedText;
}

export default TranslateText;
