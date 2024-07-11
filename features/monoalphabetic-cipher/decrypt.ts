import { ALPHABET } from "./constants";

export function decrypt(message: string, key: string) {
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
