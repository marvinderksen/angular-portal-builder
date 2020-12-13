export class InvalidOperation extends Error {
  constructor(m: string) {
    super(m);
    Object.setPrototypeOf(this, InvalidOperation.prototype);
  }
}
