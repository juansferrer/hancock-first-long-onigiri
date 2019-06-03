import {HancockEthereumClient, EthereumWallet} from '@hancock/sdk-nodejs';
import {playWithTransfers} from './exercise1/solution';
import {playWithSmartContractAPI} from './exercise2/solution';
import {playWithTokenAPI} from './exercise3/solution';

export const options = {
  privateKey: '0x9837a2c2173f17a9a71bd43123de10d79cf6eba52ceb10f95b53a26462be86cf',
};
export const urlBase: string = 'https://s3-eu-west-1.amazonaws.com/archer-smartcontracts/eip20/ethereum/EIP20';
export const masterWallet = '0x441a03d4526171c0f5aac05345311be4fa78d039';
export let walletA: EthereumWallet;

const host: string = 'host';
export const config: any = {
  adapter: {
    host: `https://${host}`,
    port: '443',
    base: '/v4/dlt-adapter',
  },
  wallet: {
    host: `https://${host}`,
    port: '443',
    base: '/v4/wallet-hub',
  },
  broker: {
    host: `wss://${host}`,
    port: '443',
    base: '/v4/dlt-broker',
  },
};

export const ethereumClient: HancockEthereumClient = new HancockEthereumClient(config);

async function run() {
  try {

    // Exercise 1
    walletA = await playWithTransfers();

    // Exercise 2
    await playWithSmartContractAPI();

    // Exercise 3
    await playWithTokenAPI();

  } catch (e) {
    throw new Error(e);
  }
}

run()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
