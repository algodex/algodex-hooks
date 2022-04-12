import nock from 'nock';
import wallet from '../spec/Wallet.json';
import asset from '../spec/Asset.json';

const routes = {
  walletTradeHistory: {
    path: `/trade_history.php?ownerAddr=${wallet.address}&getAssetInfo=true`,
    reply: require('../spec/fetchWalletTradeHistory.json'),
  },
  walletOrders: {
    path: `/orders.php?ownerAddr=${wallet.address}&getAssetInfo=true`,
    reply: require('../spec/fetchWalletOrders.json'),
  },
  assetOrders: {
    path: `/orders.php?assetId=${asset.id}`,
    reply: require('../spec/fetchAssetOrders.json'),
  },
  assetChart: {
    path: `/charts2.php?assetId=${asset.id}&chartTime=15m`,
    reply: require('../spec/fetchAssetChart.json'),
  },
};

if (process.env.TEST_ENV !== 'integration') {
  Object.keys(routes).forEach((key)=>{
    const r = routes[key];
    nock('https://testnet.algodex.com/algodex-backend')
        .get(r.path)
        .reply(200, r.reply);
  });
}
