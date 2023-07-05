// with thanks to Tomas http://ideasintosoftware.com/exhaustive-switch-in-typescript/
export class UnreachableCaseError extends Error {
  constructor(val: never) {
    super(`Unreachable case: ${val}`);
  }
}
