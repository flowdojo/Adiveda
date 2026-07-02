export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const upperCaseWords = (str) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

export const wordCount = (str) => {
  return str.split(/\s+/).filter(Boolean).length;
};
