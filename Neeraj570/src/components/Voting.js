import React, { useState, useEffect } from "react";
import Web3 from "web3";
import Voting from "../abis/Voting.json";

const VotingComponent = () => {
  const [account, setAccount] = useState("");
  const [votingContract, setVotingContract] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState("");

  useEffect(() => {
    const loadBlockchain = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        const networkId = await web3.eth.net.getId();
        const networkData = Voting.networks[networkId];

        if (networkData) {
          const contract = new web3.eth.Contract(Voting.abi, networkData.address);
          setVotingContract(contract);

          const candidatesList = await contract.methods.getAllCandidates().call();
          setCandidates(candidatesList);
        } else {
          alert("Contract not deployed to this network.");
        }
      }
    };

    loadBlockchain();
  }, []);

  const vote = async () => {
    await votingContract.methods.vote(selectedCandidate).send({ from: account });
    alert("Vote cast successfully!");
  };

  return (
    <div>
      <h2>Vote for Your Candidate</h2>
      <select onChange={(e) => setSelectedCandidate(e.target.value)}>
        <option value="">Select</option>
        {candidates.map((cand, index) => (
          <option key={index} value={cand}>{cand}</option>
        ))}
      </select>
      <button onClick={vote}>Vote</button>
    </div>
  );
};

export default VotingComponent;
