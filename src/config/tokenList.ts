import {BalanceEndpoint} from '../logic/currencyValues/api/fetchTokenCurrenciesBalances'

const host = window.location.origin
const tokensDefaultList = [
    {
        address: '0x70d621dA4340D97374960b1fD12A71F7f9C67b7E',
        uri: host + '/resources/davinci_lock.png',
    },
    {
        address: '0xB8E0497018c991E86311b64EFd9D57b06aEDbBAE',
        uri: host + '/resources/vinci_blue.png',
    },
]


export const getDefaultTokenUri = (address: string) => {
    const t = tokensDefaultList.find(t => t.address === address)

    if (t) {
        return t.uri
    }

    return null
}