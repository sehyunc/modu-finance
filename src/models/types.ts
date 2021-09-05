export interface VaultConstructor {
  id: string;
  name: string;
  symbol: string;
  underlyingSymbol: string;
  lockedAmount: string;
  cap: string;
  totalWithdrawalFee: string;
  depositors: string[];
  decimals: number;
}
