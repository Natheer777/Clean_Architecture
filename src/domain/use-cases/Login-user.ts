import { UserRepository } from "../interfaces/user-repository.interface";
import { PasswordEncryptor } from "../interfaces/password-encryptor.interface";
import { TokenGenerator } from "../interfaces/token-generator.interface";


export class LoginUserUseCase {
    constructor(
        private userRepository: UserRepository,
        private passwordEncryptor: PasswordEncryptor,
        private tokenGenerate: TokenGenerator
    ) { }


    async execute(email: string, password: string, jwtSecret: string): Promise<string> {
        const user = await this.userRepository.findByEmail(email)
        if (!user) {
            throw new Error("Invalid credentials. Please check your username and password.");
        }
        const isPassword = await this.passwordEncryptor.compare(password, user.password);
        if (!isPassword) {
            throw new Error("Invalid credentials");
        }

        const token = this.tokenGenerate.generate(
            { id: user.id, email: user.email },
            jwtSecret,
            { expiresIn: '1h' }
        );
        return token
    }

}