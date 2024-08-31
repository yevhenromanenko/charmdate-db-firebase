import React, {useEffect, useRef, useState} from "react";
import GetLadyInfo from "./get-lady-info/GetLadyInfo";
import './AdminPage.css'
import IsOnline from "./check-online-status/IsOnline";
import GetLadyProfitTodayMonth from "./get-lady-profit/GetLadyProfitTodayMonth";
import LadyProfit from "../lady-profit/LadyProfit";
import GetTodayStatisticsAllProfiles from "./get-today-statistics-all-profiles/GetTodayStatisticsAllProfiles";
import {UsdUah} from "../../functions/usd-uah/UsdUah";
import {CreditCost, CreditCostToAdmin} from "../../functions/credit-cost/credit-cost";
import GetStatisticMonthEstimated from "./get-statistic-month-estimated/GetStatisticMonthEstimated";
import InfoTranslater from "./InfoTranslater/InfoTranslater";
import SentLetterComponent from "./sent-letters/SentLetters";


const AdminPage = () => {
    const [data, setData] = useState([]);
    const [statusFilter, setStatusFilter] = useState('show');
    const [id, setId] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [totalToday, setTotalToday] = useState(0);
    const [month, setMonth] = useState(0);
    const [estimated, setEstimated] = useState(0);


    useEffect(() => {
        const fetch = async () => {
            const matches = await GetStatisticMonthEstimated();

            setMonth(matches[0].month);
            setEstimated(matches[0].estimated);
        }

        fetch();
    }, [])

    useEffect(() => {
        const fetch = async () => {
            const total = await GetTodayStatisticsAllProfiles();

            if (total) {
                const totalCredits = total.reduce((total, item) => total + parseFloat(item.credits), 0);
                setTotalToday(totalCredits.toFixed(1));  // Используйте функцию обновления состояния
            }
        }
        fetch();
    }, []);

    useEffect(() => {
        const fetch = async () => {
            try {
                const storedData = JSON.parse(localStorage.getItem("hiddenProfiles")) || {};
                const ladyInfo = await GetLadyInfo();
                const updatedData = ladyInfo.map((item) => ({
                    ...item,
                    hidden: storedData[item.womanId] || false,
                }));
                setData(updatedData);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetch();
    }, []);

    const handleStatusFilterChange = (status) => {
        setStatusFilter(status);
    };

    const LadyProfits = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const toggleHiddenStatus = (womanId) => {
        const updatedData = data.map((item) =>
            item.womanId === womanId ? { ...item, hidden: !item.hidden } : item
        );
        setData(updatedData);
        localStorage.setItem("hiddenProfiles", JSON.stringify(updatedData.reduce((acc, item) => {
            if (item.hidden) {
                acc[item.womanId] = true;
            }
            return acc;
        }, {})));
    };


    return (
        <>
            {modalIsOpen && (
                <>
                    <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '9998' }}></div>
                    <div style={{ overflowY: "auto", margin: '3%', fontSize: '14px', color: '#ececf1', position: 'fixed', width: '90%', height: '80%', padding: '16px', backgroundColor: '#444654', border: '1px solid #ececf1', borderRadius: '5px', zIndex: '9999' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button onClick={closeModal} style={{ cursor: 'pointer', background: 'none', border: 'none', color: '#ececf1', fontSize: '16px' }}>X</button>
                        </div>
                        <h2>Статистика {id}</h2>
                        <LadyProfit ladyId={id}/>
                    </div>
                </>
            )}

            <div style={{ margin: '2% 4%' }}>
                <div>
                    <button className={'show-hide-button'} onClick={() => handleStatusFilterChange('show')} style={{ background: statusFilter === 'show' ? 'green' : '#444654' }}>
                        Головні
                    </button>
                    <button className={'show-hide-button'} onClick={() => handleStatusFilterChange('hide')} style={{ background: statusFilter === 'hide' ? '#f22c3d' : '#444654' }}>
                        Сховані
                    </button>
                    <button className={'show-hide-button'}  onClick={() => window.open('https://www.charmdate.com/clagt/woman/submit_profile_alert.php')}>Додати анкету</button>
                    <button className={'show-hide-button'}  onClick={() => window.open('https://www.charmdate.com/clagt/woman/faceid_list.php?type=1')}>Face Id</button>
                </div>

                <table className={'table-admin'}>
                    <thead>
                    <tr className={"thead-admin"}>
                        <th className={'th-admin'}>Анкета</th>
                        <th className={'th-admin'}>Інвайти (сьогодні)</th>
                        <th className={'th-admin'}>Admire Mail (сьогодні)</th>
                        <th className={'th-admin'}>Листи (сьогодні)</th>
                        <th className={'th-admin'}>Статистика (сьогодні)</th>
                        <th style={{borderRight: '0'}}>Перекладач</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.filter((item) =>
                        statusFilter === "show" ? !item.hidden : item.hidden
                    ).map((item, index) => (
                        <tr className={`tbody-admin`} key={index}>
                            <td className={'td-admin'} style={{padding: '5px'}}>
                                <div style={{ display: 'flex' }}>
                                    <img src={item.photo} alt="Woman Photo" style={{ maxWidth: '100%', height: 'auto' }} />
                                    <div className={"right-row"}>
                                        <a href={`https://www.charmdate.com/clagt/woman/women_preview_profile.php?womanid=${item.womanId}`} style={{color: '#e09f3e'}}><strong>{item.womanId}</strong></a>
                                        <span><br/>{item.womanName}, {item.age}</span>
                                        <IsOnline
                                            ladyId={item.womanId}
                                        />
                                    </div>
                                </div>
                            </td>
                            <td className={'td-admin'}>Інвайти</td>
                            <td className={'td-admin'}>Admire Mail</td>
                            <td className={'td-admin'}><SentLetterComponent ladyId={item.womanId}/></td>
                            <td className={'td-admin'}>
                                <GetLadyProfitTodayMonth
                                    ladyId={item.womanId}
                                    LadyProfit={LadyProfits}
                                    setId={setId}
                                />
                            </td>
                            <td className={'td-admin'}>
                                <div>
                                    <InfoTranslater
                                        ladyId={item.womanId}
                                        hidden={item.hidden}
                                        toggleHiddenStatus={toggleHiddenStatus}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                    {/* Total Today Row */}
                    <tr className={'tbody-admin'}>
                        <td className={'td-admin'} style={{ padding: '15px', fontSize: '16px' }}>
                            <strong>Всього сьогодні</strong>
                        </td>
                        <td className={'td-admin'}></td>
                        <td className={'td-admin'}></td>
                        <td className={'td-admin'}></td>
                        <td className={'td-admin'}>
                            <div style={{ fontSize: '16px' }}>
                                Кредитів: <strong style={{color: '#e09f3e'}}>{totalToday} <br/>(${(totalToday * CreditCostToAdmin).toFixed(2)} = {(totalToday * CreditCostToAdmin * UsdUah).toFixed(2)} грн)</strong>
                            </div>
                        </td>
                        <td className={'td-admin'}></td>
                    </tr>

                    {/* Total This Month Row */}
                    <tr className={'tbody-admin'}>
                        <td className={'td-admin'} style={{ padding: '15px', fontSize: '16px' }}>
                            <strong>Всього за місяць</strong>
                        </td>
                        <td className={'td-admin'}></td>
                        <td className={'td-admin'}></td>
                        <td className={'td-admin'}></td>
                        <td className={'td-admin'}>
                            <div style={{ fontSize: '16px' }}>
                                Кредитів: <strong style={{color: '#e09f3e'}}>{month} <br/>(${(month * CreditCostToAdmin).toFixed(2)} = {(month * CreditCostToAdmin * UsdUah).toFixed(2)} грн)</strong>
                            </div>
                        </td>
                        <td className={'td-admin'}>
                            <div style={{ fontSize: '16px' }}>
                                Прогноз: <strong style={{color: '#e09f3e'}}>{estimated} <br/>(${(estimated * CreditCostToAdmin).toFixed(2)} = {(estimated * CreditCostToAdmin * UsdUah).toFixed(2)} грн)</strong>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default AdminPage;
