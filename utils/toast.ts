import toast from "react-hot-toast";

export const showToast = (message: string, type: "success" | "error") => {
  return toast(message, {
    style: {
      border: "4px dashed black",
      background: "white",
      color: type === "success" ? "#84cc16" : "#ef4444",
      borderRadius: 0,
      padding: "4px 8px",
      boxShadow: "none",
      fontSize: "10px",
    },
    icon: "",
  });
};
