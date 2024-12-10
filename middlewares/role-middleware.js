import ApiError from "../exceptions/api-error.js";
import { User } from "../models/models.js";

const roleMiddleware = (role) => {
  return async (req, res, next) => {
    try {
      const user = await User.findByPk(req.user.id);
      if (user.role !== role) {
        return next(ApiError.BadRequest("У вас нет доступа"));
      }

      next();
    } catch (e) {
      next(e);
    }
  };
};

export default roleMiddleware;