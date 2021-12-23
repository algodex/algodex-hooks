import { useEffect, useMemo, useState } from 'react'

import Head from 'next/head'
import Header from 'components/header'
import Icon from '@mdi/react'
import MainLayout from 'components/main-layout'
// import NetworkNotificationModal from 'components/network-notification/NotificationModal'
import NetworkHandler from 'components/network-notification'
import PropTypes from 'prop-types'
import Spinner from 'components/spinner'
import { mdiWindowClose } from '@mdi/js'
import styled from 'styled-components'
import theme from '../theme'
import { useExplorerAssetInfo } from 'hooks/useAlgoExplorer'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import useUserStore from 'store/use-user-state'

const DEBUG = process.env.NEXT_DEBUG

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  overflow: hidden;
  max-height: 100%;
  height: 100%;

  @media (min-width: 996px) {
    overflow: scroll;
    max-height: none;
  }
`

export const Ribbon = styled.div`
  background: ;
  padding: 1rem 0;
  text-align: center;
`

export const Button = styled.button`
  width: 100%;
  background: white;
  color: black;
  padding: 9% 3%;
  border-radius: 3px;
`

/**
 * Page Component
 *
 * @param {string} title
 * @param {string} description
 * @param {Object} staticExplorerAsset
 * @param {boolean} noFollow
 * @param {JSX.Element|JSX.Element[]} children
 * @returns {JSX.Element}
 * @constructor
 */
const Page = ({
  title = 'Algodex | Decentralized Algorand Exchange',
  description = 'Decentralized exchange for trading Algorand ASAs',
  staticExplorerAsset,
  noFollow = false,
  children
}) => {
  const { query, isFallback } = useRouter()
  const [explorerAsset, setExplorerAsset] = useState(staticExplorerAsset)
  const { t } = useTranslation('network-notification')

  const id = parseInt(query.id)
  const isRouted = typeof query.id !== 'undefined'
  const isShallow = isRouted && id !== explorerAsset?.id
  const isStatic = isRouted && id === staticExplorerAsset?.id

  DEBUG &&
    console.debug(`Page Render: ${staticExplorerAsset?.id || 'Missing'}`, {
      isRouted,
      isShallow,
      isStatic,
      isFallback
    })

  // Add Asset to User Storage
  const addAsset = useUserStore((state) => state.addAsset)

  const {
    hasMainnetRibbon,
    hasTestnetRibbon,
    activeNetwork,
    hasMainnetNotificationModal,
    hasTestnetNotificationModal,
    setHasMainnetRibbon,
    setHasTestnetRibbon,
    setHasMainnetNotificationModal,
    setHasTestnetNotificationModal
  } = useUserStore((state) => state)

  let options = {
    enabled: isRouted || isShallow,
    refetchInterval: 200000
  }

  if (isStatic) {
    options.initialData = staticExplorerAsset
  }

  const { data, isLoading } = useExplorerAssetInfo({
    id: query.id || explorerAsset?.id,
    options
  })

  const modalMessages = useMemo(() => {
    if (activeNetwork == 'mainnet') {
      return {
        title: t('modal-title-mainnet'),
        subTitle: t('modal-subtitle-mainnet'),
        paragraphone: t('modal-first-paragraph-mainnet'),
        paragraphTwo: t('modal-second-paragraph-mainnet'),
        linkTextOne: t('modal-disclaimer'),
        linkTextTwo: t('modal-documentation'),
        linkAddressOne: 'https://about.algodex.com/disclaimers/',
        linkAddressTwo: 'https://about.algodex.com/docs/',
        button: t('modal-cta')
      }
    }
    if (activeNetwork == 'testnet') {
      return {
        title: t('modal-title-testnet'),
        subTitle: t('modal-subtitle-testnet'),
        paragraphone: t('modal-first-paragraph-testnet'),
        paragraphTwo: t('modal-second-paragraph-testnet'),
        linkTextOne: t('modal-faucet'),
        linkTextTwo: t('modal-documentation'),
        linkAddressOne: 'https://about.algodex.com/docs/',
        linkAddressTwo: 'https://about.algodex.com/docs/',
        button: t('modal-cta')
      }
    }
  }, [t, activeNetwork])

  useEffect(() => {
    hasMainnetNotificationModal === null && setHasMainnetNotificationModal(true)
    hasTestnetNotificationModal === null && setHasTestnetNotificationModal(true)
    hasTestnetRibbon === null && setHasTestnetRibbon(true)
    hasMainnetRibbon === null && setHasMainnetRibbon(true)
  }, [
    hasTestnetRibbon,
    hasMainnetRibbon,
    hasMainnetNotificationModal,
    hasTestnetNotificationModal,
    setHasTestnetNotificationModal,
    setHasMainnetNotificationModal,
    setHasTestnetRibbon,
    setHasMainnetRibbon
  ])

  useEffect(() => {
    if (
      typeof data !== 'undefined' &&
      typeof data.id !== 'undefined' &&
      data.id !== explorerAsset?.id
    ) {
      addAsset(data)
      setExplorerAsset(data)
    }
  }, [explorerAsset, addAsset, data])

  const closeRibbonFn = (bool) => {
    activeNetwork === 'testnet' && setHasTestnetRibbon(bool)
    activeNetwork === 'mainnet' && setHasMainnetRibbon(bool)
  }

  const closeModalFn = (bool) => {
    activeNetwork === 'testnet' && setHasTestnetNotificationModal(bool)
    activeNetwork === 'mainnet' && setHasMainnetNotificationModal(bool)
  }

  return (
    <Container>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1" />
        {noFollow && <meta name="robots" content="noindex,nofollow" />}
      </Head>
      <Header />
      <NetworkHandler />
      {/* <div>
        {((hasMainnetRibbon && activeNetwork === 'mainnet') ||
          (hasTestnetRibbon && activeNetwork === 'testnet')) && (
          <div
            style={{
              padding: '0.8rem 0',
              background: `${
                activeNetwork == 'mainnet' ? theme.colors.blue['500'] : theme.colors.green['500']
              }`
            }}
            className="flex items-center justify-between"
          >
            <p
              style={{
                width: '90%',
                color: '#FFFFFF'
              }}
              className="flex justify-center font-medium xs:ml-2 xs:mr-2 xs:text-xs xs:text-center lg:text-sm"
            >
              {activeNetwork == 'mainnet'
                ? t('ribbon-message-mainnet')
                : t('ribbon-message-testnet')}
            </p>
            <Icon
              onClick={() => closeRibbonFn(false)}
              path={mdiWindowClose}
              title="Close ribbon"
              size={1}
              className="xs:mr-2 lg:mr-8 cursor-pointer"
              color="#FFFFFF"
            />
          </div>
        )}
      </div> */}
      {/* <NetworkNotificationModal
        isModalActive={
          (activeNetwork === 'mainnet' && hasMainnetNotificationModal) ||
          (activeNetwork === 'testnet' && hasTestnetNotificationModal)
        }
        closeModal={() => closeModalFn(false)}
        content={modalMessages}
      /> */}
      <MainLayout asset={explorerAsset}>
        {(isLoading || !explorerAsset?.id) && <Spinner flex />}
        {!isLoading && explorerAsset?.id && children({ asset: explorerAsset })}
      </MainLayout>
    </Container>
  )
}
Page.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  staticExplorerAsset: PropTypes.object,
  noFollow: PropTypes.bool,
  children: PropTypes.func
}
export default Page
