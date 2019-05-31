import *  as promise from 'es6-promise';
import {
  EthereumWallet,
} from '@hancock/sdk-nodejs';
import {masterWallet} from '../index';

promise.polyfill();

let walletA: EthereumWallet;

// @ts-ignore
export async function playWithTransfers(): Promise<EthereumWallet> {
  try {

    // generate walletA

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

      // Send transaction

    } catch (error) {
      reject(error);
    }

  }));
}

// @ts-ignore
async function subscribeTo(to: string) {
  return new Promise(((resolve, reject) => {

  }));
}
