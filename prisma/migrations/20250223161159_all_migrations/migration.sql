-- CreateEnum
CREATE TYPE "status" AS ENUM ('ACEITO', 'PENDENTE', 'PREPARANDO', 'ENTREGUE', 'CANCELADO');

-- CreateEnum
CREATE TYPE "roles" AS ENUM ('ADMIN', 'CLIENT');

-- CreateEnum
CREATE TYPE "meioPagamento" AS ENUM ('PIX', 'CARTAO_CREDITO', 'CARTAO_DEBITO');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "senha" VARCHAR NOT NULL,
    "telefone" VARCHAR(11) NOT NULL,
    "data de criacao" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data de atualizacao" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "roles" NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enderecos" (
    "id" TEXT NOT NULL,
    "cep" VARCHAR,
    "rua" VARCHAR,
    "bairro" VARCHAR,
    "numero" VARCHAR,
    "cidade" VARCHAR,
    "estado" VARCHAR,
    "complemento" VARCHAR,

    CONSTRAINT "enderecos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pedidos" (
    "id" TEXT NOT NULL,
    "numeroPedido" INTEGER NOT NULL,
    "status" "status",
    "precoTotal" REAL,
    "meioPagamento" "meioPagamento",
    "data de criacao" DATE DEFAULT CURRENT_TIMESTAMP,
    "data de atualizacao" DATE DEFAULT CURRENT_TIMESTAMP,
    "dataAgendamento" TIMESTAMP,
    "usuarioId" TEXT NOT NULL,
    "enderecoId" TEXT NOT NULL,

    CONSTRAINT "pedidos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itens" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR NOT NULL,
    "preco" REAL,
    "descricao" VARCHAR,
    "image" VARCHAR,
    "data de criacao" DATE DEFAULT CURRENT_TIMESTAMP,
    "data de atualizacao" DATE DEFAULT CURRENT_TIMESTAMP,
    "disponivel" BOOLEAN,

    CONSTRAINT "itens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Carrinho" (
    "id" TEXT NOT NULL,
    "data de criacao" DATE DEFAULT CURRENT_TIMESTAMP,
    "dataExpiracao" DATE,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "Carrinho_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pedido_itens" (
    "id" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "precoAtual" REAL NOT NULL,
    "pedidoId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,

    CONSTRAINT "pedido_itens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarrinhoItens" (
    "id" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "precoAtual" REAL NOT NULL,
    "carrinhoId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,

    CONSTRAINT "CarrinhoItens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UsuarioEndereco" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UsuarioEndereco_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "pedidos_numeroPedido_key" ON "pedidos"("numeroPedido");

-- CreateIndex
CREATE UNIQUE INDEX "Carrinho_usuarioId_key" ON "Carrinho"("usuarioId");

-- CreateIndex
CREATE INDEX "_UsuarioEndereco_B_index" ON "_UsuarioEndereco"("B");

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "enderecos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carrinho" ADD CONSTRAINT "Carrinho_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido_itens" ADD CONSTRAINT "pedido_itens_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "pedidos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido_itens" ADD CONSTRAINT "pedido_itens_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "itens"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarrinhoItens" ADD CONSTRAINT "CarrinhoItens_carrinhoId_fkey" FOREIGN KEY ("carrinhoId") REFERENCES "Carrinho"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarrinhoItens" ADD CONSTRAINT "CarrinhoItens_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "itens"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UsuarioEndereco" ADD CONSTRAINT "_UsuarioEndereco_A_fkey" FOREIGN KEY ("A") REFERENCES "enderecos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UsuarioEndereco" ADD CONSTRAINT "_UsuarioEndereco_B_fkey" FOREIGN KEY ("B") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
