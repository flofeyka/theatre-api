import ApiError from "../exceptions/api-error.js";
import tokenService from "../services/token-service.js";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader.split(" ")[1];

    if (!authHeader || !accessToken) {
      return next(ApiError.Unauthorized());
    }

    const tokenData = tokenService.verifyAccessToken(accessToken);
    if (!tokenData) {
      return next(ApiError.Unauthorized());
    }

    req.user = tokenData;
    next();
  } catch {
    return next(ApiError.Unauthorized());
  }
};

export default authMiddleware;
