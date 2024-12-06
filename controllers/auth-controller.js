import authService from "../services/auth-service.js";

class authController {
  async signUp(req, res, next) {
    try {
      const result = await authService.signUp(req.body);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async signIn(req, res, next) {
    try {
      const result = await authService.signIn(req.body);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const result = await authService.refresh(req.body.refreshToken);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }
}

export default new authController();
