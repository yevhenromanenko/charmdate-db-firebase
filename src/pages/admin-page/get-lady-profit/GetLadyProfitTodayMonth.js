import {useEffect, useState} from "react";
import GetTodayStatistics from "../../lady-profit/get-today-statistics/GetTodayStatistics";

const GetLadyProfitTodayMonth = ({ladyId, LadyProfit, setId}) => {
    const [today, setToday] = useState(0);

    useEffect(() => {
        const fetch = async () => {
            const profitData = await GetTodayStatistics(ladyId);

            if (profitData) {
                const sumCredits = profitData.reduce((total, item) => total + parseFloat(item.credits), 0);
                // const sumUsd = (sumCredits * CreditCostToAdmin);
                const usd = sumCredits.toFixed(1)
                setToday(usd);
            } else {
                setToday(0);
            }
        }
        fetch();

    }, [ladyId]);

    return (
        <>
            <div style={{ fontSize: '14px' }}>
                <span style={{ color: '#e09f3e', fontSize: '16px', cursor: 'pointer' }} onClick={() => {
                    LadyProfit();
                    setId(ladyId);
                }}>
                    <strong>{today}</strong>
                </span>
                {' '}кредита
            </div>
        </>
    )

}

export default GetLadyProfitTodayMonth;
