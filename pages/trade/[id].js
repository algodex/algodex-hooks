import Head from 'next/head'
import MainLayout from 'components/main-layout'
import Header from 'components/header'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Chart from '../../components/chart'
import { useExplorerAssetInfo } from '../../hooks/AlgoExplorer'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useUserStore from '../../store/use-user-state'
import Spinner from '../../components/spinner'

import { fetchExplorerAssetInfo } from '../../lib/algoexplorer'

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  overflow: hidden;
  max-height: calc(var(--vh, 1vh) * 100);
  height: calc(var(--vh, 1vh) * 100);

  @media (min-width: 996px) {
    overflow: scroll;
    max-height: none;
  }

  // for demo
  p.demo {
    flex: 1 1 0%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin: 0;
    color: ${({ theme }) => theme.colors.gray['600']};
    font-size: 0.9rem;
    font-weight: 500;
    text-transform: uppercase;
  }
`

export const StatusContainer = styled.div`
  flex: 1 1 0%;
  display: flex;
`
export async function getStaticPaths() {
  // const assets = await getAllAlgorandAssets()
  // console.log(assets.length)
  // const paths = assets
  //   .filter((asset) => asset.deleted)
  //   .map((asset) => ({
  //     params: { id: asset.id.toString() }
  //   }))
  // return { paths, fallback: true }
  return { paths: [{ params: { id: `21401037` } }], fallback: true }
}

export async function getStaticProps({ params: { id } }) {
  let staticExplorerAsset
  try {
    staticExplorerAsset = await fetchExplorerAssetInfo(id)
  } catch ({ response: { status } }) {
    switch (status) {
      case 404:
        return {
          notFound: true
        }
    }
  }

  return {
    props: { staticExplorerAsset }
  }
}

const TradePage = ({ staticExplorerAsset }) => {
  console.debug('Trade Page Render')
  const router = useRouter()
  const [explorerAsset, setExplorerAsset] = useState(staticExplorerAsset)

  const title = 'Algodex | Algorand Decentralized Exchange'
  const prefix = explorerAsset?.name ? `${explorerAsset.name} to ALGO` : ''

  const addAsset = useUserStore((state) => state.addAsset)

  let options = {
    enabled:
      typeof router.query.id !== 'undefined' && parseInt(router.query.id) !== explorerAsset?.id
  }
  if (
    typeof router.query.id !== 'undefined' &&
    parseInt(router.query.id) === staticExplorerAsset?.id
  ) {
    options.initialData = staticExplorerAsset
  }
  const { data, isLoading } = useExplorerAssetInfo({
    id: router.query.id || explorerAsset?.id,
    options
  })

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
  // Render
  return (
    <Container>
      <Head>
        <title>{`${prefix} ${title}`}</title>
        <meta name="description" content="Decentralized exchange for trading Algorand ASAs" />
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1" />
      </Head>
      <Header />
      <MainLayout asset={explorerAsset}>
        {(isLoading || !explorerAsset?.id) && <Spinner flex />}
        {!isLoading && explorerAsset?.id && <Chart asset={explorerAsset} />}
      </MainLayout>
    </Container>
  )
}
TradePage.propTypes = {
  staticExplorerAsset: PropTypes.object
}
export default TradePage
