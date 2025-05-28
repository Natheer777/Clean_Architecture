import { Server } from "@/infrastructure/server/server";
import * as dotenv from "dotenv";
dotenv.config()
const server = new Server();
server.start(3000)