import { CreateCartDto } from "@/dto/cart/CreateCartDto";
import { Carrinho, CarrinhoItens } from "@prisma/client";
import { ICartService } from "./ICartService";
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

    const cartAlredyActive = await this.cartRepository.findCartActiveByUser(dto.userId);

    if (cartAlredyActive) {
      const itemExistInCartItens = cartAlredyActive.carrinhoItens.find((item) => item.itemId === dto.itemId);
      if (itemExistInCartItens) {
        const newQuantity = itemExistInCartItens.quantidade + dto.quantity;
        const updatedCart = await this.cartRepository.updateCartItemQuantity(itemExistInCartItens.id, newQuantity);
        return updatedCart;
      }

      const cart = await this.cartRepository.createCartItem(dto, findItem?.preco, cartAlredyActive.id);
      return cart;
    }

    const cart = await this.cartRepository.createCart(dto, findItem?.preco);
    return cart;
  };

  listCart = async (userId: string) => {
    const cartUser = await this.cartRepository.findCartActiveByUser(userId);
    if (!cartUser) {
      throw new BadRequestException("Usuário nao possui um carrinho ativo no momento"); // MUDAR A MENSAGEM DO FRONT PARA: CARRINHO VAZIO
    }

    return cartUser;
  };

  listAllCartByUser = async (userId: string) => {
    const cartUser = await this.cartRepository.listCart(userId);
    if (!cartUser) {
      throw new BadRequestException("Usuário nao possui carrinho nenhum");
    }

    return cartUser;
  };

  changeItemQuantity = async (itemId: string, userId: string, act: string) => {
    const itemExistInCartItens = await this.findItemAlredyExistInCart(userId, itemId);

    let newQuantity =
      act === "increment" ? itemExistInCartItens?.quantidade! + 1 : itemExistInCartItens?.quantidade! - 1;

    if (newQuantity <= 0) {
      newQuantity = 1;
    }

    return await this.cartRepository.updateCartItemQuantity(itemExistInCartItens?.id!, newQuantity);
  };

  removeItemCart = async (itemId: string, userId: string) => {
    const itemExistInCartItens = await this.findItemAlredyExistInCart(userId, itemId);
    if (!itemExistInCartItens) {
      throw new BadRequestException("Item nao encontrado no carrinho ativo no momento");
    }
    await this.cartRepository.removeItemCart(itemExistInCartItens?.itemId!, itemExistInCartItens?.id!);
  };

  private async findItemAlredyExistInCart(userId: string, itemId: string) {
    const cartAlredyActive = await this.cartRepository.findCartActiveByUser(userId);
    const itemExistInCartItens = cartAlredyActive?.carrinhoItens.find((item) => item.itemId === itemId);
    return itemExistInCartItens;
  }
}

export { CartService };
