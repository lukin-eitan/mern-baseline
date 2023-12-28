import { DGError } from '../API/dgError/dgError.js';

export const makeDGError = () => {
  return { type: 'DGError' } as DGError;
};
