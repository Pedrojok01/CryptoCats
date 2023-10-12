<div align="center">
<h1><strong>CryptoCats - Create, Breed and Sell some funny lookin' cats!</strong></h1>

[![Stargazers](https://img.shields.io/github/stars/Pedrojok01/CryptoCats)](https://github.com/Pedrojok01/CryptoCats/stargazers)
[![Issues](https://img.shields.io/github/issues/Pedrojok01/CryptoCats)](https://github.com/Pedrojok01/CryptoCats/issues)
[![MIT License](https://img.shields.io/github/license/Pedrojok01/CryptoCats)](https://github.com/Pedrojok01/CryptoCats/blob/main/License)
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-black)](https://www.linkedin.com/in/pierre-e/)
[![Netlify Status](https://api.netlify.com/api/v1/badges/561688bc-a876-45d2-b65b-77fdc4f1cf17/deploy-status)](https://app.netlify.com/sites/crypto-cats/deploys)

<br></br>

![Preview](./nextjs_frontend/public/img/preview.gif)

</div>
<br></br>

<!-- TABLE OF CONTENTS -->

  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#Description">Description</a>    
    </li>
    <li>
      <a href="#Features">Features</a>
    </li>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#getting-started">Getting Started</a>
    <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#contracts-deployment">Contracts deployment</a></li>
        <li><a href="#config">Config</a></li>
      </ul>
    </li>
    <li><a href="#use">Use</a></li>
  </ol>

<br></br>

## UPDATE (Dec 2022):

CryptoCats Revisited. No more vanilla JS (which, despite being a huge mess, was quite an achievment in itself none the less), but a fast & modern app built with Hardhat (smart-contracts) / Next.js (front-end) / ChakhraUI (components) / Wagmi (Web3) instead.

## Description

Decentralized application (Dapp) deployed on Goerli, but compatible with all EVM networks. Initially built as a part of the programming course: Ethereum Dapp Programming on [academy.moralis.io](https://academy.moralis.io/courses/ethereum-dapp-programming).

Try it yourself: [crypto-cats.netlify.app/](https://crypto-cats.netlify.app/)

## Features

- [x] Factory - Design and Create your own Cat for FREE in the Cat Factory! When you're done, just click on the `Create` button to mint your cat! (Limited to 100 Cats)
- [x] MyCats/Show - Display all the cats present in your collection;
- [x] MyCats/Breed - Select two parents, breed a seebling out and find out which characteristics you inherited from each!
- [x] MyCats/Sell - Create a sell offer to list your cat on the marketplace!
- [x] Marketplace - Buy some cats on the marketplace or simply remove your offers.

## Built With

- [![solidity]][solidity-url]
- [![hardhat]][hardhat-url]
- [![ethers.js]][ethers-url]
- [![nextjs]][nextjs-url]
- [![typescript]][typescript-url]
- [![chakraUI]][chakraui-url]
- [![prettier]][prettier-url]
- [![ESLint]][eslint-url]

## Getting Started

### Prerequisites:

- `Node.JS` installed
- `npm` installed
- [hardhat](https://hardhat.org/hardhat-runner/docs/getting-started#overview) installed via `yarn add --dev hardhat@esm` (developed on v2.12.0-esm).
- [MetaMask](https://metamask.io/) installed in your browser

### Installation:

1.  Clone the repo with the following command:

    ```sh
    git clone https://github.com/Pedrojok01/CryptoCats
    ```

2.  Make sure you're on the root directory, then install all dependencies via:
    ```sh
    yarn install
    ```

### Contracts deployment

To deploy your own smart-contracts:

- Remove `.example` from the `.env.example` file and edit the file with your API KEYs for the networks you wish to use and your PRIVATE KEY (<b>Do not paste your private key anywhere else!</b>);
- Edit the `hardhat.config.tsc` if needed, and the `"deploy"` script in the `package.json` file with the network needed;
- To deploy your smart-contracts simply run the command below, and wait for the contract addresses and ABI to appear in your console:

  ```sh
  yarn deploy
  ```

- Replace the contract addresses (both `CAT_CONTRACT` & `MARKETPLACE_CONTRACT_ADD`) and the corresponding chains infos in the `src/data/constant.ts` file;
- And don't forget to have some funds ready if you want to buy some CryptoCats on the marketplace! [Faucet for the Goerli network](https://goerlifaucet.com/);

### Config

On each deploy, make sure to:

- Change the `CAT_CONTRACT_ADD` and the `MARKETPLACE_CONTRACT_ADD` in `src/data/constant.ts` to your deployed contracts address;
- Edit the ABI files in `src/data/abis/` if you made any changes to the smart-contracts;
- Enable/disable/update the suitable networks in `hardhat.config.tsc`, `package.json` & `src/data/constant.ts`;

## Use

You are now set to start your local server. Make sure you're in the root directory type:

```sh
yarn dev
```

<br></br>

<div align="center">
<h2>Enjoy!!!</h2>

### ⭐️ ... and don't forget to leave a star if you like it! ⭐️

</div>

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[solidity]: https://img.shields.io/badge/Solidity_v8.0.16-35495E?style=for-the-badge&logo=solidity&logoColor=4FC08D
[solidity-url]: https://soliditylang.org/
[typescript]: https://img.shields.io/badge/Typescript_v4.9.4-375BD2?style=for-the-badge&logo=typescript&logoColor=#3178C6
[typescript-url]: https://www.typescriptlang.org/
[chakraui]: https://img.shields.io/badge/chakra_UI-green?style=for-the-badge&logo=chakraUI&logoColor=#319795
[chakraui-url]: https://chakra-ui.com/
[nextjs]: https://img.shields.io/badge/Next_JS-yellowgreen?style=for-the-badge&logo=next.js&logoColor=#000000
[nextjs-url]: https://nextjs.org/
[prettier]: https://img.shields.io/badge/Prettier-360D3A?style=for-the-badge&logo=Prettier&logoColor=61DAFB
[prettier-url]: https://prettier.io/
[eslint]: https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=ESLint&logoColor=61DAFB
[eslint-url]: https://eslint.org/
[hardhat]: https://img.shields.io/badge/Hardhat-FF0000?style=for-the-badge&logo=data:image/png;base64,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
[hardhat-url]: https://hardhat.org/
[ethers.js]: https://img.shields.io/badge/Ethers.js-2535a0?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAwCAYAAAC13uL+AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALVSURBVGhD7ZjPSxdBGIf7Z7p1ky51CS928qQnu5SH9BIeAiFJEAwPVgfx5EkIBCEIgkAIBEEQBOlP2ny+MDDfl8/uvjM7U23s4SHNd2fez7y/ZvfBw8enzf/KJG6sTOLGyiSuBE+enzfPlr/OUH+vQVVxC4tnzebby+bw+K45Ovk1x9a7q+pCq4lbe30hRVkQ+ejpF7nGUKqII1pKSBvvD26qCCwubv3NTymgj+29a7neEIqKo4as0x8+3zbLa99n9Rfslla/zcRY29WXP+bWG0pRcfufbuecJT2VXQAxsT01WjI9i4kjOrGjWztX0s5in3uxcSHtcsgWRwq+uq8vmkHsHHxMjAAHYdcAIkn6rtxHOE5rL8niGMaqXmL60tHCmmodC+NFPd9GkjgagWd2kWrq+S52RQYoUg7OLY7T7RLGpjQI0jWnKcTXMw6R9UhvtZe3q7rE4azthAHmWo0BDNSZiqi3q7rE0cHsBpCTfqkggllp9/ZEzyVORa30wO3Cjgvw3Gh6xZEadmFOUtnWguhZH0DZxvSKU1eqPxm1gKo9ZRfTK07VG4KVrZec59VsVXYxf0VcTiOqIk6lJXNI2XphzdTrlG1qnrrPEjf0couwlLpVTY35qmxjesWpTuW98XdBmnmHP7cV64Mn8r3iQN3avY61Qd157olqxnkzxyVObZDTFCxEjw9EKgpLK/ptvfjFWV2BSrw183wQwL+g3g8DnjqLcYkD9c6VcopdkAXq/higLHLGj1scqPRE4NAIBjhAxgw1RTdFUO7aPJckDtjcvmcxg4bOvlRwHvHUJofO/vzOAYUDSRYHNADVnqkXvnewgXouheA88HkBqEnqjr09kc0SF0Akm7V9IsAZumFwrg1sQkOhUZEZ/IwIUpSoeOaaZZC4GDbnJHEGwcHZAAdg/w877CFESa2dSzFx/yKTuLEyiRsrk7ixMokbK5O4cXLa/Ab0j7hz1hk9uQAAAABJRU5ErkJggg==
[ethers-url]: https://docs.ethers.io/v5/
