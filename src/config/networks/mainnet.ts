import HarmonyLogo from 'src/config/assets/token-one.png'
import { EnvironmentSettings, HARMONY_NETWORK, NetworkConfig } from 'src/config/networks/network.d'

const baseConfig: EnvironmentSettings = {
  txServiceUrl: 'http://localhost:8000/api/v1',
  safeAppsUrl: 'https://safe-apps.dev.gnosisdev.com',
  gasPriceOracle: {
    url: 'https://ethgasstation.info/json/ethgasAPI.json',
    gasParameter: 'average',
  },
  rpcServiceUrl: 'https://api.s0.t.hmny.io',
  networkExplorerName: 'Harmony Explorer',
  networkExplorerUrl: 'https://explorer.harmony.one/#',
  networkExplorerApiUrl: 'https://api.bscscan.com/api',
}

const mainnet: NetworkConfig = {
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
      txServiceUrl: 'http://localhost:8000/api/v1',
      safeAppsUrl: 'https://apps.gnosis-safe.io',
    },
  },
  network: {
    id: HARMONY_NETWORK.MAINNET,
    backgroundColor: '#E8E7E6',
    textColor: '#001428',
    label: 'Mainnet',
    isTestNet: false,
    nativeCoin: {
      address: '0x000',
      name: 'Harmony',
      symbol: 'ONE',
      decimals: 18,
      logoUri: HarmonyLogo,
    },
  },
}

export default mainnet
