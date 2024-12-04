class UserDto {
    id;
    fullName;
    birth;
    createdAt;

    constructor(model) {
        this.id = model.id;
        this.fullName = model.fullName;
        this.birth = model.birth;
        this.createdAt = model.createdAt;
    }
}

export default UserDto;