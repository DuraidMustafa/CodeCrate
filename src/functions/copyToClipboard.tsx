import { toast } from "react-toastify";

const copyToClipboard = async (code: string) => {
  try {
    await navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard!");
  } catch (err) {
    console.log(err);
    toast.error("Failed to copy code");
  }
};
export default copyToClipboard;
