const { ethers } = require("hardhat");

async function main() {
  // Deploy BotTokenFactory
  const BotTokenFactory = await ethers.getContractFactory("BotTokenFactory");
  const botTokenFactory = await BotTokenFactory.deploy();
  await botTokenFactory.deployed();
  console.log("BotTokenFactory deployed to:", botTokenFactory.address);

  // Deploy SignalMirroring
  const SignalMirroring = await ethers.getContractFactory("SignalMirroring");
  const signalMirroring = await SignalMirroring.deploy();
  await signalMirroring.deployed();
  console.log("SignalMirroring deployed to:", signalMirroring.address);

  // Deploy CharityVault
  const CharityVault = await ethers.getContractFactory("CharityVault");
  const charityVault = await CharityVault.deploy();
  await charityVault.deployed();
  console.log("CharityVault deployed to:", charityVault.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });