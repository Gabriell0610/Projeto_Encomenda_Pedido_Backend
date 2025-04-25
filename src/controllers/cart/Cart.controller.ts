import { HttpStatus } from "@/core/http"
import { createCartSchema } from "@/dto/cart/CreateCartDto"
import { ICartService } from "@/service/cart/ICartService"
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

   

}

export {CartController}