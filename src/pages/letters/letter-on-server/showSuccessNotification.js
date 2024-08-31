import Swal from "sweetalert2";
export function showSuccessNotification(text) {
    Swal.fire({
        icon: 'success',
        title: 'Дякую!',
        text: text,
        showConfirmButton: false,
        timer: 2000,
    });
}
