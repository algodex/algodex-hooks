import React from 'react'
import { AssetsTable } from './AssetsTable'
import { render } from 'test/test-utils'

const ASSETS_ROW = 'asset-coin-cell'
const wallet = {
  address: 'TJFFNUYWHPPIYDE4DGGYPGHWKGAPJEWP3DGE5THZS3B2M2XIAPQ2WY3X4I'
}
describe('Assets', () => {
  it('should not show any rows if no data is provided', () => {
    const { queryByTestId } = render(<AssetsTable wallet={wallet} />)

    expect(queryByTestId(ASSETS_ROW)).toBeNull()
  })

  it('should show rows if data is provided', () => {
    const assets = [
      {
        unit: 'TEST',
        id: 22847687,
        name: 'TEST',
        total: '100',
        available: '10',
        'in-order': '0',
        'algo-value': '0.888'
      }
    ]
    const wallet = {
      address: 'TJFFNUYWHPPIYDE4DGGYPGHWKGAPJEWP3DGE5THZS3B2M2XIAPQ2WY3X4I'
    }
    const { queryByTestId } = render(<AssetsTable assets={assets} wallet={wallet} />)

    expect(queryByTestId(ASSETS_ROW)).not.toBeNull()
  })
})
