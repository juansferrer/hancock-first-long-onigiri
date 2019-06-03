import *  as promise from 'es6-promise';
import {
  HancockTransactionEventBody,
  HancockEthereumSocket,
  CONSUMER_EVENT_KINDS,
  HancockEvent,
  EthereumWallet,
} from '@hancock/sdk-nodejs';
import {ethereumClient, masterWallet, options} from '../index';

promise.polyfill();

let walletA: EthereumWallet;

// @ts-ignore
export async function playWithTransfers(): Promise<EthereumWallet> {
  try {
    walletA = ethereumClient.wallet.generate();
    console.log(`New wallet: ${JSON.stringify(walletA)}`);

    await printWalletBalance(masterWallet);

    await printWalletBalance(walletA.address);

    await transferEthers(masterWallet, walletA.address, '1');

    await printWalletBalance(walletA.address);

    return walletA;

  } catch (e) {
    throw new Error(e);
  }
}

// @ts-ignore
async function printWalletBalance(address: string) {
  try {
    let anotherWalletBalance: any = await ethereumClient.wallet.getBalance(address);
    console.log(`${address} balance is ${anotherWalletBalance}`);

  } catch (e) {
    throw new Error(e);
  }
}

// @ts-ignore
async function transferEthers(from: string, to: string, vaue: string) {

  return new Promise(((resolve, reject) => {
    try {
      subscribeTo(to)
        .then(resolve)
        .catch(reject);

      ethereumClient.transfer.send(from, to, vaue, options);

    } catch (error) {
      reject(error);
    }

  }));
}

// @ts-ignore
async function subscribeTo(to: string) {
  return new Promise(((resolve, reject) => {
    const hancockEthereumSocket: HancockEthereumSocket = ethereumClient.transfer.subscribe([to]);
    hancockEthereumSocket.on(CONSUMER_EVENT_KINDS.Transfer, (data: HancockEvent) => {
      const hancockTransactionEventBody: HancockTransactionEventBody = (data.body as HancockTransactionEventBody);
      console.log(`${hancockTransactionEventBody.value.amount} ${hancockTransactionEventBody.value.currency} transferred from ${hancockTransactionEventBody.from} to ${hancockTransactionEventBody.to}`);
      hancockEthereumSocket.closeSocket();
      resolve(hancockTransactionEventBody);
    });
    hancockEthereumSocket.on(CONSUMER_EVENT_KINDS.Error, (error: any) => {
      hancockEthereumSocket.closeSocket();
      reject(error);
    });
  }));
}
