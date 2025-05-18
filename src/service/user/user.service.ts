import { IUserService } from "./IUserService.type";
import { IUserRepository } from "../../repository/interfaces";
import { BadRequestException } from "../../shared/error/exceptions/bad-request-exception";
import { UpdateUserDto } from "@/domain/dto/user/UpdateUserDto";
import { AddressDto, AddressUpdateDto } from "@/domain/dto/address/AddressDto";

class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}

  list = async () => {
    const res = this.userRepository.list();
    return res;
  };

  listUserById = async (id: string) => {
    const res = await this.userRepository.findUserById(id);
    return res;
  };

  updateUser = async (dto: UpdateUserDto, userId: string, userEmail: string) => {
    const userExist = await this.listUserById(userId);

    if (!userExist) {
      throw new BadRequestException("Usuário não encontrado");
    }

    if (userExist?.email !== userEmail) {
      throw new BadRequestException("Sem permisão para editar dados");
    }

    const updateUser = await this.userRepository.updateUser(dto, userId);

    return updateUser;
  };

  addAddress = async (dto: AddressDto, userId: string) => {
    await this.userRepository.addAddress(dto, userId);
  };

  updateUserAddress = async (dto: AddressUpdateDto, userId: string, addressId: string) => {
    await this.userRepository.updateAddress(dto, userId, addressId);
  };

  removeAddress = async (userId: string, addressId: string) => {
    this.userRepository.removeAddress(userId, addressId);
  };

  listAddressByUserId = async (userId: string) => {
    const userAddresses = await this.userRepository.listAddressByUserId(userId);
    return userAddresses;
  };
}

export { UserService };
