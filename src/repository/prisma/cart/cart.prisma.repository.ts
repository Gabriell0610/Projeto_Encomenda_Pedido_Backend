import { CreateCartDto } from "@/dto/cart/CreateCartDto"
import { prisma } from "@/libs/prisma"
import { ICartRepository } from "@/repository/interfaces/cart"
import { Carrinho, StatusCart } from "@prisma/client"

class CartRepository implements ICartRepository  {
    create = async (dto: CreateCartDto, itemPrice: number) => {
        const expireIn = new Date(Date.now() + 60 * 60 * 1000)
        const cart = await prisma.carrinho.create({
            data: {
                status: dto.status,
                dataCriacao: new Date(),
                dataExpiracao: expireIn,
                usuarioId: dto.userId,
            }
        })

        return this.createCartItem(dto, itemPrice, cart.id)
    }

    createCartItem = async (dto: CreateCartDto, itemPrice: number, cartId: string) => {
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
                }
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

    

}

export { CartRepository }	