// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const authenticationInfoToErrorMapper = (info: any): Error => {
  if (info && 'name' in info && 'message' in info) {
    return { name: info.name, message: info.message } as Error;
  }
  return {} as Error;
};
