import { InMemoryItensRepository } from "@/repository/in-memory/itens";
import { ItensService } from "@/service/itens/itensService";
import { ItensController } from "./ItensController.controller";

const inMemoryItensRepository = new InMemoryItensRepository();

const itensService = new ItensService(inMemoryItensRepository);

const itensController = new ItensController(itensService);

export { itensController };
