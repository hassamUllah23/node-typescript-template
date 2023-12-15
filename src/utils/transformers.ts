import { capitalize, escapeRegExp } from "lodash";

class StringTransformer {
  value: string;
  constructor(input: string) {
    this.value = input;
  }

  trimmer() {
    this.value = this.value?.trim();
    return this;
  }
  removePunctuation() {
    this.value = this.value?.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, "");
    return this;
  }

  capitalize() {
    this.value = capitalize(this.value);
    return this;
  }

  toLower() {
    this.value = this.value?.toLowerCase();
    return this;
  }

  splitAndJoin(splitter: string, joiner: string) {
    this.value = this.value?.split(splitter).join(joiner);
    return this;
  }

  removeAllWhiteSpaces() {
    this.value = this.value?.replace(/\s+/g, "");
    return this;
  }

  removeCharacter(character: string) {
    this.value = this.value?.replace(character, "");
    return this;
  }

  removeUnnecessaryWhitespaces() {
    this.value = this.value?.replace(/\s+/g, " ").trim();
    return this;
  }

  replaceAllOccurrences(searchString: string, replacementString: string) {
    this.value = this.value?.replace(
      new RegExp(escapeRegExp(searchString), "g"),
      replacementString,
    );
    return this;
  }
}

export { StringTransformer };
