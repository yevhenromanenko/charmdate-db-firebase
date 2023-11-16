
const GetInfoFromPage = () => {

    const objEmf = [];
    let manId;
    let replyId;
    let textLetter;
    let photoLetter;
    let typePhoto;

    const manIdElement = document.querySelector('input[name="manid"]');
    if (manIdElement) {
        manId = manIdElement.value;
    }

    const replyIdElement = document.querySelector('input[name="reply_id"]');
    if (replyIdElement) {
        replyId = replyIdElement.value;
    }

    const textElement = document.querySelector('td > table p');
    if (textElement) {
        textLetter = textElement.innerHTML.trim();
    }

    const imageElement = document.querySelector('p[align="center"] > img');
    if (imageElement) {
        photoLetter = imageElement.getAttribute('src')
    }

    const typePhotoElement = document.querySelector('div[align="center"] > strong');
    if (typePhotoElement) {
        typePhoto = typePhotoElement.textContent.trim();
    }

    objEmf.push({
        manId: manId || '',
        replyId: replyId || '',
        textLetter: textLetter || '',
        photoLetter: photoLetter || '',
        typePhoto: typePhoto || ''
    });

    return objEmf;

}
export default GetInfoFromPage;
