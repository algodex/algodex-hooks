/* eslint-disable react/prop-types, react/jsx-key  */
import { useState, useEffect, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import SearchInput from './search'
import InfoFlyover from './info-flyover'
import AssetSearchTable from 'components/asset-search/table'
import styled from 'styled-components'
import { rgba } from 'polished'

export const Container = styled.div`
  flex: 1 1 0%;
  display: flex;
  background-color: ${({ theme }) => theme.colors.background.dark};
  position: relative;
  overflow: ${({ isActive }) => (isActive ? 'visible' : 'hidden')};
  height: 51px;

  @media (min-width: 1536px) {
    flex-direction: column;
    height: auto;
  }
`
export const AssetsContainer = styled.div`
  position: absolute;
  width: 100%;
  height: ${({ gridHeight }) => `${gridHeight}px`};
  background-color: ${({ theme }) => theme.colors.gray['800']};
  box-shadow: 3px 64px 3px 3px ${({ theme }) => rgba(theme.colors.gray['900'], 0.25)};
  z-index: 1000;

  @media (min-width: 1536px) {
    position: static;
    display: block;
    flex: 1 1 0%;
    position: relative;
    width: auto;
    height: auto;
    background-color: transparent;
    box-shadow: none;
  }
`
function AssetSearch({ gridRef }) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [gridSize, setGridSize] = useState({ width: 0, height: '100%' })

  /**
   * `isActive` determines flyout visibility on smaller screens and whether
   * asset rows are tab-navigable
   */
  const [isActive, setIsActive] = useState(false)
  const [searchHeight, setSearchHeight] = useState(0)
  const [assetInfo, setAssetInfo] = useState(null)
  const containerRef = useRef()
  const searchRef = useRef()
  /**
   * Get the client height
   */
  useEffect(() => {
    if (searchRef.current) {
      const height = Math.floor(searchRef.current.getBoundingClientRect().height)
      setSearchHeight(height)
    }
  }, [searchRef])

  /**
   * The `gridSize` prop changes on window resize, so this is equivalent to a
   * resize listener callback. On large screens, `isActive` is always true.
   * The active (focused) element is blurred so an asset row can't remain
   * focused when flyout is hidden.
   */
  useEffect(() => {
    const isFixed = window.matchMedia('(min-width: 1536px)').matches
    const isMobile = window.matchMedia('(max-width: 996px)').matches

    if (!isMobile) {
      setIsActive(isFixed)
      document.activeElement.blur()
    }
  }, [gridSize])

  /**
   *
   * @type {(function(): void)|*}
   */
  const handleSearchFocus = useCallback(() => {
    !isActive && setIsActive(true)
  }, [setIsActive, isActive])

  /**
   * Flyout is only hidden on smaller screens, triggered by external click
   * @type {(function(): void)|*}
   */
  const handleExternalClick = useCallback(() => {
    const isFixed = window.matchMedia('(min-width: 1536px)').matches
    !isFixed && setIsActive(false)
  }, [setIsActive])

  /**
   *
   * @type {(function(*): Promise<void>)|*}
   */
  const handleAssetClick = useCallback(
    (row) => {
      const asset = row.original
      setIsActive(false)
      console.log(asset)
      if (asset) {
        // setSelectedAsset(asset.id)
        // router.push(`/trade/${asset.id}`, undefined, { shallow: true })
        console.log('Cliccked')
        // if (asset.isTraded) {
        //   router.push(`/trade/${asset.id}`, undefined, { shallow: true })
        // } else {
        //   router.push(`/asset/${asset.id}`, undefined, { shallow: true })
        // }
      }
    },
    [router]
  )
  const handleAssetFocus = useCallback(
    (asset) => {
      setAssetInfo(asset)
    },
    [assetInfo, setAssetInfo]
  )
  const handleAssetLeave = useCallback(() => {
    setAssetInfo(null)
  }, [setAssetInfo])
  useEffect(() => {
    const handleResize = () => {
      if (gridRef?.current) {
        const { width, height } = gridRef.current.getBoundingClientRect()
        setGridSize({ width, height })
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => removeEventListener('resize', handleResize)
  }, [gridRef, setGridSize])
  return (
    <Container isActive={isActive}>
      <AssetsContainer ref={containerRef} gridHeight={gridSize.height}>
        <div ref={searchRef}>
          <SearchInput
            initialText={query}
            onChange={(q) => setQuery(q)}
            onSearchFocus={handleSearchFocus}
            onExternalClick={handleExternalClick}
            containerRef={containerRef}
            isActive={isActive}
          />
        </div>
        <AssetSearchTable
          query={query}
          onAssetClick={handleAssetClick}
          onAssetFocus={handleAssetFocus}
          onAssetLeave={handleAssetLeave}
        />
      </AssetsContainer>
      <InfoFlyover assetInfo={assetInfo} searchHeight={searchHeight} />
    </Container>
  )
}

AssetSearch.propTypes = {
  gridRef: PropTypes.object.isRequired
}

export default AssetSearch
