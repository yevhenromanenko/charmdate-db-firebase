import GetProfitOnePage from "../../lady-profit/profit/get-profit/GetProfitOnePage";

const GetProfitToday = async (startDate, endDate) => {
    try {
        let profitArray = [];
        let nextPageUrl = `https://www.charmdate.com/clagt/stats/stats_detail_search_result.php?s=search&date_s_m=${startDate}&date_e_m=${endDate}&flag=&womanid=&manid=&querysub=Search`;
        // let nextPageUrl = `https://www.charmdate.com/clagt/stats/stats_detail_search_result.php?s=search&date_s_m=${startDate}&date_e_m=${endDate}&womanid=${ladyId}`;


        while (nextPageUrl) {
            const { matches, nextPage } = await GetProfitOnePage(nextPageUrl);
            console.log(matches, 'matches')

            profitArray.push(matches);

            if (nextPage && nextPage.length > 0) {
                nextPageUrl = `https://www.charmdate.com/clagt/stats/stats_detail_search_result.php?s=search&date_s_m=${startDate}&date_e_m=${endDate}&flag=&womanid=&manid=&querysub=Search&page=${nextPage}`;
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

export default GetProfitToday;
