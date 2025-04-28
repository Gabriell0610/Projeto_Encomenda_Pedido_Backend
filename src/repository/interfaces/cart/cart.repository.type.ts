import { CreateCartDto } from "@/dto/cart/CreateCartDto";
import { Carrinho, CarrinhoItens, Item } from "@prisma/client";

export type cartAndCartItens = Carrinho & { carrinhoItens: CarrinhoItens[] }
export interface ICartRepository {
    createCart: (dto: CreateCartDto, priceItem: number) => Promise<CarrinhoItens>
    findCartActiveByUser: (userId: string) => Promise<cartAndCartItens| null>
    createCartItem: (dto: CreateCartDto, priceItem: number, cartId: string) => Promise<CarrinhoItens>
    updateCartItemQuantity: (cartItem: string, quantity: number) => Promise<CarrinhoItens>
    removeItemCart: (itemId: string, cartId: string) => Promise<void>
    listCart: (userId: string) => Promise<Carrinho| null>
}