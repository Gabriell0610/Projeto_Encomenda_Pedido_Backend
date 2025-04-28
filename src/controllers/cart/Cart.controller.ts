import { HttpStatus } from "@/core/http"
import { createCartSchema } from "@/dto/cart/CreateCartDto"
import { ICartService } from "@/service/cart/ICartService"
import { authorizationBodySchema } from "@/utils/helpers/zod/schemas/token"
import { NextFunction, Request } from "express"


class CartController {

    constructor(private cartService: ICartService) {}

    createCart = async (req: Request, res: any, next: NextFunction) => {
        try {
            const dto = createCartSchema.parse(req.body)
            const data = await this.cartService.createCart(dto)
            return res.status(HttpStatus.CREATED).json({message: "Carrinho criado com sucesso!", data: data})
        } catch (error) {
            next(error)
        }
    }

    listCart = async (req: Request, res: any, next: NextFunction) => {
        try {
            const {requesterId} = authorizationBodySchema.parse(req.body)
            const data = await this.cartService.listCart(requesterId)
            return res.status(HttpStatus.OK).json({message: "Listando carrinho com sucesso!", res: data})
        } catch (error) {
            next(error)
        }
    }

    //TESTAR O ID VINDO DO REQ.BODY - SE DER B.O MUDAR PARA VIR DO FRONT
    incremetItemQuantity = async (req: Request, res: any, next: NextFunction) => {
        try {
            const {itemId} = req.params
            const {requesterId: userId} = authorizationBodySchema.parse(req.body)
            await this.cartService.changeItemQuantity(itemId, userId, "increment")
            return res.status(HttpStatus.OK).json({message: "Quantidade do item aumentada com sucesso!"})
        } catch (error) {
            next(error)
        }
    }

    decrementItemQuantity = async (req: Request, res: any, next: NextFunction) => {
        try {
            const {itemId} = req.params
            const {requesterId: userId} = authorizationBodySchema.parse(req.body)
            await this.cartService.changeItemQuantity(itemId, userId, "decrement")
            return res.status(HttpStatus.OK).json({message: "Quantidade do item diminuida com sucesso!"})
        } catch (error) {
            next(error)
        }
    }

    removeItemCart = async (req: Request, res: any, next: NextFunction) => {
        try {
            const {itemId} = req.params
            const {requesterId: userId} = authorizationBodySchema.parse(req.body)
            await this.cartService.removeItemCart(itemId, userId)
            return res.status(HttpStatus.OK).json({message: "Item removido do carrinho com sucesso!"})
        } catch (error) {
            
        }
    }

   

}

export {CartController}