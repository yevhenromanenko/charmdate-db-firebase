import './Navbar.scss'
import Logout from "./Logout";
import {useEffect, useState} from "react";
import IsLogin from "./isLogin";
import {CreditCost} from "../../functions/credit-cost/credit-cost";
import GetTodayStatistics from "../lady-profit/get-today-statistics/GetTodayStatistics";

const Navbar = ({photoLady, idLady, setLogin, login, adminId, ladyIdsYevhen, ladyIdsViktor, ladyIdsViktorC2135, ladyIdsViktorC1337, length}) => {

    const [sumCreditsToday, setSumCreditsToday] = useState(0);
    const linkToMassLetter = 'https://www.charmdate.com/clagt/woman/helpsys.php?help_type=2'
    const templates = 'https://www.charmdate.com/clagt/woman/helpsys.php?help_type=3'
    const ladyProfile = `https://www.charmdate.com/clagt/woman/women_preview_profile.php?womanid=${idLady}`
    const linkToInboxLetter = 'https://www.charmdate.com/clagt/about/terms_update.php'
    const sentLetterLink = 'https://www.charmdate.com/clagt/about/about_us.php'
    const chatLink = `https://www.charmdate.com/clagt/livechat/index.php?action=live`
    const inChat = 'https://www.charmdate.com/livechat/pad/chat-lady.php?manid=&inviteid='
    const instruction = 'https://docs.google.com/document/d/1m-nJNkbpojnCpwkNffJcWgmNJwTfrd0OxfgxtQmuMEQ/edit?usp=sharing'

    useEffect(() => {
        const fetch = async () => {
            if (idLady.length > 0) {
                if (ladyIdsYevhen.includes(idLady)) {
                    adminId = 'C2436';
                    await IsLogin(setLogin, login, adminId);

                } else if (ladyIdsViktor.includes(idLady)) {
                    adminId = 'C1618';
                    await IsLogin(setLogin, login, adminId);
                } else if (ladyIdsViktorC2135.includes(idLady)) {
                    adminId = 'C2135';
                    await IsLogin(setLogin, login, adminId);
                } else if (ladyIdsViktorC1337.includes(idLady)) {
                    adminId = 'C1337';
                    await IsLogin(setLogin, login, adminId);
                }
            }
        }
        fetch();

    }, []);

    useEffect(() => {
        const fetch = async () => {
            const profit = await GetTodayStatistics(idLady);

            if (profit) {
                const sumCredits = profit.reduce((total, item) => total + parseFloat(item.credits), 0);
                const sumUah = (sumCredits * CreditCost);
                const uah = sumUah.toFixed(2)
                setSumCreditsToday(uah);
            }
        }
        fetch();

    }, []);

    return (
        <div>
            <nav className="navbar-charm">
                <ul id="nav-mobile" className="nav-list-navbar">
                    <li><img src={photoLady} className="photo-lady" alt="Lady Photo" /></li>
                    <li><a href={ladyProfile} className="id-lady" target={'_blank'} rel="noopener noreferrer">{idLady}</a></li>

                    <li> <a className="links_navbar" href='https://www.charmdate.com/lady/online.php'>ЧАТ</a></li>
                    <li> <a style={{display: 'inline'}} className="links_navbar" href={linkToInboxLetter} target={'_blank'} rel="noopener noreferrer">ЛИСТИ {length ? <span style={{color: 'peru', display: 'inline'}}>({length})</span> : null}</a></li>
                    <li> <a className="links_navbar" href={templates} target={'_blank'} rel="noopener noreferrer">ШАБЛОНИ</a></li>
                    <li> <a className="links_navbar" href={linkToMassLetter} target={'_blank'} rel="noopener noreferrer">МАСОВА РОЗСИЛКА</a></li>
                    <li> <a className="links_navbar" href={sentLetterLink} target={'_blank'} rel="noopener noreferrer">НАДІСЛАНІ ЛИСТИ</a></li>
                    <li> <a className="links_navbar" href={chatLink} target={'_blank'} rel="noopener noreferrer">ПЕРЕГЛЯНУТИ ЧАТИ</a></li>


                    <li style={{ marginLeft: 'auto' }}> <a className="logout" href='https://www.charmdate.com/clagt/manager/approved_pc.php' target={'_blank'}>сьогодні ${sumCreditsToday}</a></li>
                    <li> <a className="logout" href={instruction} target={'_blank'} rel="noopener noreferrer">інструкція</a></li>
                    <li> <a className="logout" href={inChat} target={'_blank'} rel="noopener noreferrer">in chat</a></li>
                    <li> <a className="logout" href="https://www.charmdate.com/lady/index.php" onClick={Logout}>ВИЙТИ</a></li>
                </ul>
             </nav>
        </div>
    )
}

export default Navbar;
