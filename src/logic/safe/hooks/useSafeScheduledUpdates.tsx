import { useEffect, useRef, useState } from 'react'
import { batch, useDispatch } from 'react-redux'

import { fetchCollectibles } from 'src/logic/collectibles/store/actions/fetchCollectibles'
import fetchSafeTokens from 'src/logic/tokens/store/actions/fetchSafeTokens'
import fetchEtherBalance from 'src/logic/safe/store/actions/fetchEtherBalance'
import { checkAndUpdateSafe } from 'src/logic/safe/store/actions/fetchSafe'
import fetchTransactions from 'src/logic/safe/store/actions/transactions/fetchTransactions'
import { TIMEOUT } from 'src/utils/constants'

export const useSafeScheduledUpdates = (safeLoaded: boolean, safeAddress?: string): void => {
  const dispatch = useDispatch<any>()
  const timer = useRef<number>()
  const [isInitialLoad, setInitialLoad] = useState(true)

  useEffect(() => {
    // using this variable to prevent setting a timeout when the component is already unmounted or the effect
    // has to run again
    let mounted = true
    const fetchSafeData = async (address: string): Promise<void> => {
      await batch(async () => {
        const promises = [
          dispatch(fetchEtherBalance(address)),
          dispatch(fetchSafeTokens(address)),
          dispatch(fetchCollectibles(address)),
          dispatch(checkAndUpdateSafe(address)),
        ]
        // Don't make heavy request twice: transactions is loaded on useLoadSafe init
        if (!isInitialLoad) {
          promises.push(dispatch(fetchTransactions(address)))
        }
        await Promise.all(promises)
      })

      if (mounted) {
        timer.current = window.setTimeout(() => {
          setInitialLoad(false)
          fetchSafeData(address)
        }, TIMEOUT * 60)
      }
    }

    if (safeAddress && safeLoaded) {
      fetchSafeData(safeAddress)
    }

    return () => {
      mounted = false
      clearTimeout(timer.current)
    }
  }, [dispatch, safeAddress, safeLoaded, isInitialLoad])
}
