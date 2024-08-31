import '../navbar/Navbar.scss'
import {useEffect, useState} from "react";
import {CreditCost, CreditCostToAdmin} from "../../functions/credit-cost/credit-cost";
import GetTodayStatistics from "../lady-profit/get-today-statistics/GetTodayStatistics";
import Logout from "../navbar/Logout";
import GetTodayStatisticsAllProfiles
    from "../admin-page/get-today-statistics-all-profiles/GetTodayStatisticsAllProfiles";
import GiftComponent from "../admin-page/gift-component/GiftComponent";
import EmfComponent from "../admin-page/emf-component/EmfComponent";
import FirstComponent from "../admin-page/first-component/FirstComponent";
import MailComponent from "../admin-page/mail-component/MailComponent";
import PrivateComponent from "../admin-page/private-component/PrivateComponent";
import ContactComponent from "../admin-page/contact-component/ContactComponent";

const NavbarAdmin = ({setIsAdmin, setLastLoginTime}) => {

    const [sumCreditsToday, setSumCreditsToday] = useState(0);

    const emfLetters = 'https://www.charmdate.com/clagt/emf_men_women_unprinted.php?groupshow=4'
    const giftsFlowers = 'https://www.charmdate.com/clagt/gift/goods_delivery.php'
    const firstEMF = 'https://www.charmdate.com/clagt/first_emf.php?first_emf_type=&groupshow=4&womanid=&manid=&sentMail=not_yet&agtstaff='
    const contactRequest = 'https://www.charmdate.com/clagt/contact_request/processing.php?flag=1'
    const mailPhoto = 'https://www.charmdate.com/clagt/woman/women_album_review.php'
    const privatePhoto = `https://www.charmdate.com/clagt/woman/private_photo_review.php`
    const instruction = 'https://docs.google.com/document/d/1m-nJNkbpojnCpwkNffJcWgmNJwTfrd0OxfgxtQmuMEQ/edit?usp=sharing'

    // const addNewProfile = `https://www.charmdate.com/clagt/woman/submit_profile_alert.php`;
    // const approvePost = `https://www.charmdate.com/clagt/woman/women_profiles_pro.php`;


    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('lastLoginTime');
        setIsAdmin(false);
        setLastLoginTime(null);
    };

    useEffect(() => {
        const fetch = async () => {
            const total = await GetTodayStatisticsAllProfiles();

            if (total) {
                const totalCredits = total.reduce((total, item) => total + parseFloat(item.credits), 0);
                setSumCreditsToday(totalCredits.toFixed(1));  // Используйте функцию обновления состояния
            }
        }
        fetch();
    }, []);


    return (
        <div>
            <nav className="navbar-charm-admin">
                <ul id="nav-mobile" className="nav-list-navbar">
                    <li> <a className="links_navbar" href='https://www.charmdate.com/clagt/woman/women_profiles_allow_edit.php'>АНКЕТИ</a></li>
                    <li> <a style={{display: 'inline'}} className="links_navbar" href={emfLetters} rel="noopener noreferrer"><EmfComponent/></a></li>
                    <li> <a className="links_navbar" href={firstEMF} rel="noopener noreferrer"><FirstComponent/></a></li>
                    <li> <a className="links_navbar" href={giftsFlowers} rel="noopener noreferrer"><GiftComponent/></a></li>
                    <li> <a className="links_navbar" href={mailPhoto} rel="noopener noreferrer"><MailComponent/></a></li>
                    <li> <a className="links_navbar" href={privatePhoto} rel="noopener noreferrer"><PrivateComponent/></a></li>
                    <li> <a className="links_navbar" href={contactRequest} rel="noopener noreferrer"><ContactComponent/></a></li>


                    <li style={{ marginLeft: 'auto' }}> <a className="logout">сьогодні ${(sumCreditsToday * CreditCostToAdmin).toFixed(2)}</a></li>
                    <li> <a className="logout" href={instruction} target={'_blank'} rel="noopener noreferrer">інструкція</a></li>
                    <li> <a className="logout" href="/#" onClick={handleLogout}>ВИЙТИ</a></li>
                </ul>
            </nav>
        </div>
    )
}

export default NavbarAdmin;
