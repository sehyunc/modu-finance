import { Platform } from "@/models/Vault";

export interface RibbonVaultConstructor {
  id: string;
  name: string;
  symbol: string;
  underlyingSymbol: string;
  lockedAmount: string;
  cap: string;
  totalWithdrawalFee?: string;
  withdrawalFee?: number;
  depositors?: string[];
  decimals: number;
  platform: Platform;
}

export interface FontisVaultConstructor {
  id: string;
  collateralAmount: string;
  otokenAmount: string;
  vaultTotalAssets: string;
  yieldFromPremium: string;
  platform: Platform;
}