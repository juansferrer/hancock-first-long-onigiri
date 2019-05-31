import {HancockEthereumClient, EthereumWallet} from '@hancock/sdk-nodejs';
import {playWithTransfers} from './exercise1';
import {playWithSmartContractAPI} from './exercise2';
// import {playWithSmartContractAPI} from './exercise2';
import {playWithTokenAPI} from './exercise3';

export const options = {
  privateKey: '0x6c47653f66ac9b733f3b8bf09ed3d300520b4d9c78711ba90162744f5906b1f8',
};
export const urlBase: string = 'https://s3-eu-west-1.amazonaws.com/archer-smartcontracts/eip20/ethereum/EIP20';
export const masterWallet = '0x6c0a14f7561898b9ddc0c57652a53b2c6665443e';
export let walletA: EthereumWallet;

export const config: any = {
  adapter: {
    host: 'https://kong-hancock-develop.kickstartteam.es',
    port: '443',
    base: '/v4/dlt-adapter',
  },
  wallet: {
    host: 'https://kong-hancock-develop.kickstartteam.es',
    port: '443',
    base: '/v4/wallet-hub',
  },
  broker: {
    host: 'wss://kong-hancock-develop.kickstartteam.es',
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
