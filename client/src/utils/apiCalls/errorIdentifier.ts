// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isDGError = (data: any): boolean => {
  if ('type' in data && data.type === 'DGError') return true;
  return false;
};
