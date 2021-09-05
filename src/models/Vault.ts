import { VaultConstructor } from "./types";

const symbolToDecimalMap: { [symbol: string]: number } = {
  WETH: 18,
  WBTC: 8,
  USDC: 6,
};

export class Vault {
  public id: string;
  public name?: string;
  public symbol: string;
  public underlyingSymbol: string;
  public lockedAmount: string;
  public cap: string;
  public totalWithdrawalFee?: string;
  public depositors?: string[];
  public decimals: number;

  constructor(options: VaultConstructor) {
    this.id = options.id;
    this.name = options.name;
    this.symbol = options.symbol;
    this.underlyingSymbol = options.underlyingSymbol;
    this.lockedAmount = options.lockedAmount;
    this.cap = options.cap;
    this.totalWithdrawalFee = options.totalWithdrawalFee;
    this.depositors = options.depositors;
    this.decimals = symbolToDecimalMap[options.underlyingSymbol];
  }

  public static fromGraph(options: VaultConstructor): Vault {
    return new Vault({
      id: options.id,
      name: options.name,
      symbol: options.symbol,
      underlyingSymbol: options.underlyingSymbol,
      lockedAmount: options.lockedAmount,
      cap: options.cap,
      totalWithdrawalFee: options.totalWithdrawalFee,
      depositors: options.depositors,
      decimals: symbolToDecimalMap[options.underlyingSymbol],
    });
  }
}
