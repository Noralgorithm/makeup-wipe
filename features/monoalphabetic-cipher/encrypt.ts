import { ALPHABET } from "./constants";

export function encrypt(message: string, key: string) {
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
