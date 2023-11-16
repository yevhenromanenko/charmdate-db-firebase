import GetManId from "../get-man-id/GetManId";
import GetUserInfo from "../get-user-info/GetUserInfo";
import ReplaceTagsTemplates from "../replace-tags-templates/ReplaceTagsTemplates";
import GetTelNumber from "../get-tel-number/GetTelNumber";
import {use} from "bcrypt/promises";
const GetContent = async (firstLetter, ladyId, setNoTemplateFound, setContent, setManId, setTelNumber, setReplyId, setSelectedMail, setSelectedGift, setSelectedPrivate, setSelectedVideo, manId) => {

    let userId;
    const userArray = [];

    userId = GetManId(setReplyId);
    if (userId === null) {
        userId = manId;
    }

    const user = await GetUserInfo(userId);
    userArray.push(user)
    const content = JSON.parse(localStorage.getItem(`${firstLetter}-${ladyId}`)) || [];

    if (content.length === 0) {
        setNoTemplateFound(true); // Устанавливаем флаг, если шаблон не найден
    } else {
        if (firstLetter === 'videoRequest-letter') {
            const replaceContent = await ReplaceTagsTemplates(content[0].letter, user)
            setContent(replaceContent);

            setSelectedMail(content[0].mailPhoto || '');
            setSelectedGift(content[0].gift || '');

        } else if (firstLetter === 'sayHi-letter') {
            const replaceContent = await ReplaceTagsTemplates(content[0].letter, user)

            setContent(replaceContent);
            setSelectedMail(content ? content[0].mailPhoto : '');

        } else if (firstLetter === 'first-letter' || firstLetter === 'bp-letter') {
            const replaceContent = await ReplaceTagsTemplates(content[0].letter, user)

            setContent(replaceContent);
            setSelectedMail(content[0].mailPhoto || '');
            setSelectedGift(content[0].gift || '');
            setSelectedPrivate([content[0].privatePhotoOne || '', content[0].privatePhotoTwo || '', content[0].privatePhotoThree || ''] || '');
            setSelectedVideo(content[0].video || '');

        }
    }



    const urlLady = `https://www.charmdate.com/clagt/woman/women_preview_profile.php?womanid=${ladyId}`;
    const telNumber = await GetTelNumber(urlLady);

    setTelNumber(telNumber)
    setManId(userId)

    return userArray;

}

export default GetContent;
