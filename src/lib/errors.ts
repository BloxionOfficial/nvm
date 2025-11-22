// src/lib/errors.ts
export class NovumError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NovumError";
  }
}