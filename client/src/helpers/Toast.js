import { toast } from "react-toastify";

toast.configure();

const notify = {
  error: (message, options) => {
    const baseOption = {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
    };

    const _options = {
      ...options,
      ...baseOption,
    };

    toast.error(message, _options);
  },
  success: (message, options) => {
    const baseOption = {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
    };

    const _options = {
      ...options,
      ...baseOption,
    };

    toast.success(message, _options);
  },
};

export { notify };
