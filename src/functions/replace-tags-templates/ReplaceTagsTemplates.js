
const ReplaceTagsTemplates = (letter, randomUser) => {
    let { name, country, city, age } = randomUser;

    let fullName = name.toString();
    let firstRightName = fullName[0].toUpperCase() + fullName.slice(1);
    const replaceTags = () => {

        let result = letter;

        // Заменяем все вхождения тегов
        while (result.includes('%Name%')) {
            result = result.replace('%Name%', firstRightName);
        }

        while (result.includes('%Country%')) {
            if (country === '') {
                country = 'your country';
                alert('Обратите внимание, что у мужчины не указана страна в профиле, страна была заменена на сообщение "your country", но лучше уберите это предложение с текста');
            }

            result = result.replace('%Country%', country);
        }

        while (result.includes('%Age%')) {
            if (age === '') {
                age = 'older';
                alert('Обратите внимание, что у мужчины не указан возраст в профиле, возраст был заменен на сообщение "older", но лучше уберите это предложение с текста');
            }

            result = result.replace('%Age%', age);
        }

        while (result.includes('%City%')) {
            if (city === '') {
                city = 'your city';
                alert('Обратите внимание, что у мужчины не указан город в профиле, город был заменен на сообщение "your city", но лучше уберите это предложение с текста');
            }

            result = result.replace('%City%', city);
        }

        return result;
    }

    return replaceTags();

};

export default ReplaceTagsTemplates;
