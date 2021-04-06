import { List, Record, RecordOf } from 'immutable'

import { getNetworkInfo } from 'src/config'

const { nativeCoin } = getNetworkInfo()

export const AVAILABLE_CURRENCIES = {
  NETWORK: nativeCoin.symbol.toLocaleUpperCase(),
  USD: 'USD',
} as const

export type BalanceCurrencyRecord = {
  currencyName?: string
  tokenAddress?: string
  balanceInBaseCurrency: string
  balanceInSelectedCurrency: string
}

export const makeBalanceCurrency = Record<BalanceCurrencyRecord>({
  currencyName: '',
  tokenAddress: '',
  balanceInBaseCurrency: '',
  balanceInSelectedCurrency: '',
})

export type CurrencyRateValueRecord = RecordOf<BalanceCurrencyRecord>

export type BalanceCurrencyList = List<CurrencyRateValueRecord>

export interface CurrencyRateValue {
  currencyRate?: number
  selectedCurrency?: string
  currencyBalances?: BalanceCurrencyList
}
