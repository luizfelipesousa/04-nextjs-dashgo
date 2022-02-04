export default class AuthTokenError extends Error {
  constructor() {
    super("Authentication token error");
  }
}
