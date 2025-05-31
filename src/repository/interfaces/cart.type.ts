import { CreateCartDto } from "@/domain/dto/cart/CreateCartDto";
import { CartEntity, CartItemsEntity } from "@/domain/model";
import { Decimal } from "@prisma/client/runtime/library";

export type cartAndCartItens = CartEntity & { carrinhoItens: CartItemsEntity[] };
export interface ICartRepository {
  createCart: (dto: CreateCartDto, priceItem: Decimal) => Promise<CartItemsEntity>;
  findCartActiveByUser: (userId: string) => Promise<cartAndCartItens | null>;
  createCartItem: (dto: CreateCartDto, priceItem: Decimal, cartId: string) => Promise<CartItemsEntity>;
  updateCartItemQuantity: (cartId: string, quantity: number) => Promise<CartItemsEntity>;
  removeItemCart: (itemId: string, cartItemId: string) => Promise<void>;
  listAllCartByUser: (userId: string) => Promise<CartEntity | null>;
  changeStatusCart: (idCart: string) => Promise<void>;
  updateTotalValueCart: (cartId: string, totalValue: Decimal | number) => Promise<CartEntity | null>;
}
