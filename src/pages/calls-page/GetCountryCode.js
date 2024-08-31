import axios from "axios";

const GetCountryCode = async (manId) => {
    try {
        const response = await axios.post(
            'https://www.charmdate.com/clagt/lovecall/get_info.php?act=getmaninfo',
            `manid=${manId}`,
            {
                headers: {
                    'accept': 'application/xml, text/xml, */*',
                    'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                    'content-type': 'application/x-www-form-urlencoded',
                    'x-requested-with': 'XMLHttpRequest',
                },
                referrer: 'https://www.charmdate.com/clagt/lovecall/add.php?act=saveandsubmit',
                referrerPolicy: 'strict-origin-when-cross-origin',
                mode: 'cors',
                credentials: 'include',
            }
        );

        // Parsing XML response using DOMParser
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, 'text/xml');

        // Extracting countrycode
        const countryCode = xmlDoc.querySelector('manprofile countrycode').textContent;

        return countryCode;

        // You can use countryCode as needed in the rest of your code
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

export default GetCountryCode;
