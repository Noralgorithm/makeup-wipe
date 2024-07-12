import { ALPHABET } from "./constants";
import { decrypt } from "./decrypt";

export function bruteForceDecrypt(encryptedMessage: string, stopWord: string) {
  stopWord = stopWord.toUpperCase();

  const messageWords = encryptedMessage.toUpperCase().split(" ");

  const candidateWords = messageWords.filter(
    (word) => word.length === stopWord.length
  );

  for (const perm of permutationsGenerator(ALPHABET)) {
    for (const word of candidateWords) {
      const decryptedWord = decrypt(word, perm);

      console.log({
        [perm]: {
          encrypted: encryptedMessage,
          decrypted: decrypt(encryptedMessage, perm),
        },
      });

      if (decryptedWord === stopWord) {
        console.table({
          [perm]: {
            encrypted: encryptedMessage,
            decrypted: decrypt(encryptedMessage, perm),
          },
        });
        return { key: perm, message: decrypt(encryptedMessage, perm) };
      }
    }
  }
}

function* permutationsGenerator(str: string): Generator<string> {
  if (str.length <= 1) {
    yield str;
  } else {
    const chars = str.split("");
    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];
      const remainingChars = chars.slice(0, i).concat(chars.slice(i + 1));
      for (const perm of permutationsGenerator(remainingChars.join(""))) {
        yield char + perm;
      }
    }
  }
}
