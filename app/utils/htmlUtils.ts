export const removeHtmlTags = (text: string) =>
  text?.replace(/(<([^>]+)>)/gi, '');
