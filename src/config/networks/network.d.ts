// matches src/logic/tokens/store/model/token.ts `TokenProps` type

export enum WALLETS {
  METAMASK = 'metamask',
}

export enum FEATURES {
  ERC721 = 'ERC721',
  ERC1155 = 'ERC1155',
  SAFE_APPS = 'SAFE_APPS',
  CONTRACT_INTERACTION = 'CONTRACT_INTERACTION',
  ENS_LOOKUP = 'ENS_LOOKUP',
}

type Token = {
  address: string
  name: string
  symbol: string
  decimals: number
  logoUri?: string
}

export enum HARMONY_NETWORK {
  MAINNET = 1666600000,
  TESTNET = 1666700000,
  UNKNOWN = 0,
}

export type NetworkSettings = {
  // TODO: id now seems to be unnecessary
  id: HARMONY_NETWORK
  backgroundColor: string
  textColor: string
  label: string
  isTestNet: boolean
  nativeCoin: Token
}

// something around this to display or not some critical sections in the app, depending on the network support
// I listed the ones that may conflict with the network.
// If non is present, all the sections are available.
export type SafeFeatures = FEATURES[]

export type Wallets = WALLETS[]

export type GasPriceOracle = {
  url: string
  // Different gas api providers can use a different name to reflect different gas levels based on tx speed
  // For example in ethGasStation for ETHEREUM_MAINNET = safeLow | average | fast
  gasParameter: string
}

type GasPrice =
  | {
      gasPrice: number
      gasPriceOracle?: GasPriceOracle
    }
  | {
      gasPrice?: number
      // for infura there's a REST API Token required stored in: `REACT_APP_INFURA_TOKEN`
      gasPriceOracle: GasPriceOracle
    }

export type EnvironmentSettings = GasPrice & {
  txServiceUrl: string
  // Shall we keep a reference to the relay?
  relayApiUrl?: string
  safeAppsUrl: string
  rpcServiceUrl: string
  networkExplorerName: string
  networkExplorerUrl: string
  networkExplorerApiUrl: string
}

type SafeEnvironments = {
  dev?: EnvironmentSettings
  staging?: EnvironmentSettings
  production: EnvironmentSettings
}

export interface NetworkConfig {
  network: NetworkSettings
  disabledFeatures?: SafeFeatures
  disabledWallets?: Wallets
  environment: SafeEnvironments
}
