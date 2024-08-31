import GetAdmireMail from "./get-admire-mail/GetAdmireMail";

// Выполнение запроса и обработка данных
async function AdmireMail(ladyId) {
    try {

        let admireMail = [];
        let nextPageUrl = `https://www.charmdate.com/clagt/admire/template/search_result.php?status=A&template_type=B&womanid=${ladyId}`;

        while (nextPageUrl) {
            const { matches, nextPage } = await GetAdmireMail(nextPageUrl);
            admireMail.push(matches);

            if (nextPage && nextPage.length > 0) {
                nextPageUrl = `https://www.charmdate.com/clagt/admire/template/search_result.php?status=A&template_type=B&womanid=${ladyId}&page=${nextPage}`;
            } else {
                nextPageUrl = null;
            }
        }

        const flatArray = [].concat(...admireMail);

        return flatArray;

    } catch (error) {
        console.error('Error:', error);
    }
}

export default AdmireMail;
