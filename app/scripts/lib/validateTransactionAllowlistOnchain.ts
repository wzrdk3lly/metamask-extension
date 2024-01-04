/**
 * This is a utilitiy file that will validate transaction calldata
 * against an onchain allowlist.
 *
 * Step 1: See if the domain that proposed the tx has an allowlist configuration
 * Step 2: If yes, check the tx calldata and to field against the allowlist
 * Step 3: If not valid, show warning
 *
 * Proposal: https://docs.google.com/document/d/1jUVlXbxHEK1AIP9cgPj_0zP4v_A6eY2HtAk401sBL9I/
 * @returns
 */

import { Contract } from '@ethersproject/contracts';

type Address = string;
enum ErrorCode {
  NO_TARGET_ADDR,
  NO_CALLDATA,
  INVALID_TX
}

export class ValidateTransactionAllowlistOnchain {

  static abi: string[] = [
      "function validateCalldataByOrigin(string memory originName, address targetAddress, bytes calldata data) public view returns (bool)",
      "function allowlistAddressByOriginName(string originName) public view returns (address)"
  ]

  // @todo: This is Yearns registry contract without the timelock. We need to deploy our one.
  static registryContractAddress: Address = "0xb39c4EF6c7602f1888E3f3347f63F26c158c0336";
  static nullAddress: Address = "0x0000000000000000000000000000000000000000";

  #getMainnetRpcProvider() {
    //TODO: Grab the value from storage
    return "https://mainnet.infura.io/v3/0a4455c110734b719d213a2fd1e5667e"
  }

  /**
   *
   * @param   domain  string      The hostname of the dapp prompting a transaction
   * @returns         boolean     True if the hostname has configured and registered an allowlist
   */
  async domainHasAllowList(domain: string): Promise<Boolean> {
    const ethContract = await new Contract(
      ValidateTransactionAllowlistOnchain.registryContractAddress,
      ValidateTransactionAllowlistOnchain.abi,
      //new Web3Provider(provider),
    );

    const owner = await ethContract.allowlistAddressByOriginName(domain);
    return (owner != ValidateTransactionAllowlistOnchain.nullAddress);
  }

  /**
   * Validates calldata and target address (to) for a transaction against an origins
   * allowlist.
   *
   * @param     originName
   * @param     targetAddress
   * @param     callData
   * @returns
   */
  async txIsValid(originName: string, targetAddress: Address, callData: string): Promise<{ success: boolean, error?: ErrorCode}> {

    if(!targetAddress) {
      return {
        success: false,
        error: ErrorCode.NO_TARGET_ADDR
      }
    }

    if(!callData) {
      return {
        success: false,
        error: ErrorCode.NO_CALLDATA
      }
    }

    const ethContract = await new Contract(
      ValidateTransactionAllowlistOnchain.registryContractAddress,
      ValidateTransactionAllowlistOnchain.abi,
      //new Web3Provider(provider),
    );

    const valid = await ethContract.validateCalldataByOrigin(originName, targetAddress, callData);
    if(!valid) {
      return {
        success: false,
        error: ErrorCode.INVALID_TX
      }
    }

    return {
      success: true
    };
  }

}