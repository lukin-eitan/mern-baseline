export type CustomErrorContent = {
  name: string;
  message: string;
  context?: { [key: string]: any };
};

export interface DGError {
  name: string;
  message: string;
  err?: CustomErrorContent | Error;
  stack?: any;
  type: 'DGError';
}
