// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ChallengeJourney_75 {
    address public owner; // Address of the contract owner
    string[] public progressUpdates; // An array to store daily progress updates
    
    // Event to log new progress updates
    event ProgressUpdate(string update, uint256 timestamp);

    constructor() {
        owner = msg.sender; // Set the contract owner to the address that deploys the contract
    }

    // Modifier to ensure only the owner can add progress updates
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can add progress updates");
        _;
    }

    // Function to add a daily progress update
    function addProgressUpdate(string memory update) public onlyOwner {
        progressUpdates.push(update);
        emit ProgressUpdate(update, block.timestamp);
    }

    // Function to get the total number of progress updates
    function getProgressCount() public view returns (uint256) {
        return progressUpdates.length;
    }
}
