import GetManChatFromOnePage from "./GetManChatFromOnePage";

const GetManChat = async (ladyId) => {
    try {
        const currentDate = new Date();

        let chatManArray = [];
        let nextPageUrl = `https://www.charmdate.com/clagt/livechat/search_result.php?postdate_s_y=2022&postdate_s_m=06&postdate_s_d=04&postdate_e_y=${currentDate.getFullYear()}&postdate_e_m=${currentDate.getMonth() + 1}&postdate_e_d=${currentDate.getDate()}&status=close&womanid=${ladyId}`;

        while (nextPageUrl) {
            const { results, nextPage } = await GetManChatFromOnePage(nextPageUrl);

            chatManArray.push(results);

            if (nextPage && nextPage.length > 0) {
                nextPageUrl = `https://www.charmdate.com/clagt/livechat/search_result.php?postdate_s_y=2022&postdate_s_m=06&postdate_s_d=04&postdate_e_y=${currentDate.getFullYear()}&postdate_e_m=${currentDate.getMonth() + 1}&postdate_e_d=${currentDate.getDate()}&status=close&womanid=${ladyId}&page=${nextPage}`;
            } else {
                nextPageUrl = null;
            }
        }

        const flatArray = [].concat(...chatManArray);

        return flatArray;

    } catch (error) {
        console.error('Error:', error);
    }

}
export default GetManChat;
