import React from 'react'
import styled from 'styled-components'
import {
  Card,
  Button,
  Title,
  Text,
  Divider,
  ButtonLink,
  Dot,
  Icon,
  Link as LinkSRC,
} from '@gnosis.pm/safe-react-components'
import StakingBanner from 'src/assets/icons/staking_banner.png'

import Link from 'src/components/layout/Link'
import Block from 'src/components/layout/Block'
import { LOAD_ADDRESS, OPEN_ADDRESS } from 'src/routes/routes'
import { onConnectButtonClick } from 'src/components/ConnectButton'
import { useSelector } from 'react-redux'
import { providerNameSelector } from 'src/logic/wallets/store/selectors'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 24px 0 0 0;
`
const StyledCardDouble = styled(Card)`
  display: flex;
  padding: 0;
`
const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 20px 0 0;
  max-width: 27%;
  height: 276px;
`
const CardsCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  width: 50%;
`
const StyledButton = styled(Button)`
  margin-top: auto;
  text-decoration: none;
`
const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0 0 16px 0;

  h5 {
    color: white;
  }
`
const StyledTitle = styled(Title)`
  margin: 0 0 0 16px;
`
const StyledTitleOnly = styled(Title)`
  margin: 0 0 16px 0;
`
const StyledButtonLink = styled(ButtonLink)`
  margin: 16px 0 16px -8px;
`

const WarningBanner = styled(Wrapper)`
  width: 750px;
  flex-direction: column;
  border: 2px solid red;
  border-radius: 8px;
  padding: 8px;
  background-color: white;

  > p {
    margin-bottom: 8px;
  }
`

type Props = {
  isOldMultisigMigration?: boolean
}

export const WelcomeLayout = ({ isOldMultisigMigration }: Props): React.ReactElement => {
  const provider = useSelector(providerNameSelector)
  return (
    <Block>
      {/* Title */}
      <Title size="md" strong>
        Welcome to Harmony Multisig Wallet.
      </Title>

      <WarningBanner>
        <Text size={'xl'}>
          <b>Dear users!</b>
        </Text>
        <Text size={'xl'}>
          <>Harmony Multisig Wallet is currently under maintenance due to a migration to the latest version.</>
        </Text>
        <Text size={'xl'}>
          <>
            All your wallets and funds are SAFE. In urgent case you can interact with your safes using our Staging
            environment, which is already upgraded to the latest version -{' '}
            <Link to={'https://staging-safe.harmony.one'}>https://staging-safe.harmony.one</Link>.
          </>
        </Text>
        <Text size={'xl'}>
          <>
            Please keep in mind that all transactions that were created via Staging environment and are not executed -
            will not appear on Production environment after upgrade, but will still be available on Staging environment,
            and after execution will also appear on Production environment.
          </>
        </Text>
      </WarningBanner>

      {/* Subtitle */}
      <Title size="xs">
        {isOldMultisigMigration ? (
          <>
            We will replicate the owner structure from your existing Harmony MultiSig to let you test the new interface.
            As soon as you feel comfortable, start moving funds to your new Safe.
          </>
        ) : (
          <>
            Harmony Multisig is the most trusted platform to manage digital assets. <br /> Here is how to get started:{' '}
          </>
        )}
      </Title>

      <>
        <Wrapper>
          {/* Connect wallet */}
          <StyledCard>
            <TitleWrapper>
              <Dot color="primary">
                {!provider ? <Title size="xs">1</Title> : <Icon color="white" type="check" size="md" />}
              </Dot>
              <StyledTitle size="sm" strong withoutMargin>
                Connect wallet
              </StyledTitle>
            </TitleWrapper>
            <Text size="xl">
              Harmony Multisig supports a wide range of wallets that you can choose to be one of the authentication
              factors.
            </Text>
            <StyledButton
              size="lg"
              color="primary"
              variant="contained"
              onClick={onConnectButtonClick}
              disabled={!!provider}
              data-testid="connect-btn"
            >
              <Text size="xl" color="white">
                Connect wallet
              </Text>
            </StyledButton>
          </StyledCard>

          <StyledCardDouble disabled={!provider}>
            {/* Create safe */}
            <CardsCol>
              <TitleWrapper>
                <Dot color="primary">
                  <Title size="xs">2</Title>
                </Dot>
                <StyledTitle size="sm" strong withoutMargin>
                  Create Safe
                </StyledTitle>
              </TitleWrapper>
              <Text size="xl">
                Create a new Safe Multisig that is controlled by one or multiple owners. <br />
                You will be required to pay a network fee for creating your new Safe.
              </Text>
              <StyledButton size="lg" color="primary" variant="contained" component={Link} to={OPEN_ADDRESS}>
                <Text size="xl" color="white">
                  + Create new Safe
                </Text>
              </StyledButton>
            </CardsCol>

            <Divider orientation="vertical" />

            {/* Load safe */}
            <CardsCol>
              <StyledTitleOnly size="sm" strong withoutMargin>
                Load existing Safe
              </StyledTitleOnly>
              <Text size="xl">
                Already have a Safe? Do you want to access your Safe Multisig from a different device? Easily load your
                Safe Multisig using your Safe address.
              </Text>
              <StyledButton
                variant="bordered"
                iconType="safe"
                iconSize="sm"
                size="lg"
                color="secondary"
                component={Link}
                to={LOAD_ADDRESS}
              >
                <Text size="xl" color="secondary">
                  Load existing Safe
                </Text>
              </StyledButton>
            </CardsCol>
          </StyledCardDouble>
        </Wrapper>
      </>
    </Block>
  )
}
