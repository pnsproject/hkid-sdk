import { ethers } from "hardhat";
import { Signer, BigNumber } from "ethers";
import { keccak_256 } from "js-sha3";

import {
  sha3,
  getNamehash,
  keylist,
  setupNameRegistry,
  nameRegister,
  nameRegisterExtended,
  nameRegisterByManager,
  ownerOfId,
  ownerOfName,
  exists,
  getOwner,
  registerPrice,
  renewPrice,
  basePrice,
  rentPrice,
  getPrices,
  getTokenPrice,
  expire,
  available,
  parent,
  origin,
  mintSubdomain,
  setName,
  getName,
  setNftName,
  getNftName,
  approve,
  getApproved,
  getKey,
  setKeysByHash,
  getKeys,
  getKeysByHash,
  renew,
  renewByManager,
  transferName,
  burn,
 } from "./HKNameRegistrySDK"


let basePrices: any = [50, 50, 50, 5, 5, 5];
let rentPrices: any = [5];

export const emptyAddress = "0x0000000000000000000000000000000000000000";
export const weirdNode = "0x0000000000000000000000000000000000000000000000000000000000000001";
export const emptyNode = "0x0000000000000000000000000000000000000000000000000000000000000000";
export const baseLabel = sha3("hk");
export const baseNode = getNamehash("hk");

let oneyear = 86400 * 365;
let tokenId = getNamehash("hongkong.hk");
let subTokenId = getNamehash("my.hongkong.hk");

import { expect } from "chai";
import { upgrades } from "hardhat";

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

function getFee(controller: any, name: string) {
  return controller.registerPrice(name, oneyear);
}

async function registerName(controller: any, name?: string, address?: string) {
  name = name || "ethereum";
  address = address;
  let fee = await getFee(controller, name);
  return controller.nameRegister(name, address, oneyear, {
    value: fee,
  });
}

async function getExpire(registry: any, tokenId: any) {
  return registry.expire(tokenId);
}

async function getNameRecord(registry: any, tokenId: string) {
  let origin = await registry.origin(tokenId);
  let expire = await registry.expire(tokenId);
  return { origin, expire };
}

async function main() {

      let one: Signer, two: Signer;
      let oneAddr: string, twoAddr;

      one = new ethers.Wallet(process.env.ONE_PRVKEY, ethers.provider)
      two = new ethers.Wallet(process.env.TWO_PRVKEY, ethers.provider)

      oneAddr = await one.getAddress()
      twoAddr = await two.getAddress()
      console.log(oneAddr)
      console.log(twoAddr)
      // [oneAddr, twoAddr] = await Promise.all([one, two].map((s) => s.getAddress()));

      let registry: any
      let controller: any
      let resolver: IResolver

      ({ registry, resolver, controller } = setupNameRegistry(process.env.REGISTRY_ADDR, process.env.CONTROLLER_ADDR, one))

      console.log(await registry.exists(tokenId))
      await nameRegister(controller, "hongkong5", oneAddr, oneyear)
      await nameRegisterExtended(controller, "hongkong1", oneAddr, oneyear, 1, ["profile.email"], ["user@example.com"])
      await nameRegisterByManager(controller, "hongkong2", oneAddr, oneyear, 1, ["profile.email"], ["user@example.com"])
      console.log(await registry.exists(tokenId))

      console.log("ownerOfId", await ownerOfId(registry, tokenId))
      console.log("ownerOfName", await ownerOfName(registry, "hongkong.hk"))
      console.log("exists", await exists(registry, "hongkong.hk"))
      console.log("getOwner", await getOwner(registry, "hongkong.hk"))
      console.log("registerPrice", await registerPrice(controller, "hongkong", oneyear))
      console.log("renewPrice", await renewPrice(controller, "hongkong", oneyear))
      console.log("basePrice", await basePrice(controller, "hongkong"))
      console.log("rentPrice", await rentPrice(controller, "hongkong", oneyear))
      console.log("getPrices", await getPrices(controller))
      console.log("getTokenPrice", await getTokenPrice(controller))

      console.log("expire", await expire(registry, "hongkong.hk"))
      console.log("available", await available(registry, "hongkong.hk"))
      console.log("parent", await parent(registry, "hongkong.hk"))
      console.log("origin", await origin(registry, "hongkong.hk"))
      // await mintSubdomain(registry, twoAddr, "hongkong.hk", "sub0")

      await setName(resolver, oneAddr, "hongkong.hk")
      console.log(await getName(resolver, oneAddr))
      await setNftName(resolver, registry.address, tokenId, getNamehash("sub0.hongkong.hk"))
      console.log(await getNftName(resolver, registry.address, tokenId))

      await approve(registry, "hongkong1.hk", twoAddr)
      console.log("getApproved", await getApproved(registry, "hongkong1.hk"))

      await getKey(resolver, "hongkong1.hk", "profile.email")
      await setKeysByHash(resolver, "hongkong1.hk", [sha3("profile.email")], ["newuser@example.com"])
      await getKeys(resolver, "hongkong1.hk", ["profile.email"])
      await getKeysByHash(resolver, "hongkong1.hk", [sha3("profile.email")])

      await renew(controller, "hongkong1", oneyear)
      await renewByManager(controller, "hongkong2", oneyear)
      await transferName(registry, "hongkong2.hk", threeAddr)
      await burn(registry, "hongkong1.hk")

}

main()

