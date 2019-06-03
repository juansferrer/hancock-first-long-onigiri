import *  as promise from 'es6-promise';
import {
  HancockTransactionEventBody,
  HancockEthereumSocket,
  CONSUMER_EVENT_KINDS,
  HancockEvent,
  HancockCallResponse,
} from '@hancock/sdk-nodejs';
import {walletA, ethereumClient, masterWallet, options, urlBase} from '../index';

promise.polyfill();

// @ts-ignore
export async function playWithSmartContractAPI() {

  const alias = 'HancockTest1';

  return new Promise(async (resolve, reject) => {

    try {

      const contractAddress: string = await deployContract();

      if (contractAddress) {
        try {
          const abi: any = await getABI();

          await registerSmartContract(alias, contractAddress, abi);

          subscribeTo(alias, contractAddress)
            .then(resolve)
            .catch(reject);

          invokeTransfer(alias);

        } catch (error) {
          reject(error);
        }
      }

    } catch (error) {
      reject(error);
    }
  });
}

// @ts-ignore
async function subscribeTo(alias: string, contractAddress: string) {
  return new Promise(((resolve, reject) => {
    const hancockEthereumSocket: HancockEthereumSocket = ethereumClient.smartContract.subscribeToTransactions([contractAddress]);
    hancockEthereumSocket.on(CONSUMER_EVENT_KINDS.SmartContractTransaction, async (data: HancockEvent) => {
      console.log('SmartContractTransacion: ' + JSON.stringify(data.body));
      hancockEthereumSocket.closeSocket();
      resolve(onSmartContractTransaction(alias));
    });
    hancockEthereumSocket.on(CONSUMER_EVENT_KINDS.Error, (error: any) => {
      hancockEthereumSocket.closeSocket();
      reject(error);
    });
  }));
}

// @ts-ignore
async function deployContract(): Promise<string> {
  try {

    const transactionEventBody: HancockTransactionEventBody = await ethereumClient.smartContract.deploy(
      masterWallet,
      options,
      urlBase,
      'EIP20',
      ['1000', 'HancockTokenTest1', '18', 'HT1'],
    );

    if (transactionEventBody.newContractAddress) {
      console.log(transactionEventBody.newContractAddress);
      return transactionEventBody.newContractAddress;

    } else {
      throw new Error('Address not received');
    }

  } catch (e) {
    throw new Error(e);
  }
}

// @ts-ignore
async function getABI(): Promise<any> {
  try {

    const responseFetch = await fetch(`${urlBase}.abi`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    });
    return await responseFetch.json() as any;

  } catch (e) {
    throw new Error(e);
  }
}

// @ts-ignore
async function registerSmartContract(alias: string, contractAddress: string, abi: any): Promise<boolean> {
  try {
    await ethereumClient.smartContract.register(alias, contractAddress, abi);
    console.log(`smart contract ${contractAddress} registered as ${alias}`);
    return true;

  } catch (e) {
    throw new Error(e);
  }
}

// @ts-ignore
async function onSmartContractTransaction(alias: string): Promise<any> {
  try {
    const hancockCallResponse: HancockCallResponse = await ethereumClient.smartContract.call(alias, 'balanceOf', [walletA.address], walletA.address);
    console.log(`Balance of ${walletA.address} is ${hancockCallResponse.data}`);
    return hancockCallResponse.data;

  } catch (e) {
    throw new Error(e);
  }
}

// @ts-ignore
async function invokeTransfer(alias: string) {
  try {
    console.log(`Invoking method transfer in contract ${alias}`);
    return await ethereumClient.smartContract.invoke(alias, 'transfer', [walletA.address, '1'], masterWallet, options);

  } catch (e) {
    throw new Error(e);
  }
}
