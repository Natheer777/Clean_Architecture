import { Router } from "express";
import { UserController } from "@/adapters/controller/UserController";
import { authMiddleware } from "@/adapters/middlewares/authMiddleware";

export class UserRouter{
    private router : Router;
    private controller : UserController;
    constructor(){
        this.router = Router();
        this.controller = new UserController()
        this.setupRoutes()
    }
    private setupRoutes (){
    this.router.post('/users', this.controller.create.bind(this.controller));
    this.router.post('/login', this.controller.login.bind(this.controller));
    this.router.get('/users', authMiddleware, this.controller.getAll.bind(this.controller));
    this.router.get('/users/:id', authMiddleware, this.controller.getById.bind(this.controller));
    this.router.put('/users/:id', authMiddleware, this.controller.update.bind(this.controller));
    this.router.delete('/users/:id', authMiddleware, this.controller.delete.bind(this.controller));
  } 
}