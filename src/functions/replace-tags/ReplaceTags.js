
const ReplaceTags = (letter, randomUser) => {
    const { name, country, city, age } = randomUser;

    let fullName = name ? name.toString() : '';
    let firstRightName;

    if (fullName.includes('.')) {
        const dotIndex = fullName.indexOf('.');
        firstRightName = fullName.substring(0, dotIndex);
        firstRightName = firstRightName[0].toUpperCase() + firstRightName.slice(1);
    } else {
        firstRightName = fullName[0].toUpperCase() + fullName.slice(1);
    }

    const replaceTag = (tag, value) => {
        while (letter.includes(tag)) {
            if (value !== null && value.length > 0) {
                letter = letter.replace(tag, value);
            } else {
                console.log(`нема ${tag} в профайлі чоловіка`);
                return;
            }
        }
    };

    replaceTag('%Name%', firstRightName);
    replaceTag('%Age%', age);
    replaceTag('%Country%', country);
    replaceTag('%City%', city);

    if (
        letter.includes('%Name%') ||
        letter.includes('%Age%') ||
        letter.includes('%Country%') ||
        letter.includes('%City%')
    ) {
        console.log(letter, 'letter')
        return;
    }

    return letter;
};

export default ReplaceTags;
