interface IUserRepository {
  create: (data: any) => Promise<void>;
}

export { IUserRepository };
