import useTranslation from 'next-translate/useTranslation'
import { Info } from 'react-feather'
import Icon from 'components/Icon'
import Tooltip from 'components/Tooltip'
import styled from 'styled-components'
import Button from '../../Button'
import Big from 'big.js'
import { lighten } from 'polished'
import { Header as _Tabs, Tab as _Tab } from '../../Tabs/orders.css'
import { BodyCopyTiny, LabelMd, LabelSm } from 'components/Typography'
import { useState } from 'react'
import CurrencyInput from '../../Input/CurrencyInput'
import { default as AmountRange } from 'components/Input/SliderInput'
import useUserStore from "../../../store/use-user-state";
import OrderOptions from "./order-options";
const IconTextContainer = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray['300']};
`

const AvailableBalance = styled.div`
  margin-bottom: 1.25rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray['700']};
`
const Container = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background.dark};
  overflow: hidden scroll;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

const Header = styled.header`
  padding: 1.125rem;
`

const Form = styled.form`
  flex: 1 1 0%;
  padding: 0 1.125rem 1.125rem;
`

const ToggleWrapper = styled.div`
  display: flex;
  padding: 0 0 1.5rem;
`

const ToggleInput = styled.input`
  opacity: 0;
  position: absolute;
`

const ToggleBtn = styled(Button)`
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  margin: 0;
  line-height: 1.25;
  background-color: ${({ theme }) => theme.colors.gray['700']};

  &:hover {
    background-color: ${({ theme }) => lighten(0.05, theme.colors.gray['700'])};
  }
  label {
    cursor: pointer;
    width: 100%;
  }
  && {
    ${ToggleInput}:focus + & {
      z-index: 1;
      border-radius: 3px;
    }
  }
`

const BuyButton = styled(ToggleBtn)`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;

  && {
    ${ToggleInput}:checked + & {
      background-color: ${({ theme }) => theme.colors.green['500']};
    }

    ${ToggleInput}:checked + &:hover {
      background-color: ${({ theme }) => lighten(0.05, theme.colors.green['500'])};
    }

    ${ToggleInput}:focus + & {
      box-shadow: 0 0 0 0.2rem #4b9064;
    }
  }
`

const SellButton = styled(ToggleBtn)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;

  && {
    ${ToggleInput}:checked + & {
      background-color: ${({ theme }) => theme.colors.red['500']};
    }

    ${ToggleInput}:checked + &:hover {
      background-color: ${({ theme }) => lighten(0.05, theme.colors.red['500'])};
    }

    ${ToggleInput}:focus + & {
      box-shadow: 0 0 0 0.2rem #b23639;
    }
  }
`

const BalanceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.25rem;
`

const Tab = styled(_Tab)`
  font-size: 0.875rem;
  padding: 0.625rem 0;
  letter-spacing: 0.12rem;
  border-bottom-width: 4px;
`

const Tabs = styled(_Tabs)`
  padding: 0;
  margin-bottom: 1rem;

  ${Tab} {
    border-bottom-color: ${({ orderType, theme }) =>
      orderType === 'sell' ? theme.colors.red['500'] : theme.colors.green['500']};
  }
`

const LimitOrder = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`

const SubmitButton = styled(Button)`
  &:focus {
    box-shadow: 0 0 0 0.2rem ${({ orderType }) => (orderType === 'sell' ? '#b23639' : '#4b9064')};
  }
`

const IconButton = styled.button`
  cursor: pointer;
  pointer-events: all;
  border: none;
  background: transparent;
  margin-left: 0.125rem;
  padding: 0;
  height: 15px;

  svg {
    height: 15px;
    fill: ${({ theme }) => theme.colors.gray[500]};
    color: ${({ theme }) => theme.colors.gray[900]};
  }
`
const DEFAULT_ORDER = {
  type: 'buy',
  price: '',
  amount: '',
  total: '0',
  execution: 'both'
}

export function PlaceOrderForm({ asset, onSubmit, wallet }) {
  const { t } = useTranslation('place-order')
  const [order, setOrder] = useState(DEFAULT_ORDER)
  const newOrderSizeFilter = useUserStore((state) => state.newOrderSizeFilter)
  const setNewOrderSizeFilter = useUserStore((state) => state.setNewOrderSizeFilter)
  const buttonProps = {
    buy: { variant: 'primary', text: `${t('buy')} ${asset.name}` },
    sell: { variant: 'danger', text: `${t('sell')} ${asset.name}` }
  }
  const handleChange = (e, field) => {
    setOrder({
      [field || e.target.id]: e.target.value
    })
  }

  return (
    <Form onSubmit={onSubmit} autocomplete="off">
      <ToggleWrapper>
        <ToggleInput
          type="radio"
          id="type-buy"
          value="buy"
          checked={order.type === 'buy'}
          onChange={(e) => handleChange(e, 'type')}
        />
        <BuyButton>
          <label htmlFor="type-buy">{t('buy')}</label>
        </BuyButton>
        <ToggleInput
          type="radio"
          id="type-sell"
          value="sell"
          checked={order.type === 'sell'}
          onChange={(e) => handleChange(e, 'type')}
        />
        <SellButton>
          <label htmlFor="type-sell">{t('sell')}</label>
        </SellButton>
      </ToggleWrapper>
      <AvailableBalance>
        <IconTextContainer style={{ marginBottom: '10px' }}>
          <BodyCopyTiny color="gray.500">{t('available-balance')}</BodyCopyTiny>
          <Tooltip
            renderButton={(setTriggerRef) => (
              <IconButton ref={setTriggerRef} type="button">
                <Info />
              </IconButton>
            )}
          >
            <BalanceRow>
              <LabelMd color="gray.300" fontWeight="500" letterSpacing="0.2em">
                {t('orders:available')}:
              </LabelMd>
              <IconTextContainer>
                <LabelMd color="gray.300" fontWeight="500" letterSpacing="0.2em">
                  {wallet.balance}
                </LabelMd>
                <Icon use="algoLogo" size={0.625} />
              </IconTextContainer>
            </BalanceRow>
            <BalanceRow>
              <LabelMd color="gray.300" fontWeight="500" letterSpacing="0.2em">
                {t('total')}:
              </LabelMd>
              <IconTextContainer>
                <LabelMd color="gray.300" fontWeight="500" letterSpacing="0.2em">
                  {wallet.balance}
                </LabelMd>
                <Icon use="algoLogo" size={0.625} />
              </IconTextContainer>
            </BalanceRow>
            <BalanceRow>
              <LabelSm
                color="gray.300"
                fontWeight="400"
                textTransform="initial"
                lineHeight="0.9rem"
                letterSpacing="0.1em"
              >
                &nbsp;*
                {t('max-spend-explanation', {
                  // amount: new Big(wallet.balance).minus(new Big(wallet.balance)).round(6).toString()
                })}
              </LabelSm>
            </BalanceRow>
          </Tooltip>
        </IconTextContainer>
        <BalanceRow>
          <LabelMd color="gray.400" fontWeight="500">
            ALGO
          </LabelMd>
          <LabelMd color="gray.300" fontWeight="500">
            {wallet.balance}
          </LabelMd>
        </BalanceRow>
        <BalanceRow>
          <LabelMd color="gray.400" fontWeight="500">
            {asset.name}
          </LabelMd>
          <LabelMd color="gray.300" fontWeight="500">
            {wallet.balance}
          </LabelMd>
        </BalanceRow>
      </AvailableBalance>

      <Tabs orderType={order.type}>
        <Tab isActive>{t('limit')}</Tab>
      </Tabs>

      <LimitOrder>
        <CurrencyInput
          type="number"
          pattern="\d*"
          id="price"
          name="af2Km9q"
          label={t('price')}
          asset="ALGO"
          decimals={6}
          orderType={order.type}
          value={order.price}
          onChange={handleChange}
          autocomplete="false"
          min="0"
          step="0.000001"
          inputMode="decimal"
        />
        <CurrencyInput
          type="number"
          pattern="\d*"
          id="amount"
          name="af2Km9q"
          label={t('amount')}
          asset={asset.name}
          decimals={asset.decimals}
          value={order.amount}
          onChange={handleChange}
          autocomplete="false"
          min="0"
          // step={new Big(10).pow(-1 * asset.decimals).toString()}
          inputMode="decimal"
        />
        <AmountRange
          // txnFee={txnFee}
          value={order.amount}
        />
        <CurrencyInput
          type="number"
          id="total"
          label={t('total')}
          asset="ALGO"
          decimals={6}
          orderType={order.type}
          value={order.total}
          readOnly
          disabled
        />
        {/* <TxnFeeContainer>
                <BodyCopyTiny color="gray.500" textTransform="none">
                  Algorand transaction fees: <Icon use="algoLogo" color="gray.500" size={0.5} />{' '}
                  {txnFee.toFixed(3)}
                </BodyCopyTiny>
              </TxnFeeContainer> */}
        {/*<OrderOptions*/}
        {/*  order={order}*/}
        {/*  // onChange={handleOptionsChange}*/}
        {/*  allowTaker={typeof asset !== 'undefined'}*/}
        {/*  orderFilter={newOrderSizeFilter}*/}
        {/*  setOrderFilter={setNewOrderSizeFilter}*/}
        {/*/>*/}
      </LimitOrder>
      <SubmitButton
        type="submit"
        variant={buttonProps[order.type].variant}
        size="large"
        block
        orderType={order.type}
        disabled={order.valid}
      >
        {buttonProps[order.type].text}
      </SubmitButton>
    </Form>
  )
}
