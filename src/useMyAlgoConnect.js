import {useEffect, useRef} from 'react';
import signer from '@algodex/algodex-sdk/lib/wallet/signers/MyAlgoConnect';
// const ERROR = {
//   FAILED_TO_INIT: 'MyAlgo Wallet failed to initialize.',
//   FAILED_TO_CONNECT: 'MyAlgo Wallet failed to connect.',
// };

/**
 * useMyAlgoConnect
 * @param {Function} onConnect On Connect Callback
 * @param {Function} onDisconnect On Disconnect Callback
 * @return {WalletEffect}
 */
export default function useMyAlgoConnect(onConnect, onDisconnect) {
  // Instance reference
  const myAlgoWallet = useRef();

  const disconnect = () => {
    // setAddresses(
    //   algodex.addresses.filter((addr) => addr.type !== 'my-algo-wallet'),
    //   { merge: false, validate: false }
    // )
    // if (algodex.addresses.length) {
    //   setWallet(algodex.addresses[0], { validate: false, merge: true })
    // }
  };
  const connect = () =>{

  };
  useEffect(() => {
    const initMyAlgoWallet = async () => {
      // '@randlabs/myalgo-connect' is imported dynamically
      // because it uses the window object
      const MyAlgoConnect = (await import('@randlabs/myalgo-connect')).default;
      MyAlgoConnect.prototype.sign = signer;
      myAlgoWallet.current = new MyAlgoConnect();
      myAlgoWallet.current.connected = false;
    };

    initMyAlgoWallet();
  }, []);

  return {connect, disconnect, connector: myAlgoWallet.current};
}
