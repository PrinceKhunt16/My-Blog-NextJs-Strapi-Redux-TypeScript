import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ToastContainerBox() {
    return (
        <div className='toastContainer'>
            <ToastContainer
                autoClose={4000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
            />
        </div>
    )
}