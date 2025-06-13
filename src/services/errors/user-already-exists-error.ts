export class UserAlreayExistsError extends Error {
  constructor() {
    super('Email already exists!')
  }
}
