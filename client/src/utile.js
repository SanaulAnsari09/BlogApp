export const readingTime = (html) => {
  const wordsPerMinute = 200;
  const plainText = html.replace(/<[^>]+>/g, " ");
  const wordCount = plainText.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};
export const getFormattedDate = (isoDate) => {
  const formatDate = new Date(isoDate || Date.now()).toLocaleDateString();
  return formatDate;
};
