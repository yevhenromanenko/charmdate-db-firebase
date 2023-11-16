
const AddNewPersonalInvite = (newInvite, setInvitesPersonal, invitesPersonal, setNewInvite, loginData) => {

    if (newInvite.trim().length < 5) {
        alert('Занадто короткий. Мінімум 5 символів.');
        return;
    } else if (newInvite.trim().length > 80) {
        alert('Занодто довгий. Максимум 80 символів.');
        return;
    }

    const newPersonalInvite = {
        msgid: Date.now().toString(),
        msg: newInvite,
        ladyId: loginData.loginUserId,
        smile: true,
    };

    setInvitesPersonal([...invitesPersonal, newPersonalInvite]);
    setNewInvite('');
};

export default AddNewPersonalInvite;
