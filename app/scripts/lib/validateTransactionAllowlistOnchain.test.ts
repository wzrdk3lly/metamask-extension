import { ValidateTransactionAllowlistOnchain } from "./validateTransactionAllowlistOnchain";

describe('validation transaction allowlist onchain', () => {
  describe('formalize hostname', () => {
    it('should strip the url protocol', () => {
      const formatted = ValidateTransactionAllowlistOnchain.formalizeDomain("https://metamask.io/");
      expect(formatted).toStrictEqual("metamask.io");
    });

    it('should strip the port number', () => {
      const formatted = ValidateTransactionAllowlistOnchain.formalizeDomain("https://metamask.io:8000");
      expect(formatted).toStrictEqual("metamask.io");
    });

    it('should return subdomains', () => {
      const formatted = ValidateTransactionAllowlistOnchain.formalizeDomain("https://test.metamask.io:8000");
      expect(formatted).toStrictEqual("test.metamask.io");
    });
  });
});