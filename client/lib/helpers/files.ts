type AcceptedFileTypes = "pdf" | "jpeg" | "png";

export const determineFileType = (type: string): AcceptedFileTypes | null => {
  if (type.endsWith("pdf")) {
    return "pdf";
  }

  if (type.endsWith("jpeg")) {
    return "jpeg";
  }

  if (type.endsWith("png")) {
    return "png";
  }

  return null;
};
