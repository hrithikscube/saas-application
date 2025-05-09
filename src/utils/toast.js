import { toast } from "react-toastify";

export const showToastMessage = (message, type, theme = "light") => {
    if (type === "error") {
      toast.error(message, {
        theme: theme,
      });
    } else {
      toast.success(message, {
        theme: theme,
      });
    }
  };