import SayHiFollowUp from "./get-men-say-hi/SayHiFollowUp";
import GetLoginData from "../../../../functions/get-login-data/GetLoginData";
import GetManSentEmf from "./get-man-sent-emf/GetManSentEmf";
import GetManChat from "./get-man-chat/GetManChat";
const GetMenForMassLetter = async () => {
        try {
            const loginData = await GetLoginData();

            const sayHiMen = await SayHiFollowUp(loginData.loginUserId);
            const getManSentEmf = await GetManSentEmf(loginData.loginUserId);
            const getManChat = await GetManChat(loginData.loginUserId);

            const flatArray = [].concat(...sayHiMen, ...getManSentEmf, ...getManChat);

            // Проверяем уникальность manId
            const uniqueMen = [];
            const seenManIds = new Set();

            flatArray.forEach(obj => {
                const { manId } = obj;
                if (!seenManIds.has(manId)) {
                    seenManIds.add(manId);
                    uniqueMen.push(obj);
                }
            });

            return uniqueMen;

        } catch (error) {
            console.error("Error:", error);
        }
}

export default GetMenForMassLetter;
