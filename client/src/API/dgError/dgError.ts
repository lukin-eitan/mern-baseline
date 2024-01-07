export type CustomErrorContent = {
  name: string;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context?: { [key: string]: any };
};

export interface DGError {
  name: string;
  message: string;
  err?: CustomErrorContent | Error;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stack?: any;
  type: 'DGError';
}
