import { createRef, useEffect, useState } from 'react'

import PropTypes from 'prop-types'
import Search from 'components/search'
import useDebounce from 'hooks/useDebounce'
import useTranslation from 'next-translate/useTranslation'

function SearchInput(props) {
  const {
    initialText,
    onChange,
    onSearchFocus,
    onExternalClick,
    containerRef,
    isActive,
    isListingVerifiedAssets,
    setIsListingVerifiedAssets
  } = props
  const { t } = useTranslation('assets')
  const [searchText, setSearchText] = useState(initialText)
  const debouncedSearchText = useDebounce(searchText, 500)

  useEffect(() => {
    const filteredSearchText = searchText.replace(/[^a-zA-Z0-9\s]/g, '')
    onChange(filteredSearchText)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchText])

  /**
   * This ref is forwarded to the search input
   */
  const inputRef = createRef()

  /**
   * Blur search bar (if focused) when flyout is hidden
   */
  useEffect(() => {
    !isActive && inputRef?.current?.blur()
  }, [inputRef, isActive])

  /**
   * If the user clicks outside the expanded flyout, it should close, and click
   * listener can be removed
   */
  const handleClick = (e) => {
    if (!containerRef?.current?.contains(e.target)) {
      onExternalClick()
      window.removeEventListener('click', handleClick)
    }
  }

  /**
   * Focusing on the search input triggers the flyout to appear. A listener is
   * added to detect clicks outside the expanded flyout.
   */
  const handleFocus = () => {
    onSearchFocus()
    window.addEventListener('click', handleClick)
  }

  return (
    <Search
      ref={inputRef}
      value={searchText}
      isActive={isActive}
      onChange={(e) => setSearchText(e.target.value)}
      onCancel={() => setSearchText('')}
      onFocus={handleFocus}
      placeholder={`${t('search')}`}
      isListingVerifiedAssets={isListingVerifiedAssets}
      setIsListingVerifiedAssets={setIsListingVerifiedAssets}
    />
  )
}

SearchInput.propTypes = {
  initialText: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onCancel: PropTypes.func,
  onSearchFocus: PropTypes.func,
  onExternalClick: PropTypes.func,
  containerRef: PropTypes.object,
  isActive: PropTypes.bool,
  isListingVerifiedAssets: PropTypes.bool,
  setIsListingVerifiedAssets: PropTypes.func
}

export default SearchInput