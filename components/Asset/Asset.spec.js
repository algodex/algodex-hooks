import { AssetInfo } from './Asset'
import React from 'react'
import {AssetData as asset} from '../../spec/Asset'
import { render } from 'test/test-utils'

const ASA_NAME = 'asset-info-asa-name'
const ASA_DESC = 'asset-info-desc'
const ASA_CIRC_SUPPLY = 'asset-info-circ-supply'
const ASA_TOTAL_SUPPLY = 'asset-info-total-supply'
const ASA_ID = 'asset-info-asa-id'
const ASA_PRICE = 'asset-info-price'
const ASA_PCT_CHANGE = 'asset-info-pct-change'
const ASA_URL = 'asset-url'
const BACK_BTN = 'back-btn'

describe('Asset Info', () => {
  it('should show asset name', () => {
    const { queryByTestId } = render(<AssetInfo asset={asset} />)
    expect(queryByTestId(ASA_NAME)).not.toBeNull()
    expect(queryByTestId(ASA_DESC)).not.toBeNull()
    expect(queryByTestId(ASA_CIRC_SUPPLY)).not.toBeNull()
    expect(queryByTestId(ASA_TOTAL_SUPPLY)).not.toBeNull()
    expect(queryByTestId(ASA_ID)).not.toBeNull()
    expect(queryByTestId(ASA_PRICE)).not.toBeNull()
    expect(queryByTestId(ASA_PCT_CHANGE)).not.toBeNull()

  })

  it('should show asset description', () => {
    const { getByTestId } = render(<AssetInfo asset={asset}  />)
    expect(getByTestId(ASA_DESC)).toHaveTextContent(asset.description)
  })

  it('should show N/A when asset is not set', () => {
    const _asset = asset
    delete _asset.description
    const { getByTestId } = render(<AssetInfo asset={_asset}  />)
    
    expect(getByTestId(ASA_DESC)).toHaveTextContent('N/A')
  })

  it('should show NA when no circulating supply is provided', () => {
    const _asset = asset
    delete _asset.circulating
    const { getByTestId } = render(<AssetInfo asset={_asset}  />)
    
    expect(getByTestId(ASA_CIRC_SUPPLY)).toHaveTextContent('NA')
  })

  it('should show asset URL when available', () => {
    const { queryByTestId } = render(<AssetInfo asset={asset} />)
    expect(queryByTestId(ASA_URL)).not.toBeNull()
  })

  it('should not show asset URL when unavailable', () => {
    const _asset = asset
    delete _asset.url
    const { queryByTestId } = render(<AssetInfo asset={_asset} />)
    expect(queryByTestId(ASA_URL)).toBeNull()
  })

})
