import {useState, useEffect, useRef} from 'react';

const ERROR = {
  FAILED_TO_INIT: 'MyAlgo Wallet failed to initialize.',
  FAILED_TO_CONNECT: 'MyAlgo Wallet failed to connect.',
};
/**
 * @param {string} type Wallet Type
 * @return {object}
 */
export default function useWallets(type='my-algo-wallet') {
  const [addresses, setAddresses] = useState();

  const connector = useRef();

  const connect = async () => {
    try {
      if (!connector.current) {
        console.error(ERROR.FAILED_TO_INIT);
        return;
      }

      const accounts = await connector.current.connect();
      const _addresses = accounts.map((acct) => acct.address);
      setAddresses(_addresses);
    } catch (e) {
      console.error(ERROR.FAILED_TO_CONNECT, e);
    }
  };

  useEffect(() => {
    const initWallet = async () => {
      const pkg = type === 'my-algo-wallet' ?
        '@algodex/algodex-sdk/lib/wallet/connectors/MyAlgoConnect' :
        '@algodex/algodex-sdk/lib/wallet/connectors/WalletConnect';

      connector.current = await import(pkg);
    };

    initWallet();
  }, []);

  return {
    connect,
    addresses,
  };
}
