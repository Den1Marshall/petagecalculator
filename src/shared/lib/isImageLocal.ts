export const isImageLocal = (src: string): boolean => {
  return src.startsWith('/_next/static/');
};
