import UserDto from "../dtos/user-dto.js";
import { User } from "../models/models.js";

class userService {
  async create({ fullName, phoneNumber, password, email, birth }) {
    const user = await User.create({
      fullName,
      phoneNumber,
      password,
      email,
      birth,
    });
    return user;
  }

  async findUser(id) {
    return new UserDto(await User.findByPk(id));
  }
}

export default new userService();
