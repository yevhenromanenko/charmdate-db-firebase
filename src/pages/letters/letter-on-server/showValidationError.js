import Swal from "sweetalert2";

export function showValidationError(text) {
    Swal.fire({
        icon: 'error',
        title: 'Помилка',
        text: text,
    });
}
