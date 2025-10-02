export interface Asset {
  id: number;
  name: string;
  symbol: string;
  amount: number;
  value: number;
  icon: string;
  color?: string;
}

export interface AllocationItem {
  name: string;
  percentage: number;
  color: string;
}
