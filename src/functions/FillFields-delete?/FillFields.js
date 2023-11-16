import React from "react";
import '../../pages/templates/Templates.scss'
import GetTelNumber from "../get-tel-number/GetTelNumber";

const FillFields = ({idLady}) => {

    const fillFields = async () => {
        const urlLady = `https://www.charmdate.com/clagt/woman/women_preview_profile.php?womanid=${idLady}`;
        const telNumber = await GetTelNumber(urlLady);

        const rmethodSelect = document.querySelector('select[name="rmethod"]');

        // Если элемент найден, устанавливаем значение
        if (rmethodSelect) {
            rmethodSelect.value = '1'; // Значение, которое нужно установить
        }

        // Ищем textarea с именем "lady_tel"
        const ladyTelTextarea = document.querySelector('textarea[name="lady_tel"]');

        // Если элемент найден, устанавливаем значение переменной telNumber
        if (ladyTelTextarea) {
            ladyTelTextarea.value = telNumber;
        }
    }


    return (
        <>
            <div className={'email-form'}>
                <button className={'show-hide-button'} onClick={fillFields}>Заповнити поля</button>
                <p className={'info-email-form'}>Натисніть на кнопку "Заповнити поля" та перейдіть далі!</p>
            </div>
        </>
    )
}

export default FillFields;
