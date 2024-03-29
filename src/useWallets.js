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

import useAlgodex from './useAlgodex';
import useMyAlgoConnect from './useMyAlgoConnect';
import useWalletConnect from './useWalletConnect';
import {useCallback, useEffect, useState} from 'react';
import {isEqual} from 'lodash/lang';
import events from '@algodex/algodex-sdk/lib/events';
/**
 *
 * @param {Array<Wallet>} a
 * @param {Array<Wallet>} b
 * @return {Array<Wallet>}
 * @private
 */
function _mergeAddresses(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b)) {
    throw new TypeError('Must be an array of addresses!');
  }
  const map = new Map();
  a.forEach((wallet) => map.set(wallet.address, wallet));
  b.forEach((wallet) => map.set(wallet.address,
      {...map.get(wallet.address), ...wallet},
  ));
  return Array.from(map.values());
}

/**
 * Use Wallets Hooks
 * @param {Object} initialState Wallet Initial State
 * @return {*}
 */
function useWallets(initialState) {
  const [wallet, setWallet] = useState(initialState);
  const [activeWallet, setActiveWallet] = useState();
  const [addresses, setAddresses] = useState([]);
  const {http} = useAlgodex();

  const onEvents = useCallback(
      (props) => {
        const {type, wallet: _wallet} = props;
        if (type === 'change' && !isEqual(wallet, _wallet)) {
          setWallet(_wallet);
          setActiveWallet(_wallet.address);
        }
      },
      [setWallet, wallet],
  );
  useEffect(() => {
    events.on('wallet', onEvents);
    return () => {
      events.off('wallet', onEvents);
    };
  }, [onEvents]);

  // TODO: Account Info Query
  // Handle any Connection
  const handleConnect = useCallback(
      async (_addresses) => {
        const accounts = await http.indexer.fetchAccounts(_addresses);
        console.log(accounts);
        setAddresses(_mergeAddresses(_addresses, accounts));
      },
      [setAddresses],
  );

  // Handle any Disconnect
  const handleDisconnect = useCallback((_addresses) => {
    console.error('Handle removing from storage', _addresses);
  }, []);

  // My Algo Connect/Disconnect
  const {
    connect: myAlgoConnect,
    disconnect: myAlgoDisconnect,
  } = useMyAlgoConnect(
      handleConnect,
      handleDisconnect,
  );
  // Pera Connect/Disconnect
  const {connect: peraConnect, disconnect: peraDisconnect} = useWalletConnect(
      handleConnect,
      handleDisconnect,
  );

  // Fetch active wallet from local storage
  useEffect(() => {
    const res = localStorage.getItem('activeWallet');
    if (res && res !== activeWallet) {
      setActiveWallet(localStorage.getItem('activeWallet'));
    }
  }, [setActiveWallet]);

  // Fetch all wallet addresses from local storage
  useEffect(() => {
    const res = localStorage.getItem('addresses');
    if (res) {
      setAddresses(JSON.parse(localStorage.getItem('addresses')));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('addresses', JSON.stringify(addresses));
  }, [addresses]);

  return {
    wallet,
    setWallet,
    addresses,
    myAlgoConnect,
    peraConnect,
    peraDisconnect,
    myAlgoDisconnect,
  };
}

export default useWallets;
