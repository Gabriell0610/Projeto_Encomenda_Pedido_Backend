import { CreateCartDto } from "@/domain/dto/cart/CreateCartDto";
import { Carrinho, CarrinhoItens } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export type cartAndCartItens = Carrinho & { carrinhoItens: CarrinhoItens[] };
export interface ICartRepository {
  createCart: (dto: CreateCartDto, priceItem: Decimal) => Promise<CarrinhoItens>;
  findCartActiveByUser: (userId: string) => Promise<cartAndCartItens | null>;
  createCartItem: (dto: CreateCartDto, priceItem: Decimal, cartId: string) => Promise<CarrinhoItens>;
  updateCartItemQuantity: (cartItem: string, quantity: number) => Promise<CarrinhoItens>;
  removeItemCart: (itemId: string, cartId: string) => Promise<void>;
  listAllCartByUser: (userId: string) => Promise<Carrinho | null>;
  changeStatusCart: (idCart: string) => Promise<void>;
  updateTotalValueCart: (userId: string, totalValue: Decimal | number) => Promise<cartAndCartItens | null>;
}
