//
//
const FocusTab = () => {
    try {
        window.focus();
    } catch (error) {
        console.error('Не удалось сделать вкладку активной:', error);
    }
};

export default FocusTab;
