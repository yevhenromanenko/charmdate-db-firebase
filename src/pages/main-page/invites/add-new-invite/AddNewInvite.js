import axios from "axios";

const AddNewInvite = async (newInvite, setInvites, invites, setNewInvite, loginData) => {

    if (newInvite.trim().length < 5) {
        alert('Занадто короткий. Мінімум 5 символів.');
        return;
    } else if (newInvite.trim().length > 80) {
        alert('Занодто довгий. Максимум 80 символів.');
        return;
    }

    const ladyId = loginData.loginUserId;
    const status = '0';

    const apiUrl = 'https://www.charmdate.com/livechat/setstatus.php?action=ladyaddinvitetemplate';
    const requestBody = `curwomanid=${ladyId}&service_type=0&womanid=${ladyId}&autoflag=1&typeid=1&msg=${newInvite}`;


    try {
        await axios.post(apiUrl, requestBody, {
            headers: {
                'accept': '*/*',
                'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'x-requested-with': 'XMLHttpRequest'
            },
            referrer: 'https://www.charmdate.com/lady/online.php',
            referrerPolicy: 'strict-origin-when-cross-origin',
        });

        const newInviteObj = { msgid: Date.now().toString(), msg: newInvite, status: status };
        setInvites([ newInviteObj, ...invites ]);
        setNewInvite('');
    } catch (error) {
        // Обработка ошибок (если необходимо)
        console.error('Error:', error.message);
        alert('При отправке приглашения произошла ошибка. Пожалуйста, повторите попытку позже.');
    }
};

export default AddNewInvite;
