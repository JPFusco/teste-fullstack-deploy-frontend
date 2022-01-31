import { toast } from 'react-toastify';

const notifyError = (mensagem: String) => toast.error(`${mensagem}`, {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
  theme: 'colored'
});

const notifySuccess = (mensagem: String) => toast.success(`${mensagem}`, {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
  theme: 'colored'
});

const toasts = { notifyError, notifySuccess };

export default toasts;