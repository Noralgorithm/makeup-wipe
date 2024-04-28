import { Command } from "commander";
import { ALPHABET } from "./constants";

const program = new Command();

program
  .name("makeup-wipe")
  .description("CLI to encrypt and decrypt messages")
  .version("0.1.0");

program
  .command("encrypt")
  .description("Encrypt a message using substitution cipher")
  .argument("<message>", "message to encrypt")
  .argument(
    "<key>",
    "key to use for encryption (example key: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ')"
  )
  .action((message, key) => {
    validateKey(key);
    console.log(encrypt(message, key));
    console.log(`used-key: ${key}`);
  });

program
  .command("decrypt")
  .description("Decrypt a message using substitution cipher")
  .argument("<message>", "message to decrypt")
  .argument(
    "<key>",
    "key to use for decryption (example key: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ')"
  )
  .action((message, key) => {
    validateKey(key);
    console.log(decrypt(message, key));
    console.log(`used-key: ${key}`);
  });

program.parse();

function encrypt(message: string, key: string) {
  const encryptedMessage = message
    .split("")
    .map((char) => {
      const index = ALPHABET.indexOf(char.toUpperCase());
      if (index === -1) {
        return char;
      }
      return key[index];
    })
    .join("");
  return encryptedMessage;
}

function decrypt(message: string, key: string) {
  const decryptedMessage = message
    .split("")
    .map((char) => {
      const index = key.indexOf(char.toUpperCase());
      if (index === -1) {
        return char;
      }
      return ALPHABET[index];
    })
    .join("");
  return decryptedMessage;
}

function validateKey(key: string) {
  if (key.length !== ALPHABET.length) {
    throw new Error(
      `Key must be ${ALPHABET.length} characters long, got ${key.length}`
    );
  }
  if (key.split("").some((char) => ALPHABET.indexOf(char) === -1)) {
    throw new Error("Key must contain only characters from the alphabet");
  }
  if (new Set(key).size !== key.length) {
    throw new Error("Key must not contain duplicate characters");
  }
  return key;
}
