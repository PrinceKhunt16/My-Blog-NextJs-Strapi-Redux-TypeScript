import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Toast(msg : string) {
    return (
        toast(msg, {
            position: "bottom-right",
            autoClose: 4000,
            hideProgressBar: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
            closeButton: false,
            theme: "dark"
        })
    )
}
