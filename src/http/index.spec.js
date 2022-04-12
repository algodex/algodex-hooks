import * as http from './index';
describe('http exports', ()=>{
  it('should export a public interface', ()=>{
    [
      'useExplorerAssetInfo',
      'useAlgorandPriceQuery',
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
    ].forEach((fn)=>{
      expect(http[fn]).not.toBeUndefined();
    });
  });
});
