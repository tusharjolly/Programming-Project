// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string name;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public hasVoted;
    uint public candidateCount;

    constructor() {
        addCandidate("Alice");
        addCandidate("Bob");
    }

    function addCandidate(string memory _name) public {
        candidates[candidateCount] = Candidate({ name: _name, voteCount: 0 });
        candidateCount++;
    }

    function vote(uint _candidateId) public {
        require(!hasVoted[msg.sender], "You've already voted!");
        require(_candidateId < candidateCount, "Invalid candidate");

        candidates[_candidateId].voteCount++;
        hasVoted[msg.sender] = true;
    }
}
