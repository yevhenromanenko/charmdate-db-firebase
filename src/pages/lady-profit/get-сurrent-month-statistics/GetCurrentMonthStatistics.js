import GetProfit from "../profit/get-profit/GetProfit";


const GetCurrentMonthStatistics = async (ladyId) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const startDate = `${currentMonth}&date_s_d=1&date_s_y=${currentYear}`;
    const endDate = `${currentMonth}&date_e_d=${currentDate.getDate()}&date_e_y=${currentYear}`;

    const currentMonthProfit = await GetProfit(ladyId, startDate, endDate);
    console.log(currentMonthProfit);
    return currentMonthProfit
}

export default GetCurrentMonthStatistics;
