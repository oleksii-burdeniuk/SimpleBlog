export const capitalizeFirstLetter = (text: string): string => {
  try {
    if (!text || text?.length === 0) return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
  } catch (err) {
    console.log(err, text);
    return text;
  }
};
