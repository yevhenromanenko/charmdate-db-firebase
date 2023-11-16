import axios from "axios";

const DeleteAdmire = async (setAdmire, admire, ladyId, admireId) => {
    const confirmation = window.confirm("Ви дійсно хочете видалити admire mail?");

    if (confirmation) {
        try {
            await axios.post('https://www.charmdate.com/clagt/admire/template/template.php?do=del', {
                at_code: [`${admireId}`, `${ladyId}`]
            }, {
                headers: {
                    "accept": "*/*",
                    "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "x-requested-with": "XMLHttpRequest"
                }
            });
            const updatedInvites = admire.filter(item => item.id !== admireId);
            setAdmire(updatedInvites);
        } catch (error) {
            console.error("Error deleting invite:", error);
        }
    } else {
        console.log("Операція видалення відмінена користувачем.");
    }
}

export default DeleteAdmire;
