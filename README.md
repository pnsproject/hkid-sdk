## HKID JavaScript SDK

Javascript SDK for HKID project

## install dependencies:

 * yarn

## API

#### `namehash(name: string)`

return the EIP-137 namehash of a domain

#### `export function setupNameRegistry(registryAddress: any, controllerAddress: any, provider: Web3Signer)`

setup contract instance with addresses

#### `export async function getFee(controller: any, name: string, duration: number)`

get registration fee

#### `export async function nameRegister(controller: any, name: string, addr: HexAddress, duration: number)`

register domain name

#### `export async function nameRegisterExtended(controller: any, name: string, addr: HexAddress, duration: number, setDefault: number, keys: Array<string>, values: Array<string>)`

register domain name with extended information, like keys, values, set default domain

#### `export async function nameRegisterByManager(controller: any, name: string, addr: HexAddress, duration: number, setDefault: number, keys: Array<string>, values: Array<string>)`

register domain name with extended information by manager, without fee

#### `export function ownerOfId(registry: any, tokenId: TokenId)`

get owner address of domain tokenId(namehash)

#### `export function ownerOfName(registry: any, name: DomainString)`

get owner address of domain name, like `ethereum.hk`

#### `export function exists(registry: any, name: DomainString): Promise<boolean>`

check if domain name exists

#### `export async function getOwner(registry: any, name: DomainString)`

get domain name owner

#### `export async function registerPrice(controller: any, name: LabelString, duration: number): Promise<BigNumber>`

get register price for domain name

#### `export async function renewPrice(controller: any, name: LabelString, duration: number): Promise<BigNumber>`

get renew price for domain name

#### `export async function getPrices(controller: any)`

get system price configurations

#### `export async function getTokenPrice(controller: any)`

get system token price

#### `export async function expire(registry: any, name: DomainString)`

get domain expire time

#### `export async function available(registry: any, name: DomainString)`

check domain name availability

#### `export async function parent(registry: any, name: DomainString)`

get domain parent id

#### `export async function origin(registry: any, name: DomainString)`

get domain top-level ancestor id

#### `export async function mintSubdomain(registry: any, newOwner: HexAddress, name: DomainString, label: LabelString)`

mint subdomain

#### `export async function setName(resolver: any, addr: HexAddress, name: DomainString)`

set the default name for address

#### `export async function getName(resolver: any, addr: HexAddress): Promise<BigNumber>`

get the default name for address

#### `export async function setNftName(resolver: any, nftAddr: HexAddress, nftTokenId: string, nameTokenId: TokenId)`

set the default name for NFT token

#### `export async function getNftName(resolver: any, nftAddr: HexAddress, nftTokenId: string)`

get the default name for NFT token

#### `export async function approve(registry: any, name: DomainString, approved: HexAddress)`

allow other wallet to use the domain

#### `export async function getApproved(registry: any, name: DomainString): Promise<HexAddress>`

get the approved third-party wallet that can use the domain

#### `export async function getKey(resolver: any, name: DomainString, key: string): Promise<string>`

get resolution record for the key

#### `export async function setKeysByHash(resolver: any, name: DomainString, keys: string[], values: string[])`

get resolution record for the keyhash

#### `export async function getKeys(resolver: any, name: DomainString, key: string[], resv?: IResolver): Promise<string[]>`

get batch resolution records for keys

#### `export async function getKeysByHash(resolver: any, name: DomainString, key: string[], resv?: IResolver)`

get batch resolution records for keyhashes

#### `export async function renew(controller: any, label: LabelString, duration: number)`

renew domain

#### `export async function renewByManager(controller: any, label: LabelString, duration: number)`

renew domain by manager, without fee

#### `export async function transferName(registry: any, name: DomainString, newOwner: HexAddress)`

transfer domain ownership

#### `export async function burn(registry: any, name: string)`

burn domain

