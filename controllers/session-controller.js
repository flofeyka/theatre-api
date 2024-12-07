import ApiError from "../exceptions/api-error.js";
import sessionService from "../services/session-service.js";

class sessionController {
  async getSessionById(req, res, next) {
    try {
      const result = await sessionService.getSessionById(req.params);
      if (!result) {
        throw ApiError.NotFound("Сеанс не найден");
      }
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async addSession(req, res, next) {
    try {
      const result = await sessionService.addSession(req.body);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async editSession(req, res, next) {
    try {
      const result = await sessionService.editSession(req.body);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async deleteSession(req, res, next) {
    try {
      const result = await sessionService.deleteSession(req.params);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async getAllSessions(req, res, next) {
    try {
      const result = await sessionService.getAllSessions(req.params);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async bookSession(req, res, next) {
    try {
      const result = await sessionService.bookSession({
        ...req.body,
        user_id: req.user.id,
      });
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async cancelBooking(req, res, next) {
    try {
      const result = await sessionService.cancelBooking({
        ...req.body,
        user_id: req.user.id,
      });
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }
}

export default new sessionController();
