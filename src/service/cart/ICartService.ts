import { CreateCartDto } from "@/dto/cart/CreateCartDto";
import { cartAndCartItens } from "@/repository/interfaces/cart";
import { Carrinho, CarrinhoItens } from "@prisma/client";

interface ICartService {
  createCart: (dto: CreateCartDto) => Promise<CarrinhoItens>;
  changeItemQuantity: (itemId: string, userId: string, act: string) => Promise<CarrinhoItens>;
  removeItemCart: (itemId: string, userId: string) => Promise<void>;
  listCart: (userId: string) => Promise<Carrinho | null>;
}

export { ICartService };
