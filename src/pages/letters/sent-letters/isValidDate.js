
function isValidDate(dateString) {
    // Паттерн для проверки формата даты: yyyy-MM-dd HH:mm
    const datePattern = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
    return datePattern.test(dateString);
}

export default isValidDate;
