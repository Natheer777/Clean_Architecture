import { Request, Response } from "express";
import { CreateUserUseCases } from "@/domain/use-cases/Create-user";
import { LoginUserUseCase } from "@/domain/use-cases/Login-user";
import { JwtTokenGenerate } from "../encryptors/JwtGenerate";
import { BcryptEncrypt } from "../encryptors/bcrypt";
import { UserRepositoryImpl } from "../repository/user_repository";
import { prisma } from "@/lib/prisma"; // Use singleton

export class UserController {
    private creatUserusecases: CreateUserUseCases;
    private loginUserusecases: LoginUserUseCase;
    
    constructor() {
        const userRepository = new UserRepositoryImpl(prisma);
        const passwordEncryptor = new BcryptEncrypt();
        const tokenGenerator = new JwtTokenGenerate();
        this.creatUserusecases = new CreateUserUseCases(userRepository, passwordEncryptor);
        this.loginUserusecases = new LoginUserUseCase(userRepository, passwordEncryptor, tokenGenerator);
    }
    async create(req: Request, res: Response) {
        try {
            const { email, password, name } = req.body;
            const user = await this.creatUserusecases.execute(email, password, name);
            res.status(201).json(user);
        } catch (error: any) {
            res.status(400).json({ message: "Invalid request. Please check your input." });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const token = await this.loginUserusecases.execute(email, password, process.env.JWT_SECRET!);
            res.json({ token });
        } catch (error: any) {
            res.status(401).json({ message: "Authentication failed. Please log in again." });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const users = await this.creatUserusecases['userRepository'].findAll();
            res.json(users);
        } catch (error: any) {
            res.status(500).json({ message: "An error occurred while processing your request." });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
           const user = await this.creatUserusecases['userRepository'].findById(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (error: any) {
            res.status(500).json({ message: "An error occurred while processing your request." });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const { email, password, name } = req.body;
            const user = await this.creatUserusecases['userRepository'].update(id, { email, password, name });
            res.json(user);
        } catch (error: any) {
            res.status(400).json({ message: "Invalid request. Please check your input." });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            await this.creatUserusecases['userRepository'].delete(id);
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ message: "Invalid request. Please check your input." });
        }
    }
}