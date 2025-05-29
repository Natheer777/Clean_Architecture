import { User } from "../entities/User";

export abstract class UserRepository {
    abstract create(user: User): Promise<User>;
    abstract findById(id: number): Promise<User | null>; 
    abstract findByEmail(email: string): Promise<User | null>;
    abstract update(id: number, user: Partial<User>): Promise<User>;
    abstract delete(id: number): Promise<void>;
    abstract findAll(): Promise<User[]>;
}