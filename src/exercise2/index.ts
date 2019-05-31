import *  as promise from 'es6-promise';
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
async function getABI(): Promise<any> {
  try {

  } catch (e) {
    throw new Error(e);
  }
}

// @ts-ignore
async function registerSmartContract(alias: string, contractAddress: string, abi: any): Promise<boolean> {
  try {

  } catch (e) {
    throw new Error(e);
  }
}

// @ts-ignore
async function onSmartContractTransaction(alias: string): Promise<any> {
  try {

  } catch (e) {
    throw new Error(e);
  }
}

// @ts-ignore
async function invokeTransfer(alias: string) {
  try {

  } catch (e) {
    throw new Error(e);
  }
}
