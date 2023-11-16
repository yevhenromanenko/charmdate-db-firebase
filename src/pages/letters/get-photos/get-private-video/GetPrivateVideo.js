import axios from "axios";

const GetPrivateVideo = async (ladyId, getRandom, manId) => {
    try {
        const response = await axios.get(`https://www.charmdate.com/clagt/get-short-video.php?action=images&womanid=${ladyId}&manid=${manId}&_dc=${getRandom}`, {
            headers: {
                "accept": "*/*",
                "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                "x-requested-with": "XMLHttpRequest"
            },
            referrer: "https://www.charmdate.com/clagt/about/contact_us.php?action=mass-emf",
            referrerPolicy: "strict-origin-when-cross-origin",
            method: "GET",
        });

        const imageData = response.data.images;
        const resultArray = imageData.map(item => ({ name: item.name, url: item.url }));

        return resultArray;
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

export default GetPrivateVideo;
