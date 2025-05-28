export class User {
    id?: number;
    email: string;
    password: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(email: string, password: string, name: string, id?: number) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    validate(): void {
        if (!this.email.includes("@")) {
            throw new Error("Invalid email format. Please enter a valid email address.");
        } if (this.password.length < 8) {
            throw new Error("Password must be at least 8 characters long.");
        } if (!this.name.trim()) {
            throw new Error("Name cannot be empty. Please enter a valid name.");
        }
    }


}