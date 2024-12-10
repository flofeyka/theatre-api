import { Op } from "sequelize";
import ApiError from "../exceptions/api-error.js";
import { Repertoire, Session, User } from "../models/models.js";
import userService from "./user-service.js";

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

  async getSessionById({ session_id }) {
    const session = await Session.findOne({
      where: {
        id: session_id,
        time: {
          [Op.gte]: new Date(),
        },
      },
      include: [Repertoire],
    });
    return session;
  }

  async deleteSession({ session_id }) {
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

  isValidHallPlace(row, place) {
    const maxPlacesPerRow = {
      1: 26,
      2: 26,
      3: 26,
      4: 28,
      5: 28,
      6: 28,
      7: 30,
      8: 30,
      9: 34,
      10: 34,
      11: 34,
      12: 32,
      13: 32,
      14: 30,
      15: 30,
      16: 30,
    };

    const maxPlaces = maxPlacesPerRow[row];
    if (!maxPlaces) {
      return false;
    }
    return place > 0 && place <= maxPlaces;
  }

  isValidBalconyPlace(row, place) {
    const maxPlacesPerRow = {
      1: 26,
      2: 26,
      3: 26,
      4: 26,
      5: 28,
      6: 28,
      7: 28,
    };

    const maxPlaces = maxPlacesPerRow[row];
    if (!maxPlaces) {
      return false;
    }
    return place > 0 && place <= maxPlaces;
  }

  async getBookingSessions(user_id) {
    const user = await User.findByPk(user_id);
    const bookedSessions = await Promise.all(
      user.occupiedPlaces.map(
        async (item) =>
          await this.getSessionById({ session_id: item.session_id })
      )
    );

    return bookedSessions.filter((item) => item);
  }

  async bookSession({ session_id, position, user_id }) {
    const session = await this.getSessionById({session_id});
    if (!session) {
      throw ApiError.NotFound("Сеанс не найден");
    }

    if (
      !position
        .map((item) =>
          item.type === "hall"
            ? this.isValidHallPlace(item.row, item.place)
            : this.isValidBalconyPlace(item.row, item.place)
        )
        .every((item) => item)
    ) {
      throw ApiError.BadRequest("Неправильный формат ряда и места.");
    }

    const user = await User.findByPk(user_id);
    console.log(user);
    if (
      session.occupiedPlaces.find((item) =>
        position.find((i) => i.row === item.row && i.place === item.place)
      ) ||
      user.occupiedPlaces.find(
        (item) =>
          position.find((i) => i.row === item.row && i.place === item.place) &&
          item.session_id === session_id
      )
    ) {
      throw ApiError.BadRequest("Эти места уже забронированы");
    }

    user.occupiedPlaces = [
      ...user.occupiedPlaces,
      ...position.map((item) => ({
        ...item,
        session_id,
      })),
    ];
    session.occupiedPlaces = [
      ...session.occupiedPlaces,
      ...position.map((item) => ({
        ...item,
        session_id,
      })),
    ];
    await user.save();
    return await session.save();
  }

  async cancelBooking({ session_id, position, user_id }) {
    const session = await Session.findOne({ where: { id: session_id } });
    if (!session) {
      throw ApiError.NotFound("Сеанс не найден");
    }

    const user = await User.findByPk(user_id);
    if (
      !user.occupiedPlaces.find(
        (item) =>
          item.session_id === session_id &&
          position.find(
            (i) =>
              i.row === item.row &&
              i.place === item.place &&
              i.type === item.type
          )
      )
    ) {
      throw ApiError.BadRequest("Вы не забронировали эти места");
    }

    const sessionResult = await Session.update(
      {
        occupiedPlaces: session.occupiedPlaces.filter(
          (item) =>
            !position.find(
              (i) =>
                i.row === item.row &&
                i.place === item.place &&
                i.type === item.type
            )
        ),
      },
      {
        where: {
          id: session.id,
        },
      }
    );
    const userResult = await User.update(
      {
        occupiedPlaces: user.occupiedPlaces.filter(
          (item) =>
            !position.find(
              (i) =>
                i.row === item.row &&
                i.place === item.place &&
                i.type === item.type &&
                item.session_id === session.id
            )
        ),
      },
      { where: { id: user_id } }
    );
    if (sessionResult[0] === 0 || userResult[0] === 0) {
      throw ApiError.NotFound("Результаты не обновлены");
    }

    return {
      message: "Места успешно отменены",
      success: true,
    };
  }
}

export default new sessionService();
