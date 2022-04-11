import * as cjs from './dist/cjs';
const interfaces = [
  'useAlgodex',
  'useAssetChartQuery',
  'useAssetOrderbookQuery',
  'useAssetOrdersQuery',
  'useAssetPriceQuery',
  'useAssetTradeHistoryQuery',
  'useSearchResultsQuery',
  'useWalletAssetsQuery',
  'useWalletMinBalanceQuery',
  'useWalletOrdersQuery',
  'useWalletTradeHistoryQuery',
];
it('should have the main effect', ()=>{
  interfaces.forEach((i)=>{
    expect(cjs[i]).toBeInstanceOf(Function);
  });
});
