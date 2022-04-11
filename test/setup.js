import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {render} from '@testing-library/react';
import AlgodexApi from '@algodex/algodex-sdk/lib/AlgodexApi.js';
import {Provider} from '../src/components/AlgodexContext.js';
import {matchers} from '@emotion/jest';
expect.extend(matchers);
const queryClient = new QueryClient();
/**
 *
 * @type {APIProperties}
 */
const properties = {
  config: {
    'algod': {
      'uri': 'https://testnet.algoexplorerapi.io',
      'token': '',
    },
    'indexer': {
      'uri': 'https://algoindexer.testnet.algoexplorerapi.io',
      'token': '',
    },
    'dexd': {
      'uri': 'https://testnet.algodex.com/algodex-backend',
      'token': '',
    },
  },
};
let api;

/**
 *
 * @return {AlgodexApi}
 */
function makeApi() {
  if (typeof api === 'undefined') {
    api = new AlgodexApi(properties);
  }
  return api;
}

/**
 *
 * @param {JSX.Element} children
 * @return {JSX.Element}
 */
export function wrapper({children}) {
  return (
    <Provider dex={makeApi()}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </Provider>
  );
}

const customRender = (ui, options = {}) => render(ui, {wrapper, ...options});
export * from '@testing-library/react';
export {customRender as render};
