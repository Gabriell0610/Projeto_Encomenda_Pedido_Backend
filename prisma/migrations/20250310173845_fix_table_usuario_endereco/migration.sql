/*
  Warnings:

  - You are about to drop the `usuario_endereco` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "usuario_endereco" DROP CONSTRAINT "usuario_endereco_enderecoId_fkey";

-- DropForeignKey
ALTER TABLE "usuario_endereco" DROP CONSTRAINT "usuario_endereco_usuarioId_fkey";

-- DropTable
DROP TABLE "usuario_endereco";

-- CreateTable
CREATE TABLE "_UsuarioEndereco" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UsuarioEndereco_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UsuarioEndereco_B_index" ON "_UsuarioEndereco"("B");

-- AddForeignKey
ALTER TABLE "_UsuarioEndereco" ADD CONSTRAINT "_UsuarioEndereco_A_fkey" FOREIGN KEY ("A") REFERENCES "enderecos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UsuarioEndereco" ADD CONSTRAINT "_UsuarioEndereco_B_fkey" FOREIGN KEY ("B") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
