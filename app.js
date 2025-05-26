const express = require("express");
const db = require("./src/infrastructure/db");
const PostReository = require("./src/repositories/PostRepository");
const CreatePostUserCase = require("./src/use-cases/CreatePostUseCases");
const UpdatePostsUseCases = require("./src/use-cases/UpdateUserUseCases");

const PostController = require("./src/controller/PostController");
const postRouter = require("./src/router/Router");

const app = express();
app.use(express.json());

const PostRepo = new PostReository(db);
const createPostUseCases = new CreatePostUserCase(PostRepo);
const UpdatePostUseCase = new UpdatePostsUseCases(PostRepo);

const postController = new PostController({
  createPostUseCases,
  UpdatePostUseCase,
});
app.use("/post", postRouter(postController));

app.get("/", (req, res) => {
  res.send("Blog api is running");
});


module.exports = app;