import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const showToastError = (error) => {
  console.log(error);
  if (error.data) {
    if (error.data.message === "Unauthorize") {
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      Cookies.remove("accessToken");
      window.location.replace("/");
    }
    return toastError(error.data.message);
  } else {
    return toastError(error.error);
  }
};

export const toastError = (message) => {
  return toast.error(message, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    pauseOnFocusLoss: false,
    draggable: true,
    progress: undefined,
    toastId: "toaster-error",
  });
};

export const toastSuccess = (message) => {
  return toast.success(message, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    pauseOnFocusLoss: false,
    draggable: true,
    progress: undefined,
    toastId: "toaster-success",
  });
};
