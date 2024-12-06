import userService from "../services/user-service.js";

class userController {
  async findUser(req, res, next) {
    try {
      const result = await userService.findUser(req.params.id);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }
}

export default new userController();
