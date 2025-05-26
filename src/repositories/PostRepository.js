class PostRepository{
    constructor(db){
        this.db = db;
    }
    async create(PostData){
        //execute save in db
    }

    async findAll(){
        //return all posts
    }
}
module.exports = PostRepository;