import *  as promise from 'es6-promise';
import {
  HancockContractEventBody,
} from '@hancock/sdk-nodejs';

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

// @ts-ignore
async function subscribeTo(tokenAlias: string) {
  return new Promise(((resolve, reject) => {

  }));
}

// @ts-ignore
async function deployContract(): Promise<string> {
  try {

  } catch (e) {
    throw new Error(e);
  }
}

// @ts-ignore
async function registerToken(tokenAlias: string, tokenAddress: string): Promise<boolean> {
  try {

  } catch (e) {
    throw new Error(e);
  }
}

// @ts-ignore
async function onTokenEvent(tokenAlias: string, eventBody: HancockContractEventBody): Promise<any> {
  try {

  } catch (e) {
    throw new Error(e);
  }
}

async function tokenTransfer(tokenAlias: string) {
  try {

  } catch (e) {
    throw new Error(e);
  }
}
