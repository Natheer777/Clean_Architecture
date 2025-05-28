export abstract class TokenGenerator  {
    abstract generate(payload: any, secret: string, options?: any): string
}