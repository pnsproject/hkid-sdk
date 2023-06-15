import { ethers, Signer, BigNumber } from "ethers";
import { keccak_256 } from "js-sha3";

import { Provider as AbstractWeb3Provider } from "@ethersproject/abstract-provider";
import { Signer as Web3Signer } from "@ethersproject/abstract-signer";

import { 
IResolver,
NameController,
NameRegistry,
 } from "./contracts";

import { 
IResolver__factory,
NameController__factory,
NameRegistry__factory,
 } from "./factories";

export type HexAddress = string;
export type TokenId = string;
export type DomainString = string;
export type LabelString = string;

export const CONTRACT_ADDRS = {
  oracle: "0x0f64B1e2B2776071121436771AC64701870F9C8c",
  registry: "0x6248cF19321a354a970b99e811C979A18b4e6446",
  controller: "0xc13cA34ed99CA845001798aEeDd868A30D839D7a",
}

declare abstract class Web3Provider extends AbstractWeb3Provider {
  abstract getSigner(): Promise<Web3Signer>;
}

export function sha3(data: string) {
  return "0x" + keccak_256(data);
}

export function getNamehash(name: string) {
  let node = "0000000000000000000000000000000000000000000000000000000000000000";

  if (name) {
    let labels = name.split(".");

    for (let i = labels.length - 1; i >= 0; i--) {
      let labelSha = keccak_256(labels[i]);
      node = keccak_256(Buffer.from(node + labelSha, "hex"));
    }
  }

  return "0x" + node;
}

export function toChecksumAddress(address: string): string {
  address = address.toLowerCase().replace("0x", "");
  const hash = keccak_256(address);
  let ret = "0x";
  for (let i = 0; i < address.length; i++) {
    if (parseInt(hash[i], 16) > 7) {
      ret += address[i].toUpperCase();
    } else {
      ret += address[i];
    }
  }

  return ret;
}

export function suffixTld(label: DomainString): DomainString {
  return label.replace(".hk", "") + ".hk";
}

export function removeTld(label: DomainString): DomainString {
  return label.replace(".hk", "");
}

export const emptyAddress = "0x0000000000000000000000000000000000000000";
export const weirdNode = "0x0000000000000000000000000000000000000000000000000000000000000001";
export const emptyNode = "0x0000000000000000000000000000000000000000000000000000000000000000";
export const baseLabel = sha3("hk");
export const baseNode = getNamehash("hk");
export const altBaseLabel = sha3("com");
export const altBaseNode = getNamehash("com");
export const nonode = "0x0000000000000000000000000000000000000000000000000000000000001234";

export const keylist = [
  "eth",
  "btc",
  "dot",
  "nft",
  "ipv4",
  "ipv6",
  "nostr",
  "cname",
  "contenthash",
  "profile.email",
  "profile.url",
  "profile.avatar",
  "profile.description",
  "social.twitter",
  "social.github",
];

export function setupNameRegistry(registryAddress: any, controllerAddress: any, provider: Web3Signer): {
	resolver: IResolver,
	registry: NameRegistry,
	controller: NameController
} {
  let resolver = NameRegistry__factory.connect(registryAddress, provider);
  let registry = NameRegistry__factory.connect(registryAddress, provider);
  let controller = NameController__factory.connect(controllerAddress, provider);

  return { registry, resolver, controller }
}

export async function getFee(controller: any, name: string, duration: number) {
  return controller.registerPrice(name, duration);
}

export async function nameRegister(controller: any, name: string, addr: HexAddress, duration: number) {
  let fee = await getFee(controller, name, duration)
  return controller.nameRegister(name, addr, duration, { value: fee });
}

export async function nameRegisterExtended(controller: any, name: string, addr: HexAddress, duration: number, setReverse: number, keys: Array<string>, values: Array<string>) {
  let fee = await getFee(controller, name, duration)
  let keyhashes = keys.map(key => sha3(key))
  return controller.nameRegisterExtended(name, addr, duration, setReverse, keyhashes, values, { value: fee });
}

export async function nameRegisterByManager(controller: any, name: string, addr: HexAddress, duration: number, setReverse: number, keys: Array<string>, values: Array<string>) {
  let keyhashes = keys.map(key => sha3(key))
  return controller.nameRegisterByManager(name, addr, duration, setReverse, keyhashes, values);
}

export function ownerOfId(registry: any, tokenId: TokenId) {
  return registry.ownerOf(tokenId);
}

export function ownerOfName(registry: any, name: DomainString) {
  let tokenId = getNamehash(name);
  return registry.ownerOf(tokenId);
}

export function exists(registry: any, name: DomainString): Promise<boolean> {
  let tokenId = getNamehash(name);
  return registry.exists(tokenId);
}

export async function getOwner(registry: any, name: DomainString) {
  let tokenId = getNamehash(name);
  if (await registry.exists(tokenId)) {
    return registry.ownerOf(tokenId);
  } else {
    return emptyAddress;
  }
}

export async function registerPrice(controller: any, name: LabelString, duration: number): Promise<BigNumber> {
  return controller.registerPrice(name, duration);
}

export async function renewPrice(controller: any, name: LabelString, duration: number): Promise<BigNumber> {
  return controller.renewPrice(name, duration);
}

export async function basePrice(controller: any, name: LabelString): Promise<BigNumber> {
  return controller.basePrice(name);
}

export async function rentPrice(controller: any, name: LabelString, duration: number): Promise<BigNumber> {
  return controller.rentPrice(name, duration);
}

export async function getPrices(controller: any) {
  return controller.getPrices();
}

export async function getTokenPrice(controller: any) {
  return controller.getTokenPrice();
}

export async function expire(registry: any, name: DomainString) {
  name = suffixTld(name);
  return registry.expire(getNamehash(name));
}

export async function available(registry: any, name: DomainString) {
  name = suffixTld(name);
  return registry.available(getNamehash(name));
}

export async function parent(registry: any, name: DomainString) {
  name = suffixTld(name);
  return registry.parent(getNamehash(name));
}

export async function origin(registry: any, name: DomainString) {
  name = suffixTld(name);
  return registry.origin(getNamehash(name));
}

export async function mintSubdomain(registry: any, newOwner: HexAddress, name: DomainString, label: LabelString) {
  let tokenId = getNamehash(name);
  return registry.mintSubdomain(newOwner, tokenId, label);
}

export async function setName(resolver: any, addr: HexAddress, name: DomainString) {
  const tokenId = getNamehash(name);
  return resolver.setName(addr, tokenId);
}

export async function getName(resolver: any, addr: HexAddress): Promise<BigNumber> {
  return resolver.getName(addr);
}

export async function setNftName(resolver: any, nftAddr: HexAddress, nftTokenId: string, nameTokenId: TokenId) {
  return resolver.setNftName(nftAddr, nftTokenId, nameTokenId);
}

export async function getNftName(resolver: any, nftAddr: HexAddress, nftTokenId: string) {
  return resolver.getNftName(nftAddr, nftTokenId);
}

export async function approve(registry: any, name: DomainString, approved: HexAddress) {
  name = suffixTld(name);
  let tokenId = getNamehash(name);
  return registry.approve(approved, tokenId);
}

export async function getApproved(registry: any, name: DomainString): Promise<HexAddress> {
  name = suffixTld(name);
  let tokenId = getNamehash(name);
  return registry.getApproved(tokenId);
}

export async function getKey(resolver: any, name: DomainString, key: string): Promise<string> {
  const tokenId = getNamehash(name);
  return resolver.get(key, tokenId);
}

export async function setKeysByHash(resolver: any, name: DomainString, keys: string[], values: string[]) {
  const tokenId = getNamehash(name);
  return resolver.setManyByHash(keys, values, tokenId);
}

export async function getKeys(resolver: any, name: DomainString, key: string[], resv?: IResolver): Promise<string[]> {
  const tokenId = getNamehash(name);
  return resolver.getMany(key, tokenId);
}

export async function getKeysByHash(resolver: any, name: DomainString, key: string[], resv?: IResolver) {
  const tokenId: TokenId = getNamehash(name);
  return resolver.getManyByHash(key as any, tokenId);
}

export async function renew(controller: any, label: LabelString, duration: number) {
  const price = await renewPrice(controller, label, duration);
  return controller.renew(label, duration, { value: price });
}

export async function renewByManager(controller: any, label: LabelString, duration: number) {
  return controller.renewByManager(label, duration);
}

export async function transferName(registry: any, name: DomainString, newOwner: HexAddress) {
  let namehash = getNamehash(name);
  let oldOwner = await getOwner(registry, name);
  return registry.transferFrom(oldOwner, newOwner, namehash);
}

export async function burn(registry: any, name: string) {
  let tokenId = getNamehash(name);
  return registry.burn(tokenId);
}
