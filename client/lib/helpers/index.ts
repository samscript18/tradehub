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
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};