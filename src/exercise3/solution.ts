import *  as promise from 'es6-promise';
import {
  HancockTransactionEventBody,
  HancockEthereumSocket,
  CONSUMER_EVENT_KINDS,
  HancockEvent,
  HancockTokenBalanceResponse,
  HancockContractEventBody,
} from '@hancock/sdk-nodejs';
import {walletA, ethereumClient, masterWallet, options, urlBase} from '../index';

promise.polyfill();

// @ts-ignore
export async function playWithTokenAPI() {

  const tokenAlias = 'HancockTokenTest1';

  return new Promise(async (resolve, reject) => {

    try {
      const tokenAddress: string = await deployContract();

      await registerToken(tokenAlias, tokenAddress);

      subscribeTo(tokenAlias)
        .then(resolve)
        .catch(reject);

      tokenTransfer(tokenAlias);

    } catch (error) {
      reject(error);
    }
  });
}

async function subscribeTo(tokenAlias: string) {
  return new Promise(((resolve, reject) => {
    const hancockEthereumSocket: HancockEthereumSocket = ethereumClient.smartContract.subscribeToEvents([tokenAlias]);
    hancockEthereumSocket.on(CONSUMER_EVENT_KINDS.SmartContractEvent, async (data: HancockEvent) => {
      console.log('Token event: ' + JSON.stringify(data.body));
      hancockEthereumSocket.closeSocket();
      resolve(onTokenEvent(tokenAlias, (data.body as HancockContractEventBody)));
    });
    hancockEthereumSocket.on(CONSUMER_EVENT_KINDS.Error, (error: any) => {
      hancockEthereumSocket.closeSocket();
      reject(error);
    });
  }));
}

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

async function registerToken(tokenAlias: string, tokenAddress: string): Promise<boolean> {
  try {
    await ethereumClient.token.register(tokenAlias, tokenAddress);
    console.log(`Token ${tokenAddress} registered as ${tokenAlias}`);
    return true;

  } catch (e) {
    throw new Error(e);
  }
}

async function onTokenEvent(tokenAlias: string, eventBody: HancockContractEventBody): Promise<any> {
  try {
    if (eventBody.eventName === 'Transfer') {

      const hancockTokenBalanceResponse: HancockTokenBalanceResponse = await ethereumClient.token.getBalance(tokenAlias, walletA.address);
      console.log(`Token ${tokenAlias} balance of ${walletA.address} is ${hancockTokenBalanceResponse.balance}`);

      return hancockTokenBalanceResponse.balance;
      // For other events
    } else {
      return '';
    }
  } catch (e) {
    throw new Error(e);
  }
}

async function tokenTransfer(tokenAlias: string) {
  try {
    console.log(`Transferring 1 ${tokenAlias} from ${masterWallet} to ${walletA.address}`);
    return await ethereumClient.token.transfer(masterWallet, walletA.address, '1', tokenAlias, options);

  } catch (e) {
    throw new Error(e);
  }
}
