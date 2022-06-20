import axios from 'axios'
import InputBase from '@material-ui/core/InputBase'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { MuiThemeProvider } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { useField, useFormState } from 'react-final-form'

import Col from 'src/components/layout/Col'
import Row from 'src/components/layout/Row'
import { NO_CONTRACT } from 'src/routes/safe/components/Balances/SendModal/screens/ContractInteraction/utils'
import CheckIcon from 'src/routes/safe/components/CurrencyDropdown/img/check.svg'
import { useDropdownStyles } from 'src/routes/safe/components/CurrencyDropdown/style'
import { DropdownListTheme } from 'src/theme/mui'

const MENU_WIDTH = '452px'
const StakingApiUrl = 'https://api.stake.hmny.io'

interface ValidatorApiItem {
  active: boolean
  address: string
  apr: number
  hasLogo: boolean
  name: string
  nameShort: string
  identity: string
  rate: string
  total_stake: string
  uptime_percentage: null | number
}

interface ValidatorsApiResponse {
  validators: ValidatorApiItem[]
  total: number
  totalFound: number
  total_active: number
}

interface MethodsDropdownProps {
  onChange: (method: string) => void
}

const cutString = (str: string, maxLength = 32) => {
  return str.length < maxLength ? str : str.slice(0, maxLength) + '...'
}

const cutAddress = (address: string) => {
  return `${address.substr(0, 8)}...${address.substr(-4)}`
}

const ValidatorsDropdown = ({ onChange }: MethodsDropdownProps): React.ReactElement | null => {
  const classes = useDropdownStyles({ buttonWidth: MENU_WIDTH })
  const {
    input: { value: abi },
    meta: { valid },
  } = useField('abi', { subscription: { value: true, valid: true } })
  const {
    initialValues: { selectedMethod: selectedMethodByDefault },
  } = useFormState({ subscription: { initialValues: true } })
  const [selectedValidator, setSelectedValidator] = useState<ValidatorApiItem>()
  const [validatorsList, setValidatorsList] = useState<ValidatorApiItem[]>([])
  const [validatorsListFiltered, setValidatorsListFiltered] = useState<ValidatorApiItem[]>([])
  const [anchorEl, setAnchorEl] = useState(null)
  const [searchParams, setSearchParams] = useState('')

  useEffect(() => {
    const loadValidatorsList = async () => {
      try {
        const { data }: { data: ValidatorsApiResponse } = await axios.get(
          `${StakingApiUrl}/networks/mainnet/validators`,
        )
        const items = data.validators
          .filter((item) => item.active)
          .map((item) => {
            return {
              ...item,
              nameShort: cutString(item.name),
            }
          })
        setValidatorsList(items)
        setValidatorsListFiltered(items)
      } catch (e) {
        console.error('Cannot load validators list:', e.message)
      }
    }
    loadValidatorsList()
  }, [])

  useEffect(() => {
    setValidatorsListFiltered(
      validatorsList.filter(({ name }) => name?.toLowerCase().includes(searchParams.toLowerCase())),
    )
  }, [searchParams])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const onMethodSelectedChanged = (validator: ValidatorApiItem) => {
    setSelectedValidator(validator)
    onChange(validator.address)
    handleClose()
  }

  const placeholder = selectedValidator
    ? `${selectedValidator.nameShort} (${cutAddress(selectedValidator.address)})`
    : 'Select validator'

  return !valid || !abi || abi === NO_CONTRACT ? null : (
    <Row margin="sm">
      <Col>
        <MuiThemeProvider theme={DropdownListTheme}>
          <>
            <button
              className={classes.button}
              onClick={handleClick}
              type="button"
              style={{ height: '42px', padding: '8px 0 8px 0' }}
            >
              <span className={classNames(classes.buttonInner, anchorEl && classes.openMenuButton)}>{placeholder}</span>
            </button>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                horizontal: 'center',
                vertical: 'bottom',
              }}
              elevation={0}
              getContentAnchorEl={null}
              id="customizedMenu"
              keepMounted
              onClose={handleClose}
              open={!!anchorEl}
              PaperProps={{ style: { width: MENU_WIDTH } }}
              transformOrigin={{
                horizontal: 'center',
                vertical: 'top',
              }}
            >
              <MenuItem className={classes.listItemSearch} key="0">
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(event) => setSearchParams(event.target.value)}
                    placeholder="Search…"
                    value={searchParams}
                  />
                </div>
              </MenuItem>
              <div className={classes.dropdownItemsScrollWrapper}>
                {validatorsListFiltered.map((validator) => {
                  const { address, nameShort, apr, total_stake, identity } = validator
                  const totalStakeShort = (BigInt(+total_stake) / BigInt(Math.pow(10, 18))).toString()

                  return (
                    <MenuItem
                      className={classes.listItem}
                      key={identity}
                      onClick={() => onMethodSelectedChanged(validator)}
                      value={identity}
                    >
                      <ListItemText primary={nameShort} />
                      <ListItemIcon className={classes.iconRight}>
                        {address === selectedValidator?.address ? <img alt="checked" src={CheckIcon} /> : <span />}
                      </ListItemIcon>
                      <ListItemIcon className={classes.iconRight}>
                        <ListItemText secondary={`${totalStakeShort} ONE`} />
                      </ListItemIcon>
                      <ListItemIcon className={classes.iconRight}>
                        <ListItemText secondary={`APR: ${(apr * 100).toFixed(2)}%`} />
                      </ListItemIcon>
                    </MenuItem>
                  )
                })}
              </div>
            </Menu>
          </>
        </MuiThemeProvider>
      </Col>
    </Row>
  )
}

export default ValidatorsDropdown
