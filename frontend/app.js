import Web3 from 'web3';
import Web3 from 'web3.js';


if (typeof window.ethereum !== 'undefined') {
    window.web3 = new Web3(window.ethereum);
    // Request account access if needed
    window.ethereum.enable();
  } else {
    // Handle the case where the user doesn't have MetaMask or a similar extension
    console.error('Please install MetaMask or another Ethereum wallet extension');
  }
  

  if (typeof Web3 !== 'undefined') {
    console.log('Web3 is available');
    // Your Web3.js code here

    // Connect to an Ethereum node (e.g., MetaMask)
window.addEventListener('load', async () => {
    if (typeof window.ethereum !== 'undefined') {
        // Request account access if needed
        await window.ethereum.enable();
        const web3 = new Web3(window.ethereum);

        // Load the smart contract ABI and address
        const contractABI = [[
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "update",
                        "type": "string"
                    }
                ],
                "name": "addProgressUpdate",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "update",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "timestamp",
                        "type": "uint256"
                    }
                ],
                "name": "ProgressUpdate",
                "type": "event"
            },
            {
                "inputs": [],
                "name": "getProgressCount",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "owner",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "progressUpdates",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ]]; // Replace with your contract's ABI
        const contractAddress = '0x1f0E518D71896A1c8F57e856933C4Eca15B34e72'; // Replace with your contract's address
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        // Function to record daily progress
        async function recordProgress(progress) {
            const accounts = await web3.eth.getAccounts();
            const sender = accounts[0];
            await contract.methods.addProgressUpdate(progress).send({ from: sender });
        }

        // Function to fetch and display progress updates
        async function fetchProgressUpdates() {
            const progressCount = await contract.methods.getProgressCount().call();
            const progressItems = [];

            for (let i = 0; i < progressCount; i++) {
                const progress = await contract.methods.progressUpdates(i).call();
                progressItems.push(progress);
            }

            const progressList = document.getElementById('progressItems');
            progressList.innerHTML = '';

            progressItems.forEach((progress, index) => {
                const listItem = document.createElement('li');
                listItem.textContent = `Day ${index + 1}: ${progress}`;
                progressList.appendChild(listItem);
            });
        }

        // Handle form submission
        const progressForm = document.getElementById('progressForm');
        progressForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const progressUpdate = document.getElementById('progressUpdate').value;
            await recordProgress(progressUpdate);
            fetchProgressUpdates();
            document.getElementById('progressUpdate').value = ''; // Clear the input field
        });

        // Initial fetch of progress updates
        fetchProgressUpdates();
    } else {
        console.error('MetaMask or a compatible Ethereum wallet is not installed.');
    }
});

  } else {
    console.error('Web3 is not available. Make sure it is properly installed and initialized.');
  }
  

