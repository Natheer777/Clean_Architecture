class PostController {
  constructor(createPostUseCases, getAllPosts) {
    this.createPostUseCases = createPostUseCases;
    this.getAllPosts = getAllPosts;
  }
  async create(req, res) {
    try {
      const post = await this.createPostUseCases.execute(req.body);
      res.status(201).json(post);
    } catch (err) {
      res.status(400).json({ err: err.massage });
    }
  }
  async getAll(reg, res) {
    try {
      const get = await this.getAllPosts.execute();
      res.status(200).json(get);
    } catch (err) {
      res.status(500).json({ err: "cant get posts" });
    }
  }
}

module.exports = PostController;
