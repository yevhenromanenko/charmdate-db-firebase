import React, { useEffect, useState } from "react";
import './LadyProfit.css'
import {CreditCost, CreditCostUah} from "../../functions/credit-cost/credit-cost";
import GetCurrentMonthStatistics from "./get-сurrent-month-statistics/GetCurrentMonthStatistics";
import GetPreviousMonthStatistics from "./get-previous-month-statistics/GetPreviousMonthStatistics";
import GetStatisticsForLast3Days from "./get-statistics-for-last-3Days/GetStatisticsForLast3Days";
import GetTodayStatistics from "./get-today-statistics/GetTodayStatistics";
import {BeatLoader} from "react-spinners";
import {override} from "../../functions/override-css/OverRideCss";

const LadyProfit = ({ ladyId }) => {
    const [selectedOption, setSelectedOption] = useState("today");
    const [data, setData] = useState([]);
    const [sumCredits, setSumCredits] = useState(0);
    const [dataNotFound, setDataNotFound] = useState(false); // Состояние для отслеживания, были ли данные найдены


    const fetchData = async () => {
        let profitData;

        if (selectedOption === "today") {
            profitData = await GetTodayStatistics(ladyId);
        } else if (selectedOption === "last3days") {
            profitData = await GetStatisticsForLast3Days(ladyId);
        } else if (selectedOption === "currentMonth") {
            profitData = await GetCurrentMonthStatistics(ladyId);
        } else if (selectedOption === "previousMonth") {
            profitData = await GetPreviousMonthStatistics(ladyId);
        }

        if (profitData) {
            setData(profitData);
            const totalCredits = profitData.reduce((total, item) => total + parseFloat(item.credits), 0);
            setSumCredits(totalCredits.toFixed(2));
        } else if (profitData === null){
            setDataNotFound(true); // Если данные не найдены, устанавливаем состояние "данные не были найдены" в true
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedOption]);

    const getTypeDescription = (type) => {
        switch (type) {
            case "PPhoto-EMF-WM":
                return "фото лист";
            case "LiveChat":
                return "чат";
            case "PPhoto-CHAT-WM":
                return "фото чат";
            case "Video Show-Access Key":
                return "відео запит";
            case "WM":
                return "лист";
            case "MW":
                return "лист";
            default:
                return type;
        }
    };

    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const renderTable = () => {

        if (data.length > 0) {
            return (
                <table className={'lady-profit-table'}>
                    <thead>
                    <tr>
                        <th>Дата</th>
                        <th>Тип</th>
                        <th>ID чоловіка</th>
                        <th>ID дівчини</th>
                        <th>Кредитів</th>
                        <th>USD</th>
                        <th>UAH</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td className={'td-profit'}>{item.date}</td>
                            <td className={'td-profit'}>{getTypeDescription(item.type)}</td>
                            <td className={'td-profit'}>
                                <a href={`https://www.charmdate.com/clagt/admire/men_profile.php?manid=${item.manId}`} target="_blank" className="user-item" key={item.manId}>
                                    {item.manId}
                                </a>
                            </td>
                            <td className={'td-profit'}>
                                <a href={`https://www.charmdate.com/clagt/woman/women_preview_profile.php?womanid=${item.womanId}`} target="_blank" className="user-item" key={item.womanId}>
                                    {item.womanId}
                                </a>
                            </td>
                            <td className={'td-profit'}>{item.credits}</td>
                            <td className={'td-profit'}>${(parseFloat(item.credits) * CreditCost).toFixed(2)}</td>
                            <td className={'td-profit'}>{(parseFloat(item.credits) * CreditCostUah).toFixed(2)} грн</td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan="4" className={'td-profit'}>Всього кредитів:</td>
                        <td className={'td-profit'}>{sumCredits}</td>
                        <td className={'td-profit'}>${(sumCredits * CreditCost).toFixed(2)}</td>
                        <td className={'td-profit'}>{(sumCredits * CreditCostUah).toFixed(2)} грн</td>
                    </tr>
                    </tbody>
                </table>
            );
        } else if (dataNotFound) { // Если данные не были найдены, отображаем сообщение
            return (
                <div style={{marginLeft: '20px'}}>
                    <p className={"info-about"}>Даних не знайдено! Вірогідно ви ще нічого не заробили!</p>
                    <ul className={"info-about"}>Рекомендації щодо вашого профайлу:
                        <li className={'li-profit'}>
                            <a href={`https://www.charmdate.com/clagt/woman/submit_inquire_4.php?flag=2&womanid=${ladyId}`} target="_blank" className="user-item-profit">
                                Оновіть
                            </a>{' '}
                            перше фото
                        </li>
                        <li className={'li-profit'}>
                            Оновіть інвайти на головній сторінці
                        </li>
                        <li className={'li-profit'}>
                            <a href={`https://www.charmdate.com/clagt/admire/template/add2.php?womanid=${ladyId}`} target="_blank" className="user-item-profit">
                                Додайте
                            </a>{' '}
                            нові Admire Mail
                        </li>
                        <li className={'li-profit'}>
                            <a href={`https://www.charmdate.com/clagt/about/terms_update.php`} target="_blank" className="user-item-profit">
                                Перегляньте
                            </a>{' '}
                            всі листи, чи немає у вас нових?
                        </li>
                    </ul>
                </div>
            );
        } else {
            return (
                <>
                    <div className={'loading-form'}>
                        <p className={"info-about"}>Завантаження статистики...</p>
                        <BeatLoader css={override} size={15} color={"#ececf1"} />
                    </div>
                </>
            )
        }
    };

    return (
        <>
            <select className={'select-profit'} value={selectedOption} onChange={handleSelectChange}>
                <option value="today">Сьогодні</option>
                <option value="last3days">Останні 3 дні</option>
                <option value="currentMonth">Цей місяць</option>
                <option value="previousMonth">Минулий місяць</option>
            </select>
            <button className={'profit-button'} onClick={fetchData}>Показати</button>
            {renderTable()}
        </>
    );
};

export default LadyProfit;
