import GetProfitToday from "./GetProfitToday";

const GetTodayStatisticsAllProfiles = async () => {
    const currentDate = new Date();

    const formattedStartDate = `${currentDate.getMonth() + 1}&date_s_d=${currentDate.getDate()}&date_s_y=${currentDate.getFullYear()}`;
    const formattedEndDate = `${currentDate.getMonth() + 1}&date_e_d=${currentDate.getDate()}&date_e_y=${currentDate.getFullYear()}`;

    const currentMonthProfit = await GetProfitToday(formattedStartDate, formattedEndDate);
    console.log(currentMonthProfit, 'currentMonthProfit')
    return currentMonthProfit
}

export default GetTodayStatisticsAllProfiles;
