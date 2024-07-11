import { ALPHABET } from "./constants";

export function validateKey(key: string) {
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
