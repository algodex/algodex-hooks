import nock from 'nock';
import {renderHook} from '@testing-library/react-hooks';
import useWalletTradeHistoryQuery from './useWalletTradeHistoryQuery.js';
import {wrapper} from '../../test/setup.js';

describe('Fetch Wallet Trade History', () => {
  it('should fetch trade history for the wallet', async () => {
    const wallet = {
      address: 'ZXPEYJMWFLULILWJHWB3Y6DFI4ADE7XVMGARAH734ZJ5ECXAR4YVMRZ4EM',
      includeAssetInfo: true,
    };
    const uri = `/trade_history.php?ownerAddr=${wallet.address}`+
      `&getAssetInfo=${wallet.includeAssetInfo}`;
    if (process.env.TEST_ENV !== 'integration') {
      nock('https://testnet.algodex.com/algodex-backend')
          .get(uri)
          .reply(200, {
            'allAssets': [
              {
                'created-at-round': 15364287,
                'deleted': false,
                'index': 19267953,
                'params': {
                  // eslint-disable-next-line max-len
                  'clawback': 'VMLNAI2UXWLF46GME6XW5LKEB4FGFR5E63PBS475LVDEUKPQ5ZGJIVHRUY',
                  // eslint-disable-next-line max-len
                  'creator': 'VMLNAI2UXWLF46GME6XW5LKEB4FGFR5E63PBS475LVDEUKPQ5ZGJIVHRUY',
                  'decimals': 0,
                  'default-frozen': false,
                  // eslint-disable-next-line max-len
                  'freeze': 'VMLNAI2UXWLF46GME6XW5LKEB4FGFR5E63PBS475LVDEUKPQ5ZGJIVHRUY',
                  // eslint-disable-next-line max-len
                  'manager': 'VMLNAI2UXWLF46GME6XW5LKEB4FGFR5E63PBS475LVDEUKPQ5ZGJIVHRUY',
                  'name': 'Kaafilatest',
                  'name-b64': 'S2FhZmlsYXRlc3Q=',
                  // eslint-disable-next-line max-len
                  'reserve': 'VMLNAI2UXWLF46GME6XW5LKEB4FGFR5E63PBS475LVDEUKPQ5ZGJIVHRUY',
                  'total': 100000000000,
                  'unit-name': 'KFLT',
                  'unit-name-b64': 'S0ZMVA==',
                  'url': 'kaafila.org',
                  'url-b64': 'a2FhZmlsYS5vcmc=',
                },
              },
              {
                'created-at-round': 18262919,
                'deleted': false,
                'index': 48806985,
                'params': {
                  // eslint-disable-next-line max-len
                  'clawback': 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ',
                  // eslint-disable-next-line max-len
                  'creator': 'P65LXHA5MEDMOJ2ZAITLZWYSU6W25BF2FCXJ5KQRDUB2NT2T7DPAAFYT3U',
                  'decimals': 6,
                  'default-frozen': false,
                  // eslint-disable-next-line max-len
                  'freeze': 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ',
                  // eslint-disable-next-line max-len
                  'manager': 'P65LXHA5MEDMOJ2ZAITLZWYSU6W25BF2FCXJ5KQRDUB2NT2T7DPAAFYT3U',
                  'name': 'Vote Coin',
                  'name-b64': 'Vm90ZSBDb2lu',
                  // eslint-disable-next-line max-len
                  'reserve': 'P65LXHA5MEDMOJ2ZAITLZWYSU6W25BF2FCXJ5KQRDUB2NT2T7DPAAFYT3U',
                  'total': 1000000000000000,
                  'unit-name': 'Vote',
                  'unit-name-b64': 'Vm90ZQ==',
                  'url': 'https://www.vote-coin.com/',
                  'url-b64': 'aHR0cHM6Ly93d3cudm90ZS1jb2luLmNvbS8=',
                },
              },
            ],
            'transactions': [
              {
                'PK_trade_history_id': 1337500,
                'transaction_id': null,
                'group_id': 'EVT1+KFI6XJZwqH1jbKWUdml+Ww5SzlfK+WHmDCyuuI=',
                'unix_time': 1646735946,
                'block_round': 20212936,
                'application_id': 22045503,
                'asset_id': 62281549,
                'asaPrice': '2.000000000000',
                'algoAmount': 997000,
                'asaAmount': 498500,
                // eslint-disable-next-line max-len
                'asaBuyerAddress': 'ZXPEYJMWFLULILWJHWB3Y6DFI4ADE7XVMGARAH734ZJ5ECXAR4YVMRZ4EM',
                // eslint-disable-next-line max-len
                'asaSellerAddress': 'FSJQWKJMF5TL7JWDM3QR4AG47JXWXCTZ22L3FYYATK3UAYVBIFQDCGY22U',
                'tradeType': 'buyASA',
                'formattedPrice': '2.000000',
                'formattedASAAmount': '0.498500',
              },
              {
                'PK_trade_history_id': 1305270,
                'transaction_id': null,
                'group_id': 'pPAmd9XPqJEU2XmF3t1pcFB4k/D0N+q8bn+gAv796ZI=',
                'unix_time': 1644862956,
                'block_round': 19770335,
                'application_id': 22045503,
                'asset_id': 70980802,
                'asaPrice': '9997000.000000000000',
                'algoAmount': 9997000,
                'asaAmount': 1,
                // eslint-disable-next-line max-len
                'asaBuyerAddress': 'ZXPEYJMWFLULILWJHWB3Y6DFI4ADE7XVMGARAH734ZJ5ECXAR4YVMRZ4EM',
                // eslint-disable-next-line max-len
                'asaSellerAddress': 'ZXPEYJMWFLULILWJHWB3Y6DFI4ADE7XVMGARAH734ZJ5ECXAR4YVMRZ4EM',
                'tradeType': 'buyASA',
                'formattedPrice': '9.997000',
                'formattedASAAmount': '1',
              },
              {
                'PK_trade_history_id': 1305264,
                'transaction_id': null,
                'group_id': 'CjwKdWs8mnttAMCXuscxrgR9xl9wEi6/KVAYa6Zs8Uo=',
                'unix_time': 1644862563,
                'block_round': 19770242,
                'application_id': 22045503,
                'asset_id': 70980802,
                'asaPrice': '4993000.000000000000',
                'algoAmount': 4993000,
                'asaAmount': 1,
                // eslint-disable-next-line max-len
                'asaBuyerAddress': 'ZXPEYJMWFLULILWJHWB3Y6DFI4ADE7XVMGARAH734ZJ5ECXAR4YVMRZ4EM',
                // eslint-disable-next-line max-len
                'asaSellerAddress': 'ZXPEYJMWFLULILWJHWB3Y6DFI4ADE7XVMGARAH734ZJ5ECXAR4YVMRZ4EM',
                'tradeType': 'buyASA',
                'formattedPrice': '4.993000',
                'formattedASAAmount': '1',
              },
              {
                'PK_trade_history_id': 1305262,
                'transaction_id': null,
                'group_id': 'AcKXWLaHCqNVhJnxtWFrxYEkSuhFKKqBKDLSd8jr28g=',
                'unix_time': 1644862432,
                'block_round': 19770211,
                'application_id': 22045503,
                'asset_id': 70980802,
                'asaPrice': '22000000.000000000000',
                'algoAmount': 22000000,
                'asaAmount': 1,
                // eslint-disable-next-line max-len
                'asaBuyerAddress': 'ZXPEYJMWFLULILWJHWB3Y6DFI4ADE7XVMGARAH734ZJ5ECXAR4YVMRZ4EM',
                // eslint-disable-next-line max-len
                'asaSellerAddress': 'ZXPEYJMWFLULILWJHWB3Y6DFI4ADE7XVMGARAH734ZJ5ECXAR4YVMRZ4EM',
                'tradeType': 'buyASA',
                'formattedPrice': '22.000000',
                'formattedASAAmount': '1',
              },
              {
                'PK_trade_history_id': 1305260,
                'transaction_id': null,
                'group_id': '0SpVJBswWTAmB7G7+hsBGiS6JpvGoNO9z3Dk/GsSOdo=',
                'unix_time': 1644862157,
                'block_round': 19770146,
                'application_id': 22045522,
                'asset_id': 70980802,
                'asaPrice': '22000000.000000000000',
                'algoAmount': 22000000,
                'asaAmount': 1,
                // eslint-disable-next-line max-len
                'asaBuyerAddress': 'ZXPEYJMWFLULILWJHWB3Y6DFI4ADE7XVMGARAH734ZJ5ECXAR4YVMRZ4EM',
                // eslint-disable-next-line max-len
                'asaSellerAddress': 'ZXPEYJMWFLULILWJHWB3Y6DFI4ADE7XVMGARAH734ZJ5ECXAR4YVMRZ4EM',
                'tradeType': 'buyASA',
                'formattedPrice': '22.000000',
                'formattedASAAmount': '1',
              },
              {
                'PK_trade_history_id': 1305246,
                'transaction_id': null,
                'group_id': '3YKV49S1HPVFWfimcuBwZldVrvzn2NDqv+0s7P8jxYw=',
                'unix_time': 1644861402,
                'block_round': 19769968,
                'application_id': 22045503,
                'asset_id': 21582668,
                'asaPrice': '0.003700000000',
                'algoAmount': 740000,
                'asaAmount': 200000000,
                // eslint-disable-next-line max-len
                'asaBuyerAddress': 'WCEL7TH54RQZ254U6CBXSDCH7NR6OPYQYPWW2SHBGSXJU2GKYW4W7JFOAQ',
                // eslint-disable-next-line max-len
                'asaSellerAddress': 'ZXPEYJMWFLULILWJHWB3Y6DFI4ADE7XVMGARAH734ZJ5ECXAR4YVMRZ4EM',
                'tradeType': 'sellASA',
                'formattedPrice': '0.003700',
                'formattedASAAmount': '200.000000',
              },
              {
                'PK_trade_history_id': 1305245,
                'transaction_id': null,
                'group_id': 'tkhf9WvcjEB2b6LXpyhnxHnEaADqwXcpxwunm+dRX3Y=',
                'unix_time': 1644861369,
                'block_round': 19769960,
                'application_id': 22045503,
                'asset_id': 21582668,
                'asaPrice': '0.003700000000',
                'algoAmount': 740000,
                'asaAmount': 200000000,
                // eslint-disable-next-line max-len
                'asaBuyerAddress': 'WCEL7TH54RQZ254U6CBXSDCH7NR6OPYQYPWW2SHBGSXJU2GKYW4W7JFOAQ',
                // eslint-disable-next-line max-len
                'asaSellerAddress': 'ZXPEYJMWFLULILWJHWB3Y6DFI4ADE7XVMGARAH734ZJ5ECXAR4YVMRZ4EM',
                'tradeType': 'sellASA',
                'formattedPrice': '0.003700',
                'formattedASAAmount': '200.000000',
              },
              {
                'PK_trade_history_id': 1305244,
                'transaction_id': null,
                'group_id': 'EUJlkyI5pHJs+IdoHBZZ1p79nMltEIHZ199o/nRSh1k=',
                'unix_time': 1644861322,
                'block_round': 19769949,
                'application_id': 22045522,
                'asset_id': 21582668,
                'asaPrice': '0.004400000000',
                'algoAmount': 880000,
                'asaAmount': 200000000,
                // eslint-disable-next-line max-len
                'asaBuyerAddress': 'ZXPEYJMWFLULILWJHWB3Y6DFI4ADE7XVMGARAH734ZJ5ECXAR4YVMRZ4EM',
                // eslint-disable-next-line max-len
                'asaSellerAddress': 'WCEL7TH54RQZ254U6CBXSDCH7NR6OPYQYPWW2SHBGSXJU2GKYW4W7JFOAQ',
                'tradeType': 'buyASA',
                'formattedPrice': '0.004400',
                'formattedASAAmount': '200.000000',
              },
              {
                'PK_trade_history_id': 1305243,
                'transaction_id': null,
                'group_id': 'J2ZMrogM+sTmd2PHkhoQCb/+hsDvj+VM0Xp4HvE2ujI=',
                'unix_time': 1644861259,
                'block_round': 19769934,
                'application_id': 22045522,
                'asset_id': 21582668,
                'asaPrice': '0.004400000000',
                'algoAmount': 880000,
                'asaAmount': 200000000,
                // eslint-disable-next-line max-len
                'asaBuyerAddress': 'ZXPEYJMWFLULILWJHWB3Y6DFI4ADE7XVMGARAH734ZJ5ECXAR4YVMRZ4EM',
                // eslint-disable-next-line max-len
                'asaSellerAddress': 'WCEL7TH54RQZ254U6CBXSDCH7NR6OPYQYPWW2SHBGSXJU2GKYW4W7JFOAQ',
                'tradeType': 'buyASA',
                'formattedPrice': '0.004400',
                'formattedASAAmount': '200.000000',
              },
              {
                'PK_trade_history_id': 1305237,
                'transaction_id': null,
                'group_id': 'sWAmsdVbhDErK3G4SFnVc+bnVmMilqEgcNpYXxDFj18=',
                'unix_time': 1644860942,
                'block_round': 19769859,
                'application_id': 22045503,
                'asset_id': 21582668,
                'asaPrice': '0.003700000000',
                'algoAmount': 370000,
                'asaAmount': 100000000,
                // eslint-disable-next-line max-len
                'asaBuyerAddress': 'WCEL7TH54RQZ254U6CBXSDCH7NR6OPYQYPWW2SHBGSXJU2GKYW4W7JFOAQ',
                // eslint-disable-next-line max-len
                'asaSellerAddress': 'ZXPEYJMWFLULILWJHWB3Y6DFI4ADE7XVMGARAH734ZJ5ECXAR4YVMRZ4EM',
                'tradeType': 'sellASA',
                'formattedPrice': '0.003700',
                'formattedASAAmount': '100.000000',
              },
              {
                'PK_trade_history_id': 1305236,
                'transaction_id': null,
                'group_id': 'zPT5PgnCEnbhJsH1YWpUtg42mXDoeaWp8DcMoSeu1pA=',
                'unix_time': 1644860904,
                'block_round': 19769850,
                'application_id': 22045503,
                'asset_id': 21582668,
                'asaPrice': '0.003700000000',
                'algoAmount': 37000,
                'asaAmount': 10000000,
                // eslint-disable-next-line max-len
                'asaBuyerAddress': 'WCEL7TH54RQZ254U6CBXSDCH7NR6OPYQYPWW2SHBGSXJU2GKYW4W7JFOAQ',
                // eslint-disable-next-line max-len
                'asaSellerAddress': 'ZXPEYJMWFLULILWJHWB3Y6DFI4ADE7XVMGARAH734ZJ5ECXAR4YVMRZ4EM',
                'tradeType': 'sellASA',
                'formattedPrice': '0.003700',
                'formattedASAAmount': '10.000000',
              },
              {
                'PK_trade_history_id': 1305222,
                'transaction_id': null,
                'group_id': 'f+GlyZcQzbc25HSlNhHmHAqzWyqmZYreWpj/CKJwNTI=',
                'unix_time': 1644860052,
                'block_round': 19769648,
                'application_id': 22045503,
                'asset_id': 70980802,
                'asaPrice': '19997000.000000000000',
                'algoAmount': 19997000,
                'asaAmount': 1,
                // eslint-disable-next-line max-len
                'asaBuyerAddress': 'ZXPEYJMWFLULILWJHWB3Y6DFI4ADE7XVMGARAH734ZJ5ECXAR4YVMRZ4EM',
                // eslint-disable-next-line max-len
                'asaSellerAddress': 'ZXPEYJMWFLULILWJHWB3Y6DFI4ADE7XVMGARAH734ZJ5ECXAR4YVMRZ4EM',
                'tradeType': 'buyASA',
                'formattedPrice': '19.997000',
                'formattedASAAmount': '1',
              },
              {
                'PK_trade_history_id': 1305211,
                'transaction_id': null,
                'group_id': 'q59GUxkn3/J42KiKvwojDHkEj4NYIRyvGva0f331hG8=',
                'unix_time': 1644859947,
                'block_round': 19769623,
                'application_id': 22045522,
                'asset_id': 70980802,
                'asaPrice': '22000000.000000000000',
                'algoAmount': 22000000,
                'asaAmount': 1,
                // eslint-disable-next-line max-len
                'asaBuyerAddress': 'ZXPEYJMWFLULILWJHWB3Y6DFI4ADE7XVMGARAH734ZJ5ECXAR4YVMRZ4EM',
                // eslint-disable-next-line max-len
                'asaSellerAddress': 'ZXPEYJMWFLULILWJHWB3Y6DFI4ADE7XVMGARAH734ZJ5ECXAR4YVMRZ4EM',
                'tradeType': 'buyASA',
                'formattedPrice': '22.000000',
                'formattedASAAmount': '1',
              },
              {
                'PK_trade_history_id': 1305191,
                'transaction_id': null,
                'group_id': '96K7kwxDf7J4A0IW5L99JEInPhhVAGWVFTgGUERxfMQ=',
                'unix_time': 1644859196,
                'block_round': 19769445,
                'application_id': 22045522,
                'asset_id': 70980802,
                'asaPrice': '22000000.000000000000',
                'algoAmount': 22000000,
                'asaAmount': 1,
                // eslint-disable-next-line max-len
                'asaBuyerAddress': 'ZXPEYJMWFLULILWJHWB3Y6DFI4ADE7XVMGARAH734ZJ5ECXAR4YVMRZ4EM',
                // eslint-disable-next-line max-len
                'asaSellerAddress': 'XHGANA4SOVZKH4GGSSLAMOZDVWWVIXT5DZBIEGI3GX2EESVFNFGFTHJATA',
                'tradeType': 'buyASA',
                'formattedPrice': '22.000000',
                'formattedASAAmount': '1',
              },
              {
                'PK_trade_history_id': 814576,
                'transaction_id': null,
                'group_id': 'XYbGNinEN9hs4gbe6KjOmklNjilgqid2tqFG5MjIG10=',
                'unix_time': 1641239251,
                'block_round': 18914625,
                'application_id': 22045503,
                'asset_id': 33698417,
                'asaPrice': '1.000000000000',
                'algoAmount': 719422,
                'asaAmount': 719422,
                // eslint-disable-next-line max-len
                'asaBuyerAddress': 'ZXPEYJMWFLULILWJHWB3Y6DFI4ADE7XVMGARAH734ZJ5ECXAR4YVMRZ4EM',
                // eslint-disable-next-line max-len
                'asaSellerAddress': '73QQ44HTUNGQLZQYL3FCCLWZ34JM7NKA5PELAR6WAQTO5IRKXXCL7XGW6M',
                'tradeType': 'buyASA',
                'formattedPrice': '1.000000',
                'formattedASAAmount': '0.719422',
              },
              {
                'PK_trade_history_id': 813148,
                'transaction_id': null,
                'group_id': 'XVBu+7/AcEHPqPpf3SJkA24aNmUQgVNGqhFuitPLx8E=',
                'unix_time': 1641232071,
                'block_round': 18912930,
                'application_id': 22045522,
                'asset_id': 21582668,
                'asaPrice': '0.005265000007',
                'algoAmount': 2000000,
                'asaAmount': 379867046,
                // eslint-disable-next-line max-len
                'asaBuyerAddress': 'ZXPEYJMWFLULILWJHWB3Y6DFI4ADE7XVMGARAH734ZJ5ECXAR4YVMRZ4EM',
                // eslint-disable-next-line max-len
                'asaSellerAddress': 'EPTSW4R2ZCJ4MN6FUE3RBLMDOPSPXXHCQB6KTBHEIYU6ALD4CWQGXGV2RQ',
                'tradeType': 'buyASA',
                'formattedPrice': '0.005265',
                'formattedASAAmount': '379.867046',
              },
              {
                'PK_trade_history_id': 813056,
                'transaction_id': null,
                'group_id': 's3+P7Spmgd8jhenQxMzRgFDH7dbmn2z48mULRzkiYbw=',
                'unix_time': 1641231684,
                'block_round': 18912839,
                'application_id': 22045522,
                'asset_id': 24270812,
                'asaPrice': '510821.000000000000',
                'algoAmount': 1532463,
                'asaAmount': 3,
                // eslint-disable-next-line max-len
                'asaBuyerAddress': 'ZXPEYJMWFLULILWJHWB3Y6DFI4ADE7XVMGARAH734ZJ5ECXAR4YVMRZ4EM',
                // eslint-disable-next-line max-len
                'asaSellerAddress': '4E4XWOLS7VJOUJCOTI66KT34CNTCDRNEH4K3XGMRIUAAONJDY54GHRCCTM',
                'tradeType': 'buyASA',
                'formattedPrice': '0.510821',
                'formattedASAAmount': '3',
              },
            ],
          });
    }
    const {result, waitFor} = renderHook(
        () => useWalletTradeHistoryQuery({wallet}),
        {wrapper},
    );
    console.debug(result, 'result');
    await waitFor(() => {
      return result.current.isSuccess;
    } );

    // TODO: Check the response parts not the entire object.
    // Break up into validation
    // expect(result.current.data).toEqual({
    //   isLoading: false,
    //   orders: {
    //     buy: [],
    //     sell: [
    //       {
    //         amount: 1,
    //         price: '1234.1235',
    //         total: 1,
    //       },
    //     ],
    //   },
    // });
  });
});
