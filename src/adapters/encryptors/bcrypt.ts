import * as bcrypt from "bcrypt"
import { PasswordEncryptor } from "@/domain/interfaces/password-encryptor.interface";
export class BcryptEncrypt  implements PasswordEncryptor{
    async hash(password:string):Promise<string>{
        return bcrypt.hash(password, 10);
    }


    async compare(password: string , hashPassword: string):Promise<boolean>{
        return bcrypt.compare(password , hashPassword);
    }
}