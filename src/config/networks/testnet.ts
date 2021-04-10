import HarmonyLogo from 'src/config/assets/token-one.png'
import { EnvironmentSettings, HARMONY_NETWORK, NetworkConfig } from 'src/config/networks/network.d'

const baseConfig: EnvironmentSettings = {
  txServiceUrl: 'https://multisig-staging.hmny.io/api/v1',
  safeAppsUrl: 'https://safe-apps.dev.gnosisdev.com',
  gasPriceOracle: {
    url: 'https://ethgasstation.info/json/ethgasAPI.json',
    gasParameter: 'average',
  },
  rpcServiceUrl: 'https://api.s0.b.hmny.io',
  networkExplorerName: 'Harmony Explorer',
  networkExplorerUrl: 'https://explorer.pops.one/#',
  networkExplorerApiUrl: 'https://api-rinkeby.etherscan.io/api',
}

const testnet: NetworkConfig = {
  environment: {
    dev: {
      ...baseConfig,
    },
    staging: {
      ...baseConfig,
      safeAppsUrl: 'https://safe-apps.staging.gnosisdev.com',
    },
    production: {
      ...baseConfig,
      txServiceUrl: 'https://multisig-staging.hmny.io/api/v1',
      safeAppsUrl: 'https://apps.gnosis-safe.io',
    },
  },
  network: {
    id: HARMONY_NETWORK.TESTNET,
    backgroundColor: '#E8673C',
    textColor: '#ffffff',
    label: 'Testnet',
    isTestNet: true,
    nativeCoin: {
      address: '0x000',
      name: 'Harmony',
      symbol: 'ONE',
      decimals: 18,
      logoUri: HarmonyLogo,
    },
  },
}

export default testnet
