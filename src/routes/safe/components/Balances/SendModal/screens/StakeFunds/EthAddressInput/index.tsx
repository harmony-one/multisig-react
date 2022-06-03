import { makeStyles } from '@material-ui/core/styles'
import React, { useState } from 'react'
import { useFormState, useField } from 'react-final-form'

import { ScanQRWrapper } from 'src/components/ScanQRModal/ScanQRWrapper'
import { ContractsAddressBookInput } from 'src/routes/safe/components/Balances/SendModal/screens/AddressBookInput'
import Field from 'src/components/forms/Field'
import TextField from 'src/components/forms/TextField'
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

  return (
    <>
      <Row margin="md">
        <Col xs={5}>
          <ContractsAddressBookInput
            label={text}
            setSelectedEntry={setSelectedEntry}
            setIsValidAddress={() => {}}
            fieldMutator={onScannedValue}
            pristine={pristine}
          />
        </Col>
      </Row>
    </>
  )
}
