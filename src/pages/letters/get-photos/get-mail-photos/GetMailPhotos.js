import axios from "axios";

const GetMailPhotos = async (ladyId, getRandom) => {
    const apiUrl = `https://www.charmdate.com/clagt/get-images.php?action=images&womanid=${ladyId}&v=${getRandom}`;

    const headers = {
        "accept": "*/*",
        "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
        "x-requested-with": "XMLHttpRequest"
    };

    const referrer = "https://www.charmdate.com/clagt/about/contact_us.php?action=mass-emf";

    const config = {
        method: 'get',
        url: apiUrl,
        headers: headers,
        referrer: referrer,
        referrerPolicy: 'strict-origin-when-cross-origin',
        credentials: 'include'
    };

    try {
        const response = await axios(config);
        const data = response.data.images;

        const resultArray = data.map(item => ({ name: item.name, url: item.url }));

        return resultArray;
    } catch (error) {
        throw error;
    }
}

export default GetMailPhotos;
