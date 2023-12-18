export const getGDriveImage = (url) => {
  if (url?.startsWith?.("https://drive.google.com/file/d/")) {
    const gDriveId = url.split("/")[5];
    return `https://drive.google.com/uc?export=view&id=${gDriveId}`;
  }

  return url;
};
