import * as jwt from "jsonwebtoken"
import { TokenGenerator } from "@/domain/interfaces/token-generator.interface";

export class JwtTokenGenerate implements TokenGenerator {
    generate(payload: any, secret: string, options?: any): string {
        return jwt.sign(payload, secret, options);
    }
}

