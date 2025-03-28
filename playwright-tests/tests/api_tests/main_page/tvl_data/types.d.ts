export interface Value {
  name: string;
  value: number;
}

export interface Chain {
  chainName: string;
  values: Value[];
}