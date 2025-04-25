import { CreateCartDto } from "@/dto/cart/CreateCartDto";
import { Carrinho, CarrinhoItens, Item } from "@prisma/client";

export interface ICartRepository {
    create: (dto: CreateCartDto, priceItem: number) => Promise<CarrinhoItens>
    findCartActiveByUser: (userId: string) => Promise<Carrinho & { carrinhoItens: CarrinhoItens[] } | null>
    createCartItem: (dto: CreateCartDto, priceItem: number, cartId: string) => Promise<CarrinhoItens>
    updateCartItemQuantity: (cartItem: string, quantity: number) => Promise<CarrinhoItens>
}