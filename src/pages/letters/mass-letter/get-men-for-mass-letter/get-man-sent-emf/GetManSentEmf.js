import GetManSentEmfFromOnePage from "./GetManSentEmfFromOnePage";


const GetManSentEmf = async (ladyId) => {
    try {
        const currentDate = new Date();

        // Вычисление даты 3 месяца назад от текущей даты
        const threeMonthsAgo = new Date(currentDate);
        threeMonthsAgo.setDate(currentDate.getDate() - 90);

        // Форматирование даты для параметров запроса
        const formattedStartDate = `${threeMonthsAgo.getMonth() + 1}&adddate_s_d=${threeMonthsAgo.getDate()}&adddate_s_y=${threeMonthsAgo.getFullYear()}`;
        const formattedEndDate = `${currentDate.getMonth() + 1}&adddate_e_d=${currentDate.getDate()}&adddate_e_y=${currentDate.getFullYear()}`;

        let sentEmfArray = [];

        let nextPageUrl = `https://www.charmdate.com/clagt/emf_wm_result.php?adddate_s_m=${formattedStartDate}&adddate_e_m=${formattedEndDate}&flag=-Show+All-&womanid=${ladyId}`;

        while (nextPageUrl) {
            const { results, nextPage } = await GetManSentEmfFromOnePage(nextPageUrl);

            sentEmfArray.push(results);

            if (nextPage && nextPage.length > 0) {
                nextPageUrl = `https://www.charmdate.com/clagt/emf_wm_result.php?adddate_s_m=${formattedStartDate}&adddate_e_m=${formattedEndDate}&flag=-Show+All-&womanid=${ladyId}&page=${nextPage}`;
            } else {
                nextPageUrl = null;
            }
        }

        const flatArray = [].concat(...sentEmfArray);

        return flatArray;

    } catch (error) {
        console.error('Error:', error);
    }

}
export default GetManSentEmf;
