/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  PriceOracle,
  PriceOracleInterface,
} from "../contracts/PriceOracle";

const _abi = [
  {
    inputs: [
      {
        internalType: "int256",
        name: "_answer",
        type: "int256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "description",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "getAnswer",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint80",
        name: "_roundId",
        type: "uint80",
      },
    ],
    name: "getRoundData",
    outputs: [
      {
        internalType: "uint80",
        name: "roundId",
        type: "uint80",
      },
      {
        internalType: "int256",
        name: "answer",
        type: "int256",
      },
      {
        internalType: "uint256",
        name: "startedAt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "updatedAt",
        type: "uint256",
      },
      {
        internalType: "uint80",
        name: "answeredInRound",
        type: "uint80",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "getTimestamp",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "latestAnswer",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "latestRound",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "latestRoundData",
    outputs: [
      {
        internalType: "uint80",
        name: "roundId",
        type: "uint80",
      },
      {
        internalType: "int256",
        name: "answer",
        type: "int256",
      },
      {
        internalType: "uint256",
        name: "startedAt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "updatedAt",
        type: "uint256",
      },
      {
        internalType: "uint80",
        name: "answeredInRound",
        type: "uint80",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "latestTimestamp",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "int256",
        name: "_answer",
        type: "int256",
      },
    ],
    name: "updateAnswer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161076338038061076383398101604081905261002f91610168565b6100383361005a565b6000805460ff60a01b1916600160a31b179055610054816100aa565b506101a8565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6100b2610108565b600181905542600255600380549060006100cb83610181565b9091555050600380546000908152600460209081526040808320949094558254825260058152838220429081905592548252600690529190912055565b6000546001600160a01b031633146101665760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640160405180910390fd5b565b60006020828403121561017a57600080fd5b5051919050565b6000600182016101a157634e487b7160e01b600052601160045260246000fd5b5060010190565b6105ac806101b76000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c80638da5cb5b1161008c578063b5ab58dc11610066578063b5ab58dc1461022c578063b633620c1461024c578063f2fde38b1461026c578063feaf968c1461027f57600080fd5b80638da5cb5b146101805780639a6fc8f51461019b578063a87a20ce1461021957600080fd5b8063668a0f02116100c8578063668a0f021461014a578063715018a6146101535780637284e4161461015d5780638205bf6a1461017757600080fd5b8063313ce567146100ef57806350d25bcd1461012b57806354fd4d5014610142575b600080fd5b6000546101149074010000000000000000000000000000000000000000900460ff1681565b60405160ff90911681526020015b60405180910390f35b61013460015481565b604051908152602001610122565b610134600081565b61013460035481565b61015b6102aa565b005b604080516020810182526000815290516101229190610473565b61013460025481565b6000546040516001600160a01b039091168152602001610122565b6101e26101a93660046104c1565b69ffffffffffffffffffff8116600090815260046020908152604080832054600683528184205460059093529220549293919290918490565b6040805169ffffffffffffffffffff968716815260208101959095528401929092526060830152909116608082015260a001610122565b61015b6102273660046104f4565b6102be565b61013461023a3660046104f4565b60046020526000908152604090205481565b61013461025a3660046104f4565b60056020526000908152604090205481565b61015b61027a36600461050d565b61031c565b60035460008181526004602090815260408083205460068352818420546005909352922054836101e2565b6102b26103b1565b6102bc600061040b565b565b6102c66103b1565b600181905542600255600380549060006102df83610536565b9091555050600380546000908152600460209081526040808320949094558254825260058152838220429081905592548252600690529190912055565b6103246103b1565b6001600160a01b0381166103a55760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f646472657373000000000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b6103ae8161040b565b50565b6000546001600160a01b031633146102bc5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161039c565b600080546001600160a01b038381167fffffffffffffffffffffffff0000000000000000000000000000000000000000831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b600060208083528351808285015260005b818110156104a057858101830151858201604001528201610484565b506000604082860101526040601f19601f8301168501019250505092915050565b6000602082840312156104d357600080fd5b813569ffffffffffffffffffff811681146104ed57600080fd5b9392505050565b60006020828403121561050657600080fd5b5035919050565b60006020828403121561051f57600080fd5b81356001600160a01b03811681146104ed57600080fd5b60006001820161056f577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b506001019056fea26469706673582212200be6ca6cabfc0109787f0193d4b95a28da8260eae0202db29769264619f15f9d64736f6c63430008110033";

type PriceOracleConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PriceOracleConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PriceOracle__factory extends ContractFactory {
  constructor(...args: PriceOracleConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _answer: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<PriceOracle> {
    return super.deploy(_answer, overrides || {}) as Promise<PriceOracle>;
  }
  override getDeployTransaction(
    _answer: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_answer, overrides || {});
  }
  override attach(address: string): PriceOracle {
    return super.attach(address) as PriceOracle;
  }
  override connect(signer: Signer): PriceOracle__factory {
    return super.connect(signer) as PriceOracle__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PriceOracleInterface {
    return new utils.Interface(_abi) as PriceOracleInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PriceOracle {
    return new Contract(address, _abi, signerOrProvider) as PriceOracle;
  }
}
