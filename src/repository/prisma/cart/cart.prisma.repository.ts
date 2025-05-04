import { CreateCartDto } from "@/dto/cart/CreateCartDto"
import { prisma } from "@/libs/prisma"
import { ICartRepository } from "@/repository/interfaces/cart"
import { Carrinho, CarrinhoItens, StatusCart } from "@prisma/client"
import { Decimal} from "@prisma/client/runtime/library"

class CartRepository implements ICartRepository  {
    createCart = async (dto: CreateCartDto, itemPrice: Decimal) => {
        const cart = await prisma.carrinho.create({
            data: {
                status: dto.status,
                dataCriacao: new Date(),
                usuarioId: dto.userId,
            }
        })

        return this.createCartItem(dto, itemPrice, cart.id)
    }

    createCartItem = async (dto: CreateCartDto, itemPrice: Decimal, cartId: string) => {
        return await prisma.carrinhoItens.create({
            data: {
                quantidade: dto.quantity,
                itemId: dto.itemId,
                carrinhoId: cartId,
                precoAtual: itemPrice
            },
            select: {
                precoAtual: true,
                quantidade: true,
                itemId: true,
                carrinhoId: true,
                id: true,
                Item: {
                    select: {
                        id: true,
                        nome: true,
                        preco: true,
                        image: true
                    }
                },
            }
        })
    }

    listCart = async (userId: string) =>  {
        return await prisma.carrinho.findFirst({
            where: {usuarioId: userId},
            include: {
                carrinhoItens: true
            }
        })
    }

    findCartActiveByUser = async (userId: string) => {
        return await prisma.carrinho.findFirst({
            where: {
                usuarioId: userId, 
                status: StatusCart.ATIVO
            },
            include: {
                carrinhoItens: true
            }
        })
    }

    updateCartItemQuantity = async (cartId: string, quantity: number) => {
        return await prisma.carrinhoItens.update({
            where: {id: cartId},
            data: {quantidade: quantity},
            select: {
                id: true,
                quantidade: true,
                itemId: true,
                carrinhoId: true,
                precoAtual: true,
                Item: {
                    select: {
                        id: true,
                        nome: true,
                        preco: true,
                        image: true
                    }
            }   }
        })
    }

    removeItemCart = async (itemId: string, cartId: string) => {
        await prisma.carrinhoItens.delete({
            where: {id: cartId, itemId: itemId}
        })
    }

    

}

export { CartRepository }	