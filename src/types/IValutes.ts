export interface IValute {
  ID: string;
  NumCode: string;
  CharCode: string;
  Nominal: number;
  Name: string;
  Value: number;
  Previous: number;
}
export interface IValutes {
  [name: string]: IValute;
}
