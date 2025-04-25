import { CreateCartDto } from "@/dto/cart/CreateCartDto";
import { Carrinho } from "@prisma/client";
import { ICartService } from "./ICartService";
import { ICartRepository } from "@/repository/interfaces/cart";
import { IItensRepository } from "@/repository/interfaces";
import { BadRequestException } from "@/core/error/exceptions/bad-request-exception";

class CartService implements ICartService {

    constructor(private cartRepository: ICartRepository, private itensRepository: IItensRepository) {}

    createCart = async (dto: CreateCartDto) => {
        const findItem = await this.itensRepository.listById(dto.itemId)
        if(!findItem) {
            throw new BadRequestException("Item nao encontrado")
        }

        const cartAlredyActive = await this.cartRepository.findCartActiveByUser(dto.userId)

        if(cartAlredyActive) {

            const itemAlredyExist = cartAlredyActive.carrinhoItens.find((item) => item.itemId === dto.itemId)
            if(itemAlredyExist) {
                const newQuantity = itemAlredyExist.quantidade + dto.quantity
                const updatedCart = await this.cartRepository.updateCartItemQuantity(itemAlredyExist.id, newQuantity)
                return updatedCart
            }

            const cart = await this.cartRepository.createCartItem(dto, findItem?.preco, cartAlredyActive.id)
            return cart
        }

        const cart = await this.cartRepository.create(dto, findItem?.preco)
        return cart
    }


}

export {CartService}