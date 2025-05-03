export const getBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      if (reader.result) {
        resolve(reader.result as string);
      } else {
        reject(new Error("File could not be converted to Base64"));
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };
  });
};

export const formatNaira = (price: number) => {
  return new Intl.NumberFormat("en-NG", {
    currency: "NGN",
    style: "currency",
  }).format(price);
};

export const formatDollar = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  }).format(price);
};

import { format } from "date-fns";
import { toast } from "sonner";

export const copyToClipboard = async (
  content: string,
  msg = "Copied to clipboard"
) => {
  try {
    await navigator.clipboard.writeText(content);
    toast.success(msg);
  } catch (error: any) {
    toast.error(error || "Unable to copy to clipboard");
  }
};

export const formatDate = (date: Date | string) => {
  return format(new Date(date), "MMM dd, yyyy");
};
