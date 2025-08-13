// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    address public admin;
    mapping(address => bool) public hasVoted;
    string[] public candidates;
    mapping(string => uint256) public votes;

    constructor(string[] memory candidateNames) {
        admin = msg.sender;
        candidates = candidateNames;
    }

    function vote(string memory candidate) public {
        require(!hasVoted[msg.sender], "You have already voted.");
        bool valid = false;

        for (uint i = 0; i < candidates.length; i++) {
            if (keccak256(abi.encodePacked(candidates[i])) == keccak256(abi.encodePacked(candidate))) {
                valid = true;
                break;
            }
        }

        require(valid, "Invalid candidate.");
        hasVoted[msg.sender] = true;
        votes[candidate]++;
    }

    function getVotes(string memory candidate) public view returns (uint256) {
        return votes[candidate];
    }

    function getAllCandidates() public view returns (string[] memory) {
        return candidates;
    }
}
