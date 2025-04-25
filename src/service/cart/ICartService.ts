import { CreateCartDto, CreateCartItemDto } from "@/dto/cart/CreateCartDto";
import { Carrinho, CarrinhoItens } from "@prisma/client";

interface ICartService {
    createCart: (dto: CreateCartDto) => Promise<CarrinhoItens>
}

export {ICartService}