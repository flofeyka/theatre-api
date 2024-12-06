import ApiError from "../exceptions/api-error.js";
import { Repertoire, Session } from "../models/models.js";

class sessionService {
  async addSession({ repertoireId, time, price }) {
    const session = await Session.create({ repertoireId, time, price });
    return session;
  }

  async editSession({ session_id, time, price }) {
    const session = await Session.update(
      { id: session_id, time, price },
      { where: { id: dto.id } }
    );
    if (session[0] === 0) {
      throw ApiError.NotFound("Сеанс не найден");
    }
    return {
      success: true,
      message: "Сеанс успешно изменен.",
    };
  }

  async getSessionById({session_id}) {
    const session = await Session.findOne({ where: { id: session_id }, include: [Repertoire] });
    return session;
  }

  async deleteSession({session_id}) {
    const session = await Session.destroy({ where: { id: session_id } });

    if (session === 0) {
      throw ApiError.NotFound("Сеанс не найден");
    }
    return {
      success: true,
      message: "Сеанс успешно удален.",
    };
  }

  async getAllSessions({ repertoireId }) {
    return await Session.findAll({ where: { repertoireId } });
  }

  async bookSession({session_id, row, place, user_id}) {
    const session = await Session.findOne({ where: { id: session_id } });
    if (!session) {
      throw ApiError.NotFound("Сеанс не найден");
    }
  }


}

export default new sessionService;
