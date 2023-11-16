
const ToggleLanguage = (language, setShowTranslateRu, setShowTranslateUa) => {
    if (language === 'ru') {
        setShowTranslateRu(true);
        setShowTranslateUa(false);
    } else if (language === 'ua') {
        setShowTranslateRu(false);
        setShowTranslateUa(true);
    }
};

export default ToggleLanguage;
