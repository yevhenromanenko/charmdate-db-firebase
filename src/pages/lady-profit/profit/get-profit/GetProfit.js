import GetProfitOnePage from "./GetProfitOnePage";
const GetProfit = async (ladyId, startDate, endDate) => {
    try {
        let profitArray = [];
        let nextPageUrl = `https://www.charmdate.com/clagt/stats/stats_detail_search_result.php?date_s_m=${startDate}&date_e_m=${endDate}&womanid=${ladyId}`;

        while (nextPageUrl) {
            const { matches, nextPage } = await GetProfitOnePage(nextPageUrl);

            profitArray.push(matches);

            if (nextPage && nextPage.length > 0) {
                nextPageUrl = `https://www.charmdate.com/clagt/stats/stats_detail_search_result.php?date_s_m=${startDate}&date_e_m=${endDate}&womanid=${ladyId}&page=${nextPage}`;
            } else {
                nextPageUrl = null;
            }
        }

        const flatArray = [].concat(...profitArray);
        if (flatArray.length === 0) {
            return null;
        } else {
            return flatArray;
        }


    } catch (error) {
        console.error('Error:', error);
    }
}

export default GetProfit;
