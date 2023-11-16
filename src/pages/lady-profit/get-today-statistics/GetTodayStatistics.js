import GetProfit from "../profit/get-profit/GetProfit";


const GetTodayStatistics = async (ladyId) => {
    const currentDate = new Date();

    const formattedStartDate = `${currentDate.getMonth() + 1}&date_s_d=${currentDate.getDate()}&date_s_y=${currentDate.getFullYear()}`;
    const formattedEndDate = `${currentDate.getMonth() + 1}&date_e_d=${currentDate.getDate()}&date_e_y=${currentDate.getFullYear()}`;

    const currentMonthProfit = await GetProfit(ladyId, formattedStartDate, formattedEndDate);
    return currentMonthProfit
}

export default GetTodayStatistics;
