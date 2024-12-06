import { Op } from "sequelize";
import ApiError from "../exceptions/api-error.js";
import { Repertoire, Session } from "../models/models.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET,
});

class repertoireService {
  async addRepertoire({ title, description, category, image }) {
    if (category < 0 || category > 21 || isNaN(Number(category))) {
      throw ApiError.BadRequest("Неправильный формат возрастной категории");
    }

    const repertoire = await Repertoire.create({
      description,
      title,
      category,
      image,
    });
    return repertoire;
  }

  async editRepertoire(dto) {
    const repertoireFound = await Repertoire.findOne({
      where: { id: dto.id },
    });

    if (!repertoireFound) {
      throw ApiError.NotFound("Репертуарная сцена не найдена");
    }

    if (repertoireFound.image) {
      const publicId = existingUser.image.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`images/${publicId}`)
    }

    if (
      dto.category &&
      (dto.category < 0 || dto.category > 21 || isNaN(Number(dto.category)))
    ) {
      throw ApiError.BadRequest("Неправильный формат возрастной категории");
    }

    const repertoire = await Repertoire.update(dto, { where: { id: dto.id } });
    if (repertoire[0] === 0) {
      throw ApiError.NotFound("Репертуарная сцена не найдена");
    }
    return {
      success: true,
      message: "Сцена успешно изменена.",
    };
  }

  async getAllRepertoires() {
    return await Repertoire.findAll({
      where: {},
      order: [[{ model: Session, as: "sessions" }, "time", "ASC"]],
      include: [
        {
          model: Session,
          as: "sessions",
          where: {
            time: {
              [Op.gte]: new Date(),
            },
          },
        },
      ],
    });
  }
}

export default new repertoireService();
