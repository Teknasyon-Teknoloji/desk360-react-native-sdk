/**
 * Custom Exception
 */
export default class Desk360Exception extends Error {
  constructor(error, meta) {
    super(error.message);

    this.code = error.code;

    if (meta) {
      this.meta = meta;
    }
  }
}
