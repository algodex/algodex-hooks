import { Container, Header, Tab } from './orders.css'

import Assets from 'components/assets'
import OpenOrders from 'components/open-orders'
import OrderHistory from 'components/order-history'
import PropTypes from 'prop-types'
import { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'

function Orders({ initialPanel }) {
  const { t } = useTranslation('orders')
  const [selectedPanel, setSelectedPanel] = useState(initialPanel)

  const OPEN_ORDERS_PANEL = 'open-orders'
  const ORDER_HISTORY_PANEL = 'order-history'
  const ASSETS_PANEL = 'assets'

  const renderPanel = (panelName) => {
    switch (panelName) {
      case OPEN_ORDERS_PANEL:
        return <OpenOrders />
      case ORDER_HISTORY_PANEL:
        return <OrderHistory />
      case ASSETS_PANEL:
        return <Assets />
      default:
        return null
    }
  }

  return (
    <Container>
      <Header>
        <Tab
          isActive={selectedPanel === OPEN_ORDERS_PANEL}
          onClick={() => setSelectedPanel(OPEN_ORDERS_PANEL)}
        >
          {t('open-orders')}
        </Tab>
        <Tab
          isActive={selectedPanel === ORDER_HISTORY_PANEL}
          onClick={() => setSelectedPanel(ORDER_HISTORY_PANEL)}
        >
          {t('order-history')}
        </Tab>
        <Tab
          isActive={selectedPanel === ASSETS_PANEL}
          onClick={() => setSelectedPanel(ASSETS_PANEL)}
        >
          {t('assets')}
        </Tab>
      </Header>
      {renderPanel(selectedPanel)}
    </Container>
  )
}

export default Orders

Orders.propTypes = {
  initialPanel: PropTypes.string,
  openOrderData: PropTypes.array.isRequired,
  orderHistoryData: PropTypes.array.isRequired,
  assetsData: PropTypes.array.isRequired
}

Orders.defaultProps = {
  initialPanel: 'open-orders',
  openOrderData: [],
  orderHistoryData: [],
  assetsData: []
}
