const metadata = {
	"compiler": {
		"version": "0.8.29+commit.ab55807c"
	},
	"language": "Solidity",
	"output": {
		"abi": [
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "bytes32",
						"name": "appId",
						"type": "bytes32"
					},
					{
						"indexed": true,
						"internalType": "address",
						"name": "applicant",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "string",
						"name": "jobId",
						"type": "string"
					},
					{
						"indexed": false,
						"internalType": "string",
						"name": "metadataURI",
						"type": "string"
					}
				],
				"name": "ApplicationSubmitted",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "bytes32",
						"name": "appId",
						"type": "bytes32"
					},
					{
						"indexed": true,
						"internalType": "address",
						"name": "recruiter",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					}
				],
				"name": "ApplicationViewed",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "address",
						"name": "user",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"indexed": false,
						"internalType": "string",
						"name": "reason",
						"type": "string"
					}
				],
				"name": "LineaTokensAwarded",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "bytes32",
						"name": "appId",
						"type": "bytes32"
					},
					{
						"indexed": false,
						"internalType": "enum Ghosted.ApplicationStatus",
						"name": "newStatus",
						"type": "uint8"
					}
				],
				"name": "StatusUpdated",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "address",
						"name": "user",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"indexed": false,
						"internalType": "enum Ghosted.UserType",
						"name": "userType",
						"type": "uint8"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					}
				],
				"name": "UserOnboarded",
				"type": "event"
			},
			{
				"inputs": [
					{
						"internalType": "bytes32",
						"name": "",
						"type": "bytes32"
					}
				],
				"name": "applications",
				"outputs": [
					{
						"internalType": "address",
						"name": "applicant",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "jobId",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "metadataURI",
						"type": "string"
					},
					{
						"internalType": "enum Ghosted.ApplicationStatus",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "address",
						"name": "recruiter",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "bytes32",
						"name": "_appId",
						"type": "bytes32"
					}
				],
				"name": "getApplication",
				"outputs": [
					{
						"components": [
							{
								"internalType": "address",
								"name": "applicant",
								"type": "address"
							},
							{
								"internalType": "string",
								"name": "jobId",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "metadataURI",
								"type": "string"
							},
							{
								"internalType": "enum Ghosted.ApplicationStatus",
								"name": "status",
								"type": "uint8"
							},
							{
								"internalType": "address",
								"name": "recruiter",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "timestamp",
								"type": "uint256"
							}
						],
						"internalType": "struct Ghosted.Application",
						"name": "",
						"type": "tuple"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "_user",
						"type": "address"
					}
				],
				"name": "getUserProfile",
				"outputs": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "message",
						"type": "string"
					},
					{
						"internalType": "enum Ghosted.UserType",
						"name": "userType",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "lineaTokenBalance",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isOnboarded",
						"type": "bool"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "string",
						"name": "_name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "_email",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "_message",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "_shareEmail",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "_shareName",
						"type": "bool"
					},
					{
						"internalType": "enum Ghosted.UserType",
						"name": "_userType",
						"type": "uint8"
					}
				],
				"name": "onboardUser",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "bytes32",
						"name": "_appId",
						"type": "bytes32"
					}
				],
				"name": "recordView",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "string",
						"name": "_jobId",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "_metadataURI",
						"type": "string"
					}
				],
				"name": "submitApplication",
				"outputs": [
					{
						"internalType": "bytes32",
						"name": "",
						"type": "bytes32"
					}
				],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "bytes32",
						"name": "_appId",
						"type": "bytes32"
					},
					{
						"internalType": "enum Ghosted.ApplicationStatus",
						"name": "_newStatus",
						"type": "uint8"
					}
				],
				"name": "updateStatus",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "",
						"type": "address"
					}
				],
				"name": "userProfiles",
				"outputs": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "message",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "shareEmail",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "shareName",
						"type": "bool"
					},
					{
						"internalType": "enum Ghosted.UserType",
						"name": "userType",
						"type": "uint8"
					},
					{
						"internalType": "bool",
						"name": "isOnboarded",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "onboardingTimestamp",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "lineaTokenBalance",
						"type": "uint256"
					}
				],
				"stateMutability": "view",
				"type": "function"
			}
		],
		"devdoc": {
			"kind": "dev",
			"methods": {
				"getUserProfile(address)": {
					"params": {
						"_user": "Address of the user to fetch"
					}
				},
				"onboardUser(string,string,string,bool,bool,uint8)": {
					"params": {
						"_email": "User's email (can be empty if shareEmail is false)",
						"_message": "User's onboarding message",
						"_name": "User's name (can be empty if shareName is false)",
						"_shareEmail": "Whether to share email publicly",
						"_shareName": "Whether to share name publicly",
						"_userType": "Type of user (Applicant or Recruiter)"
					}
				}
			},
			"version": 1
		},
		"userdoc": {
			"kind": "user",
			"methods": {
				"getApplication(bytes32)": {
					"notice": "Fetch application details"
				},
				"getUserProfile(address)": {
					"notice": "Get user profile (only shared fields if not own profile)"
				},
				"onboardUser(string,string,string,bool,bool,uint8)": {
					"notice": "Onboard a new user to the platform"
				},
				"recordView(bytes32)": {
					"notice": "Record recruiter view on an application"
				},
				"submitApplication(string,string)": {
					"notice": "Submit a job application"
				},
				"updateStatus(bytes32,uint8)": {
					"notice": "Update application status (Recruiters only)"
				}
			},
			"version": 1
		}
	},
	"settings": {
		"compilationTarget": {
			"contracts/Ghosted.sol": "Ghosted"
		},
		"evmVersion": "paris",
		"libraries": {},
		"metadata": {
			"bytecodeHash": "ipfs"
		},
		"optimizer": {
			"enabled": false,
			"runs": 200
		},
		"remappings": []
	},
	"sources": {
		"contracts/Ghosted.sol": {
			"keccak256": "0x5a5957c95e2f33865871d306cda872d194153bdb7442f1f6021abc648eb5b3d7",
			"license": "MIT",
			"urls": [
				"bzz-raw://6d2016ce11612731f14c126be28fe6eee0d98344320aad5ef6f6cbae7d6fe76a",
				"dweb:/ipfs/QmURFmKSYXZVLo77HnPUDcXivD4EVyk4ZwWXtYFhd8VW67"
			]
		}
	},
	"version": 1
}

export default metadata.output.abi