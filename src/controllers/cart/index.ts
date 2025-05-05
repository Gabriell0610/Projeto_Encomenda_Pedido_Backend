import { CartRepository } from "@/repository/prisma/cart/cart.prisma.repository";
import { ItensRepository } from "@/repository/prisma/itens/itens.prisma.repository";
import { CartController } from "./Cart.controller";
import { CartService } from "@/service/cart/CartService";

const itemRepository = new ItensRepository();
const cartRepository = new CartRepository();
const cartService = new CartService(cartRepository, itemRepository);

const cartController = new CartController(cartService);

export { cartController };
