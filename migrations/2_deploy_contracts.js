const jsonFastswapRouter02 = require('../build/FastswapRouter02.json');
jsonFastswapRouter02.contractName = 'FastswapRouter02';

const jsonWETH9 = require('../build/WETH9.json');
jsonWETH9.contractName = 'WETH9';

const contract = require('@truffle/contract');

const FastswapRouter02 = contract(jsonFastswapRouter02);
const WETH9 = contract(jsonWETH9);


// const { BN } = require('@openzeppelin/test-helpers');
// const ether = (n) => new BN(web3.utils.toWei(n, 'ether'));

module.exports = function (deployer, network) {
  FastswapRouter02.setProvider(this.web3._provider);
  WETH9.setProvider(this.web3._provider);

  deployer.then(async () => {
    if (network === 'test' || network === 'soliditycoverage') {
      // do nothing
    } else if (network === 'bsctestnet') {
      const WBNBAddress = '0xae13d989dac2f0debff460ac112a837c89baa7cd';
      const b = await deployer.deploy(FastswapRouter02, process.env.FASTSWAP_FACTORY_RINKEBY, WBNBAddress, { from: process.env.DEPLOYER_ACCOUNT });
      console.log('factory:', await b.factory.call());
      console.log('WETH:', await b.WETH.call());
    } else if (network === 'bsc') {
      const WBNBAddress = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c';
      const b = await deployer.deploy(FastswapRouter02, process.env.FASTSWAP_FACTORY_MAINNET, WBNBAddress, { from: process.env.DEPLOYER_ACCOUNT });
      console.log('factory:', await b.factory.call());
      console.log('WETH:', await b.WETH.call());
    } else {
      console.error(`Unsupported network: ${network}`);
    }
  });
};
