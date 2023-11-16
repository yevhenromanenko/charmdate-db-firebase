import GetAdmireManIdsFromOnePage from "./GetAdmireManIdsFromOnePage";

async function* GetAdmireManIds(loginData) {
    try {

        let admireMan = [];
        let nextPageUrl = `https://www.charmdate.com/clagt/admire/men_profiles_admire.php?womanid=${loginData.loginUserId}`;

        while (nextPageUrl) {
            const { admireMenIds, nextPage } = await GetAdmireManIdsFromOnePage(nextPageUrl);
            admireMan.push(admireMenIds);

            if (nextPage && nextPage.length > 0) {
                nextPageUrl = `https://www.charmdate.com/clagt/admire/men_profiles_admire.php?womanid=${loginData.loginUserId}&page=${nextPage}`
                await new Promise(resolve => setTimeout(resolve, 1500));
            } else {
                nextPageUrl = null;
            }

            if (admireMan.flat().length >= 150) {
                // Если достигнуто условие, вернуть данные и очистить массив
                const flatArray = [].concat(...admireMan);
                admireMan = [];
                yield flatArray;

            }
        }

        const flatArray = [].concat(...admireMan);
        yield flatArray;

    } catch (error) {
        console.error('Error:', error);
    }
}

export default GetAdmireManIds;
