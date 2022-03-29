import {jsxDecorator} from 'storybook-addon-jsx'
import {Provider} from '@/components/AlgodexContext.js'
import {QueryClient, QueryClientProvider} from 'react-query'
import AlgodexApi from "../../../../algodex-sdk/lib/AlgodexApi.js";
const queryClient = new QueryClient()

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
let api;
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
export const decorators = [
  jsxDecorator,
  (Story) => (
        <Provider dex={makeApi()}>
          <QueryClientProvider client={queryClient}>
            {Story()}
          </QueryClientProvider>
        </Provider>
  )
]

