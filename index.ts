import { Command } from "commander";

import { validateKey } from "./features/monoalphabetic-cipher/utils";
import { encrypt } from "./features/monoalphabetic-cipher/encrypt";
import { decrypt } from "./features/monoalphabetic-cipher/decrypt";

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
