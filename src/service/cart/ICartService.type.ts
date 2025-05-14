import { CreateCartDto } from "@/domain/dto/cart/CreateCartDto";
import { CartEntity, CartItemsEntity } from "@/domain/model";

interface ICartService {
  createCart: (dto: CreateCartDto) => Promise<CartItemsEntity>;
  changeItemQuantity: (itemId: string, userId: string, act: string) => Promise<CartItemsEntity>;
  removeItemCart: (itemId: string, userId: string) => Promise<void>;
  listCart: (userId: string) => Promise<CartEntity | null>;
}

export { ICartService };
