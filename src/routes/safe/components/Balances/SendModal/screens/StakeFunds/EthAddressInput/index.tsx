import { makeStyles } from '@material-ui/core/styles'
import React, { useState } from 'react'
import { useFormState, useField } from 'react-final-form'

import { ContractsAddressBookInput } from 'src/routes/safe/components/Balances/SendModal/screens/AddressBookInput'
import {
  composeValidators,
  mustBeEthereumAddress,
  mustBeEthereumContractAddress,
  required,
  Validator,
} from 'src/components/forms/validator'
import Col from 'src/components/layout/Col'
import Row from 'src/components/layout/Row'
import { styles } from 'src/routes/safe/components/Balances/SendModal/screens/ContractInteraction/style'
import {ScanQRWrapper} from "../../../../../../../../components/ScanQRModal/ScanQRWrapper";

const useStyles = makeStyles(styles)

export interface EthAddressInputProps {
  isContract?: boolean
  isRequired?: boolean
  name: string
  onScannedValue: (scannedValue: string) => void
  text: string
}

export const EthAddressInput = ({
  isContract = true,
  isRequired = true,
  name,
  onScannedValue,
  text,
}: EthAddressInputProps): React.ReactElement => {
  const classes = useStyles()
  const validatorsList = [
    isRequired && required,
    mustBeEthereumAddress,
    isContract && mustBeEthereumContractAddress,
  ] as Validator[]
  const validate = composeValidators(...validatorsList.filter((validator) => validator))
  const { pristine } = useFormState({ subscription: { pristine: true } })
  const {
    input: { value },
  } = useField('validatorAddress', { subscription: { value: true } })
  const [selectedEntry, setSelectedEntry] = useState<{ address?: string; name?: string | null } | null>({
    address: value,
    name: '',
  })

  const handleScan = (value, closeQrModal) => {
    let scannedAddress = value

    if (scannedAddress.startsWith('ethereum:')) {
      scannedAddress = scannedAddress.replace('ethereum:', '')
    }

    setSelectedEntry({ address: scannedAddress })
    onScannedValue(scannedAddress)
    closeQrModal()
  }

  return (
    <>
      <Row margin="md">
        <Col xs={11}>
          <ContractsAddressBookInput
            label={text}
            setSelectedEntry={setSelectedEntry}
            setIsValidAddress={() => {}}
            fieldMutator={onScannedValue}
            pristine={pristine}
          />
        </Col>
        <Col center="xs" className={classes} middle="xs" xs={1}>
          <ScanQRWrapper handleScan={handleScan} />
        </Col>
      </Row>
    </>
  )
}
