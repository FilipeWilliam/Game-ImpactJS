import RankingService from "../services/RankingService.js";

class RankingController {
    async handle (req, res) {
        const service = new RankingService();

        try {
            const result = await service.execute();

            if (result.status === 404) {
                return res.status(404).json(result);
            }
            return res.json(result);
        } catch (err) {
            return res.json({error: err.message});
        }
    }
}

export default RankingController;