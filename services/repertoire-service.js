import ApiError from "../exceptions/api-error.js";
import { Repertoire } from "../models/models.js";

class repertoireService {
    async addRepertoire({title, description, category}) {
        if(category < 0 || category > 21 || isNaN(Number(category))) {
            throw ApiError.BadRequest("Неправильный формат возрастной категории");
        }

        const repertoire = await Repertoire.create({description, title, category});
        return repertoire;
    }

    async editRepertoire(dto) {
        if(dto.category && (dto.category < 0 || dto.category > 21 || isNaN(Number(dto.category)))) {
            throw ApiError.BadRequest("Неправильный формат возрастной категории");
        }

        const repertoire = await Repertoire.update(dto, {where: {id: dto.id}});
        if(repertoire[0] === 0) {
            throw ApiError.NotFound("Репертуарная сцена не найдена")
        }
        return {
            success: true,
            message: "Сцена успешно изменена."
        };
    }

    async getAllRepertoires() {
        return await Repertoire.findAll();
    }
};

export default new repertoireService;