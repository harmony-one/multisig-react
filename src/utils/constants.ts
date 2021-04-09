export const APP_ENV = process.env.REACT_APP_ENV
export const NODE_ENV = process.env.NODE_ENV
export const IS_PRODUCTION = process.env.NODE_ENV === 'production'
export const NETWORK = process.env.REACT_APP_NETWORK?.toUpperCase() || 'MAINNET'

export const LATEST_SAFE_VERSION = process.env.REACT_APP_LATEST_SAFE_VERSION || '1.2.0'
export const APP_VERSION = process.env.REACT_APP_APP_VERSION || 'not-defined'
export const COLLECTIBLES_SOURCE = process.env.REACT_APP_COLLECTIBLES_SOURCE || 'Gnosis'
export const TIMEOUT = process.env.NODE_ENV === 'test' ? 1500 : 5000
export const EXCHANGE_RATE_URL = 'https://api.exchangeratesapi.io/latest'
export const SPENDING_LIMIT_MODULE_ADDRESS =
  process.env.REACT_APP_SPENDING_LIMIT_MODULE_ADDRESS || '0x4513F10685CA4f2aFf040849d58526071E044A75'
