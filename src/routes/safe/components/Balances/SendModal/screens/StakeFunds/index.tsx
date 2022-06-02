import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { useSelector } from 'react-redux'
import { styles } from './style'
import GnoForm from 'src/components/forms/GnoForm'
import Block from 'src/components/layout/Block'
import Hairline from 'src/components/layout/Hairline'
import SafeInfo from 'src/routes/safe/components/Balances/SendModal/SafeInfo'
import {safeParamAddressFromStateSelector, safeSelector} from 'src/logic/safe/store/selectors'
import Buttons from './Buttons'
import ContractABI from './ContractABI'
import { EthAddressInput } from './EthAddressInput'
import FormDivisor from './FormDivisor'
import FormErrorMessage from './FormErrorMessage'
import Header from './Header'
import MethodsDropdown from './MethodsDropdown'
import RenderInputParams from './RenderInputParams'
import RenderOutputParams from './RenderOutputParams'
import { createTxObject, formMutators, handleSubmitError, isReadMethod, ensResolver } from './utils'
import { TransactionReviewType } from './Review'
import { NativeCoinValue } from './NativeCoinValue'
import DelegateAbi from './DelegateABI.json'
import { extractUsefulMethods } from 'src/logic/contractInteraction/sources/ABIService'
import { AbiItem } from 'web3-utils'

const useStyles = makeStyles(styles)

export interface CreatedTx {
  contractAddress: string
  data: string
  selectedMethod: TransactionReviewType
  value: string | number
}

export type ContractInteractionTx = {
  contractAddress?: string
}

export interface ContractInteractionProps {
  contractAddress?: string
  initialValues: any
  isABI: boolean
  onClose: () => void
  switchMethod: () => void
  onNext: (tx: CreatedTx, submit: boolean) => void
}

const StakeFunds: React.FC<ContractInteractionProps> = ({ contractAddress, initialValues, onClose, onNext }) => {
  const classes = useStyles()
  const safeAddress = useSelector(safeParamAddressFromStateSelector)
  let setCallResults

  React.useMemo(() => {
    if (contractAddress) {
      initialValues.contractAddress = contractAddress
    }
  }, [contractAddress, initialValues])

  React.useMemo(() => {
    initialValues.contractAddress = '0x00000000000000000000000000000000000000FC'
    const methods = extractUsefulMethods(DelegateAbi as AbiItem[])
    initialValues.selectedMethod = methods[0]
    initialValues.abi = JSON.stringify(DelegateAbi)
  }, [])

  const handleSubmit = async (
    { contractAddress, validatorAddress, selectedMethod, value, ...values },
    submit = true,
  ): Promise<void | any> => {
    if (value && contractAddress && validatorAddress && selectedMethod) {
      try {
        const valueDecimals = (value * Math.pow(10, 18)).toString()
        const formValues = {
          ...values,
          'methodInput-0x510b11bb3f3c799b11307c01ab7db0d335683ef5b2da98f7697de744f465eacc_0_address': safeAddress,
          'methodInput-0x510b11bb3f3c799b11307c01ab7db0d335683ef5b2da98f7697de744f465eacc_1_address': validatorAddress,
          'methodInput-0x510b11bb3f3c799b11307c01ab7db0d335683ef5b2da98f7697de744f465eacc_2_uint256': valueDecimals,
        }
        const txObject = createTxObject(selectedMethod, contractAddress, formValues)
        const data = txObject.encodeABI()

        if (isReadMethod(selectedMethod) && submit) {
          const result = await txObject.call({ from: safeAddress })
          setCallResults(result)

          // this was a read method, so we won't go to the 'review' screen
          return
        }

        onNext({ ...values, contractAddress, data, selectedMethod, value: '' }, submit)
      } catch (error) {
        return handleSubmitError(error, values)
      }
    }
  }

  return (
    <>
      <Header onClose={onClose} subTitle="1 of 2" title="Stake Funds" />
      <Hairline />
      <GnoForm
        decorators={[ensResolver]}
        formMutators={formMutators}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        subscription={{ submitting: true, pristine: true, values: true }}
      >
        {(submitting, validating, rest, mutators) => {
          setCallResults = mutators.setCallResults
          return (
            <>
              <Block className={classes.formContainer}>
                <SafeInfo />
                <FormDivisor />
                <EthAddressInput
                  name="validatorAddress"
                  onScannedValue={mutators.setValidatorAddress}
                  text="Validator Address*"
                />
                <NativeCoinValue onSetMax={mutators.setMax} />
                <RenderOutputParams />
                <FormErrorMessage />
              </Block>
              <Hairline />
              <Buttons onClose={onClose} />
            </>
          )
        }}
      </GnoForm>
    </>
  )
}

export default StakeFunds
