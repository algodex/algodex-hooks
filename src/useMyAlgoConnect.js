import {useEffect, useRef} from 'react';
import algosdk from 'algosdk';

const ERROR = {
  FAILED_TO_INIT: 'MyAlgo Wallet failed to initialize.',
  FAILED_TO_CONNECT: 'MyAlgo Wallet failed to connect.',
};

/**
 * useMyAlgoConnect
 * @param {Function} onConnect On Connect Callback
 * @param {Function} onDisconnect On Disconnect Callback
 * @return {WalletEffect}
 */
export default function useMyAlgoConnect(onConnect, onDisconnect) {
  // Instance reference
  const myAlgoWallet = useRef();
  /**
   * MyAlgoConnect Signer
   *
   * @todo move to SDK
   * @param {Array<Orders>} orders A list of Compiled Orders
   * @return {Promise<*>}
   */
  async function signer(orders) {
    const orderTxns = orders.map((execObj) => execObj.contract.txns);
    orderTxns.forEach((outerTxns) => algosdk.assignGroupID(
        outerTxns.map((txn) => txn.unsignedTxn),
    ));
    const outerTxns = [];
    orderTxns.forEach((txns) => {
      txns.forEach((txn) => outerTxns.push(txn));
    });

    // Sign the lsig transactions
    const signedLsigs = outerTxns
        .filter((outerTxn) => outerTxn.lsig instanceof algosdk.LogicSigAccount)
        .map((outerTxn) => {
          return algosdk.signLogicSigTransactionObject(
              outerTxn.unsignedTxn,
              outerTxn.lsig,
          );
        });

    // Sign the user transactions
    // eslint-disable-next-line no-invalid-this
    const signedTxnsFromUser = await this.signTransaction(
        outerTxns
            .filter((outerTxn) => typeof outerTxn.senderAcct !== 'undefined')
            .map((outerTxn) => {
              return outerTxn.unsignedTxn.toByte();
            }),
    );

    return [...signedLsigs, ...signedTxnsFromUser]
        .map((txn) => ({signedTxn: txn}));
  }

  const connect = async () => {
    try {
      // Something went wrong!
      if (!myAlgoWallet.current) {
        console.error(ERROR.FAILED_TO_INIT);
        return;
      }

      // Get Accounts from MyAlgo
      const accounts = await myAlgoWallet.current.connect();

      // Map the connector to the address list
      const _addresses = accounts.map((acct) => {
        acct.type = 'my-algo-wallet';
        acct.connector = myAlgoWallet.current;
        acct.connector.connected = true;
        return acct;
      });
      console.debug('Setting Address form myAlgoConnect', _addresses);
      // Set Addresses
      onConnect(_addresses);
    } catch (e) {
      console.error(ERROR.FAILED_TO_CONNECT, e);
    }
  };

  const disconnect = () => {
    // setAddresses(
    //   algodex.addresses.filter((addr) => addr.type !== 'my-algo-wallet'),
    //   { merge: false, validate: false }
    // )
    // if (algodex.addresses.length) {
    //   setWallet(algodex.addresses[0], { validate: false, merge: true })
    // }
  };

  useEffect(() => {
    const initMyAlgoWallet = async () => {
      // '@randlabs/myalgo-connect' is imported dynamically
      // because it uses the window object
      const MyAlgoConnect = (await import('@randlabs/myalgo-connect')).default;
      MyAlgoConnect.prototype.sign = signer;
      // TODO: get signer from SDK
      // MyAlgoConnect.prototype.sign = await import(
      //   '@algodex/algodex-sdk/lib/wallet/signers/MyAlgoConnect'
      // )
      myAlgoWallet.current = new MyAlgoConnect();
      myAlgoWallet.current.connected = false;
    };

    initMyAlgoWallet();
  }, []);

  return {connect, disconnect, onDisconnect, connector: myAlgoWallet.current};
}
