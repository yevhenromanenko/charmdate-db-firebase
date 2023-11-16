import GetProfit from "../profit/get-profit/GetProfit";

const GetPreviousMonthStatistics = async (ladyId) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    // Calculate the start and end dates for the previous month
    const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const prevYear = currentMonth === 1 ? currentYear - 1 : currentYear;

    const startDate = `${prevMonth}&date_s_d=1&date_s_y=${prevYear}`;
    const endDate = `${prevMonth}&date_e_d=31&date_e_y=${prevYear}`;

    return await GetProfit(ladyId, startDate, endDate);
}

export default GetPreviousMonthStatistics;
