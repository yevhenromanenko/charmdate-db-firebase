import GetProfit from "../profit/get-profit/GetProfit";

const GetStatisticsForLast3Days = async (ladyId) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const currentDay = currentDate.getDate();

    // Calculate the start date for the last 3 days
    const startDay = currentDay - 2;
    const startMonth = currentDay > 2 ? currentMonth : currentMonth - 1;
    const startYear = currentDay > 2 ? currentYear : currentYear - 1;

    const startDate = `${startMonth}&date_s_d=${startDay}&date_s_y=${startYear}`;
    const endDate = `${currentMonth}&date_e_d=${currentDay}&date_e_y=${currentYear}`;

    return await GetProfit(ladyId, startDate, endDate);
}

export default GetStatisticsForLast3Days;
