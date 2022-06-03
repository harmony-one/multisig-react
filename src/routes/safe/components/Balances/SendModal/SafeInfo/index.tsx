import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { BigNumber } from 'bignumber.js'

import AddressInfo from 'src/components/AddressInfo'
import { safeSelector } from 'src/logic/safe/store/selectors'
import styled from 'styled-components'

const StakingApiUrl = 'https://api.stake.hmny.io'

const formatNumber = (n: BigNumber) => n.dividedBy(new BigNumber(10).pow(18)).toString()

const StakingInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  margin-left: 42px;
  font-size: 90%;
`

const SafeInfo = () => {
  const { address: safeAddress = '', ethBalance, name: safeName } = useSelector(safeSelector) || {}
  const [stakingAmount, setStakingAmount] = useState(new BigNumber(0))
  const [stakingReward, setStakingReward] = useState(new BigNumber(0))
  const [stakingUndelegated, setStakingUndelegated] = useState(new BigNumber(0))

  useEffect(() => {
    const loadStakingInfo = async () => {
      try {
        const { data: stakingItems } = await axios.get(`${StakingApiUrl}/networks/mainnet/delegations/${safeAddress}`)
        let totalReward = new BigNumber(0)
        let totalAmount = new BigNumber(0)
        let totalUndelegated = new BigNumber(0)
        stakingItems.forEach((item) => {
          const { amount = 0, reward = 0, Undelegations } = item
          totalReward = totalReward.plus(new BigNumber(reward))
          totalAmount = totalAmount.plus(new BigNumber(amount))
          totalUndelegated = Undelegations.reduce((acc, nextValue) => {
            acc = acc.plus(new BigNumber(nextValue.Amount))
            return acc
          }, new BigNumber(0))
        })
        setStakingReward(totalReward)
        setStakingAmount(totalAmount)
        setStakingUndelegated(totalUndelegated)
        console.log('totalUndelegated', totalUndelegated)
      } catch (e) {
        console.error('Cannot load staking balance', e.message)
      }
    }

    loadStakingInfo()
  }, [safeAddress])

  return (
    <div>
      <AddressInfo ethBalance={ethBalance} safeAddress={safeAddress} safeName={safeName} />
      <StakingInfoWrapper>
        {<div>Staked: {formatNumber(stakingAmount)} ONE</div>}
        {<div>Reward: {formatNumber(stakingReward)} ONE</div>}
        {<div>Unstaked: {formatNumber(stakingUndelegated)} ONE</div>}
      </StakingInfoWrapper>
    </div>
  )
}

export default SafeInfo
