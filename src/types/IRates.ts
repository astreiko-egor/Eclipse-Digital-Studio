export interface IRates {
  today: {
    [name: string]: number;
  };
  yesterday: {
    [name: string]: number;
  };
}
