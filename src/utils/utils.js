export const sleep = (min) => {
  return new Promise((resolve) => setTimeout(resolve, min * 60000));
};

export const isValidHttpUrl = (string) => {
  try {
    new URL(string);
  } catch (e) {
    return false;
  }

  return true;
};
