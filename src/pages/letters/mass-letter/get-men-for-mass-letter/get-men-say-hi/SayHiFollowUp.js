import SayHiFollowUpOnePage from "./SayHiFollowUpOnePage";

const SayHiFollowUp = async (ladyId) => {

    try {

        let sayHiArray = [];
        let nextPageUrl = 'https://www.charmdate.com/clagt/cupidnote/can_reply_cupidnote.php';


        while (nextPageUrl) {
            const { matches, nextPage } = await SayHiFollowUpOnePage(nextPageUrl, ladyId);

            sayHiArray.push(matches);

            if (nextPage && nextPage.length > 0) {
                nextPageUrl = `https://www.charmdate.com/clagt/cupidnote/can_reply_cupidnote.php?page=${nextPage}`;
            } else {
                nextPageUrl = null;
            }
        }

        const flatArray = [].concat(...sayHiArray);

        return flatArray;

    } catch (error) {
        console.error('Error:', error);
    }
}

export default SayHiFollowUp;
