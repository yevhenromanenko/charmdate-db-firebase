import axios from "axios";
const cheerio = require('cheerio'); // Добавьте библиотеку Cheerio для парсинга HTML

const GetLadyInfo = async () => {
    const url = "https://www.charmdate.com/clagt/woman/women_profiles_posted.php?groupshow=4&listnum=150&show=yes";
    let ladyArray = [];

    try {
        const response = await axios.get(url, {
            headers: {
                "accept": "*/*",
                "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                "x-requested-with": "XMLHttpRequest"
            },
            referrer: "https://www.charmdate.com/clagt/about/contact_us.php?action=userlist",
            referrerPolicy: "strict-origin-when-cross-origin",
            credentials: "include"
        });

        // Load the HTML response into Cheerio
        const $ = cheerio.load(response.data);

        // Iterate over each table row and extract the required data
        $('tr[align="center"][bgcolor="#FFFFFF"]').each(async (index, element) => {
            const $row = $(element);

            // Extract data from the first column (Анкета)
            const photo = $row.find('td:nth-child(3) img').attr('src');
            const womanId = $row.find('td:nth-child(3) a').text().trim();
            const womanName = $row.find('td:nth-child(5)').text().trim();
            const age = $row.find('td:nth-child(7)').text().trim();

            ladyArray.push({photo: photo, womanId: womanId, womanName: womanName, age: age})
        });

        return ladyArray;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export default GetLadyInfo;
