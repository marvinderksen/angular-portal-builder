export class NoSuitableRegistration extends Error {
  constructor(m: string) {
    super(m);
    Object.setPrototypeOf(this, NoSuitableRegistration.prototype);
  }
}
