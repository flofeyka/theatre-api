import repertoireService from "../services/repertoire-service.js";

class repertoireController {
  async addRepertoire(req, res, next) {
    try {
      const result = await repertoireService.addRepertoire(req.body);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async editRepertoire(req, res, next) {
    try {
      const result = await repertoireService.editRepertoire(req.body);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async getAllRepertoires(req, res, next) {
    try {
      const result = await repertoireService.getAllRepertoires();
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }
}

export default new repertoireController();
