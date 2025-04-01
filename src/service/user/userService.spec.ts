import { InMemoryUserRepository } from "@/repository/in-memory/user"
import { CreateUserDto } from "@/dto/auth/areateUserDto"
import { AuthService } from "../auth"
import { AccessProfile } from "@/constants/access-profile"
import { BadRequestException } from "@/core/error/exceptions/bad-request-exception"
import bcrypt from "bcryptjs"

let authService: AuthService
let userRepositoryInMemory: InMemoryUserRepository
describe("Unit Tests - authService", () => {

    beforeEach(() => {
        userRepositoryInMemory = new InMemoryUserRepository()
        authService = new AuthService(userRepositoryInMemory)
    })

    describe("Testing method register", () => {
        it('Should create a user', async () => {
            //Arrange
    
            const userDto: CreateUserDto = {
                nome: "Gabriel",
                email: "gabriel@gmail.com",
                senha: "Gb12345!",
                telefone: "21979736993" ,
                role: AccessProfile.CLIENT
            }
            //Act
            const response = await authService.register(userDto)
            //Assert
            expect(response).toMatchObject({
                nome: userDto.nome,
                email: userDto.email,
                telefone: userDto.telefone,
                role: userDto.role
            });
        })
    
        it('Should throw a BadRequestException when user already exists', async () => {
            const userDto: CreateUserDto = {
                nome: "Gabriel",
                email: "gabriel@gmail.com",
                senha: "Gb12345!",
                telefone: "21979736993" ,
                role: AccessProfile.CLIENT
            }
            
            await authService.register(userDto)
            
    
            await expect( authService.register(userDto)).rejects.toThrow("Já existe conta cadastrada com esse email!")
            await expect(authService.register(userDto)).rejects.toBeInstanceOf(BadRequestException)
        })
    
        it("should hash the user password before register", async () => {
            const userDto: CreateUserDto = {
                nome: "Gabriel",
                email: "gabriel@gmail.com",
                senha: "Gb12345!",
                telefone: "21979736993" ,
                role: AccessProfile.CLIENT
            }
    
            const response = await authService.register(userDto)
            
            const isPasswordHashed = await bcrypt.compare("Gb12345!", response.senha as string);
            expect(isPasswordHashed).toBe(true);
        })
    })
})