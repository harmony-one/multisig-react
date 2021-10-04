import {WalletInitOptions} from 'harmony-jenya-bnc-onboard/dist/src/interfaces'

import {getNetworkId, getRpcServiceUrl, getNetworkConfigDisabledWallets} from 'src/config'
import {WALLETS} from 'src/config/networks/network.d'

const disabledWallets = getNetworkConfigDisabledWallets()

type Wallet = WalletInitOptions & {
    desktop: boolean
    walletName: WALLETS
}

const rpcUrl = getRpcServiceUrl()
const wallets: Wallet[] = [
    {walletName: WALLETS.METAMASK, preferred: true, desktop: false},
    {walletName: WALLETS.ONEWALLET, preferred: true, desktop: false},
]

export const getSupportedWallets = (): WalletInitOptions[] => {
    const {isDesktop} = window as any
    /* eslint-disable no-unused-vars */
    if (isDesktop) {
        return wallets.filter((wallet) => wallet.desktop).map(({desktop, ...rest}) => rest)
    }

    return wallets.map(({desktop, ...rest}) => rest).filter((w) => !disabledWallets.includes(w.walletName))
}
