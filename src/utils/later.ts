export const later = (duartion: number = 2) => {
  return new Promise((resolve) => setTimeout(resolve, duartion * 1000));
};
