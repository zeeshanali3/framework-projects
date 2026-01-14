import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Default toast configuration
const toastConfig = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

// Success toast notification
export const showSuccessToast = (message) => {
  toast.success(message, toastConfig);
};

// Error toast notification
export const showErrorToast = (message) => {
  toast.error(message, toastConfig);
};

// Info toast notification
export const showInfoToast = (message) => {
  toast.info(message, toastConfig);
};

// Warning toast notification
export const showWarningToast = (message) => {
  toast.warning(message, toastConfig);
};

// General purpose toast utility
export const showToast = (message, type = "default") => {
  switch (type?.toLowerCase()) {
    case 'success':
      showSuccessToast(message);
      break;
    case 'error':
      showErrorToast(message);
      break;
    case 'info':
      showInfoToast(message);
      break;
    case 'warning':
      showWarningToast(message);
      break;
    default:
      toast(message, toastConfig);
  }
}; 