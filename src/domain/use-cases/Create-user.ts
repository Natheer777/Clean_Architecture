import { User } from "../entities/User";
import { UserRepository } from "../interfaces/user-repository.interface";
import { PasswordEncryptor } from "../interfaces/password-encryptor.interface";


export class CreateUserUseCases {
    constructor(
        private userRepository: UserRepository,
        private passwordEncryptor: PasswordEncryptor
    ) { }

    async execute(email: string, password: string, name: string): Promise<User> {
        const user = new User(email, password, name)
        user.validate();
        const existingUser = await this.userRepository.findByEmail(email)
        if (existingUser) {
            throw new Error("User already exists. Please use a different email.");
        }
        user.password = await this.passwordEncryptor.hash(password)
        return this.userRepository.create(user)
    }

}