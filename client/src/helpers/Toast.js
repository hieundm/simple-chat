import { toast } from "react-toastify";

toast.configure();

const BASE_OPTION = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  progress: undefined,
};

const BASE_TYPE = toast.TYPE;

const notify = {
  custom: (content, options) => {
    const _options = {
      ...BASE_OPTION,
      ...options,
    };

    toast(content, _options);
  }
  ,
  error: (message, options) => {
    const _options = {
      ...BASE_OPTION,
      ...options,
    };

    toast.error(message, _options);
  },
  success: (message, options) => {
    const _options = {
      ...BASE_OPTION,
      ...options,
    };

    toast.success(message, _options);
  },
};

export { notify, BASE_TYPE as type };
