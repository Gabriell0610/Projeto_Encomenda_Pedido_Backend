class InternalServerException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InternalServerException";
  }
}

export { InternalServerException };
