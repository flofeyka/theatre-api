import jwt from "jsonwebtoken"
import { Token, User } from "../models/models.js";
import ApiError from "../exceptions/api-error.js";

class tokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
            expiresIn: "15m"
        })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
            expiresIn: "14d"
        });

        return { accessToken, refreshToken };
    }

    async saveToken(refreshToken, user) {
        return await Token.findOne({ where: { userId: user.id } }, {
            include: [User]
        }).then(function (obj) {
            if (obj) {
                return obj.update({ refreshToken });
            }

            return Token.create({ refreshToken, userId: user.id }, {
                include: [User]
            })
        });
    }

    async findRefreshToken(refreshToken) {
        return await Token.findOne({ where: { refreshToken }, include: [User] });
    }

    verifyAccessToken(accessToken) {
        return jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
    }

    verifyRefreshToken(refreshToken) {
        return jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    }
};

export default new tokenService;