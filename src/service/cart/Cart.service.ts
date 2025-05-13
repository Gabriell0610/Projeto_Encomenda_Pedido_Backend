import { CreateCartDto } from "@/dto/cart/CreateCartDto";
import { ICartService } from "./ICartService.type";
import { cartAndCartItens, ICartRepository } from "@/repository/interfaces/cart";
import { IItensRepository } from "@/repository/interfaces";
import { BadRequestException } from "@/core/error/exceptions/bad-request-exception";

class CartService implements ICartService {
  constructor(
    private cartRepository: ICartRepository,
    private itensRepository: IItensRepository,
  ) {}

  createCart = async (dto: CreateCartDto) => {
    const findItem = await this.itensRepository.listById(dto.itemId);
    if (!findItem) {
      throw new BadRequestException("Item nao encontrado");
    }

    const cartAlredyExist = await this.cartRepository.findCartActiveByUser(dto.userId);

    if (cartAlredyExist) {
      const itemExistInCartItens = cartAlredyExist.carrinhoItens.find((item) => item.itemId === dto.itemId);
      if (itemExistInCartItens) {
        const newQuantity = itemExistInCartItens.quantidade + dto.quantity;
        const updatedCart = await this.cartRepository.updateCartItemQuantity(itemExistInCartItens.id, newQuantity);
        return updatedCart;
      }

      const cart = await this.cartRepository.createCartItem(dto, findItem?.preco, cartAlredyExist.id);
      return cart;
    }

    const cart = await this.cartRepository.createCart(dto, findItem?.preco);
    return cart;
  };

  listCart = async (userId: string) => {
    const cartUser = await this.cartRepository.findCartActiveByUser(userId);

    if (!cartUser) {
      return null;
    }

    const updatedCart = await this.calculatingTotalValue(cartUser);

    return updatedCart;
  };

  changeItemQuantity = async (itemId: string, userId: string, act: string) => {
    const itemExistInCartItens = await this.findItemAlredyExistInCart(userId, itemId);

    let newQuantity = act === "increment" ? itemExistInCartItens?.quantidade + 1 : itemExistInCartItens?.quantidade - 1;

    if (newQuantity <= 0) {
      newQuantity = 1; // bem provável que depois eu tenha que remover o item chamando o removeItemCart
    }

    return await this.cartRepository.updateCartItemQuantity(itemExistInCartItens?.id, newQuantity);
  };

  removeItemCart = async (itemId: string, userId: string) => {
    const itemExistInCartItens = await this.findItemAlredyExistInCart(userId, itemId);
    await this.cartRepository.removeItemCart(itemExistInCartItens.itemId, itemExistInCartItens.id);
  };

  listAllCartByUser = async (userId: string) => {
    const cartUser = await this.cartRepository.listAllCartByUser(userId);
    if (!cartUser) {
      throw new BadRequestException("Usuário nao possui carrinho nenhum");
    }

    return cartUser;
  };
  private async findItemAlredyExistInCart(userId: string, itemId: string) {
    const cartAlredyActive = await this.cartRepository.findCartActiveByUser(userId);
    if (!cartAlredyActive) {
      throw new BadRequestException("Usuário nao possui um carrinho ativo no momento");
    }

    const itemExistInCartItens = cartAlredyActive?.carrinhoItens.find((item) => item.itemId === itemId);
    if (!itemExistInCartItens) {
      throw new BadRequestException("Item nao encontrado no carrinho ativo");
    }
    return itemExistInCartItens;
  }

  private async calculatingTotalValue(cartUser: cartAndCartItens) {
    const totalPrice = cartUser?.carrinhoItens
      .map((c) => {
        return c.quantidade * c.precoAtual.toNumber();
      })
      .reduce((a, b) => a + b, 0);

    return await this.cartRepository.updateTotalValueCart(cartUser.id, totalPrice);
  }
}

export { CartService };
