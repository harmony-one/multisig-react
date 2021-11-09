import { SyntheticEvent } from 'react'
import {getDefaultTokenUri} from 'src/config/tokenList'

import TokenPlaceholder from 'src/routes/safe/components/Balances/assets/token_placeholder.svg'

export const setImageToPlaceholder = (error: SyntheticEvent<HTMLImageElement, Event>): void => {
  const urlSplit = error.currentTarget.src.split('/')
  const token = urlSplit[urlSplit.length - 1].split('.')[0]
  const uri = getDefaultTokenUri(token) || TokenPlaceholder

  error.currentTarget.onerror = null
  error.currentTarget.src = uri
}
