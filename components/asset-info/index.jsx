import PropTypes from 'prop-types'
import Image from 'next/image'
import { HeaderLg, BodyCopy, BodyCopyTiny } from 'components/type'
import SvgImage from 'components/svg-image'
import Link from 'next/link'

import theme from 'theme'

import { ArrowLeft } from 'react-feather'

import {
  Container,
  InfoContainer,
  HeaderContainer,
  AssetUrl,
  InfoList,
  InfoItem,
  AlgoExplorerLink,
  ExternalLinkIcon,
  ButtonText
} from './asset-info.css'
import useTranslation from 'next-translate/useTranslation'
import { useAssetPriceQuery } from 'hooks/useAlgodex'
import { Fragment } from 'react'

const AssetInfo = ({ explorerAsset }) => {
  const { t } = useTranslation('assets')

  const description =
    explorerAsset.description || explorerAsset?.verified_info?.description || 'N/A'

  const { data: dexAsset } = useAssetPriceQuery({ asset: explorerAsset })
  const renderName = () => {
    if (explorerAsset.verified) {
      return (
        <>
          {`${explorerAsset.fullName} `}
          <span>
            {`(${explorerAsset.name}) `}
            <SvgImage use="verified" w={2} h={2} />
          </span>
        </>
      )
    }
    return <>{`${explorerAsset.fullName} (${explorerAsset.name})`}</>
  }

  const renderLink = () => {
    const expression =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,7}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
    const regex = new RegExp(expression)

    if (explorerAsset.url && regex.test(explorerAsset.url)) {
      return (
        <AssetUrl>
          <a href={explorerAsset.url} target="_blank" rel="noreferrer">
            <BodyCopy as="span">{explorerAsset.url}</BodyCopy>
          </a>
        </AssetUrl>
      )
    }
    return null
  }

  return (
    <Container>
      <InfoContainer>
        {dexAsset?.isTraded ? (
          <Link shallow={true} href={`/trade/${explorerAsset.id}`}>
            <ButtonText type="button">
              <ArrowLeft />
              <div>{t('back-to-chart')}</div>
            </ButtonText>
          </Link>
        ) : null}
        <HeaderContainer>
          <HeaderLg color="gray.100" mb={2}>
            {renderName()}
          </HeaderLg>
          {renderLink()}
        </HeaderContainer>
        <InfoList>
          <InfoItem>
            <BodyCopyTiny as="dt" color="gray.500">
              {t('description')}
            </BodyCopyTiny>
            <BodyCopy as="dd" fontFamily={theme.fontFamilies.heading} fontWeight="400">
              {description}
            </BodyCopy>
          </InfoItem>
          <InfoItem halfWidth>
            <BodyCopyTiny as="dt" color="gray.500">
              {t('circulating-supply')}
            </BodyCopyTiny>
            <BodyCopy as="dd" fontFamily={theme.fontFamilies.monospace} fontSize="1.25rem">
              {explorerAsset.circulating || 'TODO'}
            </BodyCopy>
          </InfoItem>
          <InfoItem halfWidth>
            <BodyCopyTiny as="dt" color="gray.500">
              {t('total-supply')}
            </BodyCopyTiny>
            <BodyCopy as="dd" fontFamily={theme.fontFamilies.monospace} fontSize="1.25rem">
              {explorerAsset.total}
            </BodyCopy>
          </InfoItem>
          <InfoItem>
            <BodyCopyTiny as="dt" color="gray.500">
              ASA ID
            </BodyCopyTiny>
            <BodyCopy as="dd" fontFamily={theme.fontFamilies.monospace} fontSize="1.25rem">
              {explorerAsset.id}
            </BodyCopy>
          </InfoItem>
          {/*<InfoItem>*/}
          {/*  <BodyCopyTiny as="dt" color="gray.500">*/}
          {/*    {t('total-transactions')}*/}
          {/*  </BodyCopyTiny>*/}
          {/*  <BodyCopy as="dd" fontFamily={theme.fontFamilies.monospace} fontSize="1.25rem">*/}
          {/*    {explorerAsset.txns}*/}
          {/*  </BodyCopy>*/}
          {/*</InfoItem>*/}
          {/* TODO: Verified Info */}
          {dexAsset?.isTraded ? (
            <Fragment>
              <InfoItem>
                <BodyCopyTiny as="dt" color="gray.500">
                  Price
                </BodyCopyTiny>
                <BodyCopy as="dd" fontFamily={theme.fontFamilies.monospace} fontSize="1.25rem">
                  {dexAsset.price} ALGO
                </BodyCopy>
              </InfoItem>
              <InfoItem>
                <BodyCopyTiny as="dt" color="gray.500">
                  Change
                </BodyCopyTiny>
                <BodyCopy as="dd" fontFamily={theme.fontFamilies.monospace} fontSize="1.25rem">
                  {dexAsset.price24Change}%
                </BodyCopy>
              </InfoItem>
            </Fragment>
          ) : null}
        </InfoList>
        <AlgoExplorerLink>
          {/*TODO: Accredit Explorer for Information Provided*/}
          <a href={explorerAsset.explorerUrl} target="_blank" rel="noreferrer">
            <Image
              src="/algo-explorer.png"
              alt="View asset on Algo Explorer"
              width="100"
              height="15"
            />
            <ExternalLinkIcon />
          </a>
        </AlgoExplorerLink>
      </InfoContainer>
    </Container>
  )
}
AssetInfo.propTypes = {
  explorerAsset: PropTypes.object.isRequired
}
export default AssetInfo
