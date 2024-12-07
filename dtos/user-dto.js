class UserDto {
  id;
  fullName;
  birth;
  occupiedPlaces;
  createdAt;

  constructor(model) {
    this.id = model.id;
    this.fullName = model.fullName;
    this.birth = model.birth;
    this.createdAt = model.createdAt;
    this.occupiedPlaces = model.occupiedPlaces;
  }
}

export default UserDto;
