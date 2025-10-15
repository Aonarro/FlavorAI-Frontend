import {toast} from "sonner";

export function redirectToLogin(message = 'Session expired, please login') {
    toast.error(message);

    if (typeof window !== 'undefined') {
        setTimeout(() => {
            window.location.href = '/login';
        }, 100);
    }
}