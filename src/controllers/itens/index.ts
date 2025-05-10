import { InMemoryItensRepository } from "@/repository/in-memory/itens";
import { ItensService } from "@/service/itens/itens.service";
import { ItensController } from "./Itens.controller";
import { ItensRepository } from "@/repository/prisma/itens/itens.prisma";

const itensRepository = new ItensRepository();

const itensService = new ItensService(itensRepository);

const itensController = new ItensController(itensService);

export { itensController };
