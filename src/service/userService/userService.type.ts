interface IUserService {
  register: (data: any) => void | Promise<void>;
}

export { IUserService };
