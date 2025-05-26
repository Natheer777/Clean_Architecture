class UpdateUserUseCases{
    constructor({UpdateRepo}){
        this.UpdateRepo = UpdateRepo;
    }
    async execute(userId , UpdateData){
        if(!userId){
            throw new Error("id is required")
        }
        if(updateData.age && typeof updateData.age !== 'number'){
            throw new Error('age must be number')
        }
        const existingUser = await this.UpdateRepo.findById(userId);
        if(!existingUser){
            throw new Error('User not found')
        }

        const updateData = await this.UpdateRepo.update(userId , UpdateData);
        return updateData;
    }
}


module.exports = UpdateUserUseCases;