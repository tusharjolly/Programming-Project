import Web3 from "web3";
import Voting from "./abis/Voting.json";

const getContract = async () => {
  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.getAccounts();
  const networkId = await web3.eth.net.getId();
  const networkData = Voting.networks[networkId];

  if (networkData) {
    const instance = new web3.eth.Contract(Voting.abi, networkData.address);
    return { instance, account: accounts[0] };
  } else {
    throw new Error("Contract not found on this network");
  }
};

export default getContract;
