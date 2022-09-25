/* 
 * Algodex Hooks 
 * Copyright (C) 2021-2022 Algodex VASP (BVI) Corp.
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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

