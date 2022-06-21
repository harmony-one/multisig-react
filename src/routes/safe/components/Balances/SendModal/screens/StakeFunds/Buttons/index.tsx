import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { useField, useFormState } from 'react-final-form'

import Button from 'src/components/layout/Button'
import Row from 'src/components/layout/Row'
import { styles } from 'src/routes/safe/components/Balances/SendModal/screens/ContractInteraction/style'

const useStyles = makeStyles(styles)

export interface ButtonProps {
  onClose: () => void
}

const Buttons = ({ onClose }: ButtonProps) => {
  const classes = useStyles()
  const {
    input: { value: validatorAddress },
  } = useField('validatorAddress', { subscription: { value: true } })
  const { modifiedSinceLastSubmit, submitError, submitting, valid, validating } = useFormState({
    subscription: {
      modifiedSinceLastSubmit: true,
      submitError: true,
      submitting: true,
      valid: true,
      validating: true,
    },
  })

  return (
    <Row align="center" className={classes.buttonRow}>
      <Button minWidth={140} onClick={onClose}>
        Cancel
      </Button>
      <Button
        className={classes.submitButton}
        color="primary"
        disabled={
          submitting || validating || ((!valid || !!submitError) && !modifiedSinceLastSubmit) || !validatorAddress
        }
        minWidth={140}
        type="submit"
        variant="contained"
      >
        Review
      </Button>
    </Row>
  )
}

export default Buttons
