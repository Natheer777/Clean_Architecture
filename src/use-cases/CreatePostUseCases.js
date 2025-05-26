class CreatePostUseCases{
    constructor({postRepo}){
        this.postRepo = postRepo;
    }
    async execute(postData){
        if(!postData.title){
            throw new Error("title is required")
        }
        return this.postRepo.create(postData);
    }
}
module.exports = CreatePostUseCases;