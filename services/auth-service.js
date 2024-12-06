import { Op } from "sequelize";
import { User } from "../models/models.js";
import tokenService from "./token-service.js";
import userService from "./user-service.js";
import bcrypt from "bcrypt";
import ApiError from "../exceptions/api-error.js";

class authService {
  async signIn({ email, password }) {
    const userFound = await User.findOne({ where: { email } });
    if (!userFound) {
      throw ApiError.Unauthorized("Неправильная почта или пароль");
    }

    const passwordCompared = await bcrypt.compare(password, userFound.password);
    if (!passwordCompared) {
      throw ApiError.Unauthorized("Неправильная почта или пароль");
    }

    const { refreshToken, accessToken } = tokenService.generateTokens({
      id: userFound.id,
      fullName: userFound.fullName,
      email: userFound.email,
    });
    await tokenService.saveToken(refreshToken, userFound);

    return {
      user: userFound,
      accessToken,
      refreshToken,
    };
  }

  async signUp({ fullName, phoneNumber, password, email, birth }) {
    const userFound = await User.findAll({
      where: {
        [Op.or]: [{ phoneNumber }, { email }],
      },
    });

    if (userFound.length > 0) {
      if (userFound.find((user) => user.phoneNumber === phoneNumber)) {
        throw ApiError.BadRequest("Номер телефона уже зарегистрирован");
      } else {
        throw ApiError.NotFound("Электронная почта уже зарегистрирована");
      }
    }

    const passwordSalt = await bcrypt.genSalt(10, "a");
    const passwordHash = await bcrypt.hash(password, passwordSalt);
    const userCreated = await userService.create({
      fullName,
      phoneNumber,
      password: passwordHash,
      email,
      birth: new Date(birth),
    });
    const { accessToken, refreshToken } = tokenService.generateTokens({
      id: userCreated.id,
      fullName: userCreated.fullName,
      email: userCreated.email,
    });
    await tokenService.saveToken(refreshToken, userCreated);

    return {
      user: userCreated,
      accessToken,
      refreshToken,
    };
  }

  async refresh(currentRefreshToken) {
    const tokenData = await tokenService.findRefreshToken(currentRefreshToken);
    if (!tokenData) {
      throw ApiError.Unauthorized();
    }
    const { accessToken, refreshToken } = tokenService.generateTokens({
      id: tokenData.user.id,
      fullName: tokenData.user.fullname,
      email: tokenData.user.email,
    });
    await tokenService.saveToken(refreshToken, tokenData.user);

    return {
      user: tokenData.user,
      accessToken,
      refreshToken,
    };
  }
}

export default new authService();
