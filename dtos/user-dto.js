class UserDto {
  id;
  fullName;
  email;
  phoneNumber;
  role;
  birth;
  createdAt;

  constructor(model) {
    this.id = model.id;
    this.fullName = model.fullName;
    this.birth = model.birth;
    this.phoneNumber = model.phoneNumber;
    this.email = model.email;
    this.role = model.role;
    this.createdAt = model.createdAt;
  }
}

export default UserDto;
