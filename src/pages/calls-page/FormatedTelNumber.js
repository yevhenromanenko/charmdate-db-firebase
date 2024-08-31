

const FormatedTelNumber = (phoneNumber) => {
    // Убираем все символы, кроме цифр
    const numericPhoneNumber = phoneNumber.replace(/\D/g, '');

    // Если номер начинается с 0, добавляем код страны +38
    if (numericPhoneNumber.startsWith('0')) {
        return `+38${numericPhoneNumber}`;
    }

    // Если номер начинается с +, добавляем код страны +380
    // if (numericPhoneNumber.startsWith('+')) {
    //     return `+380${numericPhoneNumber.slice(1)}`;
    // }

    if (numericPhoneNumber.startsWith('+380')) {
        return numericPhoneNumber.replace(/-/g, '');
    }

    if (numericPhoneNumber.startsWith('+')) {
        return `+380${numericPhoneNumber.slice(1)}`; // Убираем первый символ "+", если есть
    }

    // Если номер не начинается ни с чего, добавляем код страны +380
    // Если номер не начинается с "+", добавляем код страны +380 и убираем все символы "-"

    return `+380${numericPhoneNumber.replace(/-/g, '')}`;
};

export default FormatedTelNumber;
