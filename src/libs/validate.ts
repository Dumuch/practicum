export const isEmpty = (value: string) => {
  return !value;
};

export const hasForbiddenCharacters = (value: string) => {
  const htmlTagRegex = /<[^>]*>/g;
  return htmlTagRegex.test(value);
};
