import axios from "axios";


const AddNewCamshareInvite = async (newInvite, setInvitesCamshare, invitesCamshare, setNewInvite, loginData) => {

    if (newInvite.trim().length < 5) {
        alert('Занадто короткий. Мінімум 5 символів.');
        return;
    } else if (newInvite.trim().length > 80) {
        alert('Занодто довгий. Максимум 80 символів.');
        return;
    }

    const ladyId = loginData.loginUserId;
    const status = '0';
    const service_type = '1';

    // const apiUrl = 'https://www.charmdate.com/livechat/setstatus.php?action=ladyaddinvitetemplate';
    // const requestBody = `curwomanid=${ladyId}&service_type=0&womanid=${ladyId}&autoflag=1&typeid=1&msg=${newInvite}`;
    const url = "https://www.charmdate.com/livechat/setstatus.php?action=ladyaddinvitetemplate";
    const headers = {
        "accept": "text/plain, */*; q=0.01",
        "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
        "content-type": "application/x-www-form-urlencoded",
        "sec-ch-ua": "\"Google Chrome\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest"
    };
    const referrer = "https://www.charmdate.com/livechat/pad/chat-lady.php?manid=&inviteid=";
    const referrerPolicy = "strict-origin-when-cross-origin";
    const data = `msg=${newInvite}&womanid=${ladyId}&typeid=1&service_type=${service_type}&curwomanid=${ladyId}`;

    try {
        await axios.post(url, data, {
            headers,
            withCredentials: true,
            referrer,
            referrerPolicy,
        });

        const newInviteObj = { msgid: Date.now().toString(), msg: newInvite, status: status, service_type: service_type };
        setInvitesCamshare([ newInviteObj, ...invitesCamshare ]);
        setNewInvite('');
    } catch (error) {
        console.error('Error:', error.message);
        alert('При отправке приглашения произошла ошибка. Пожалуйста, повторите попытку позже.');
    }
}

export default AddNewCamshareInvite;
