import FinishMatchService from "../services/FinishMatchService.js";

class FinishMatchController {
    async handle (req, res) {
        let {myPoints, enemyPoints, id} = req.body;
        const service = new FinishMatchService();

        try {
            const result = await service.execute(myPoints, enemyPoints, id);

            if (result.status === 404) {
                return res.status(404).json(result);
            }
            return res.json(result);
        } catch (err) {
            return res.json({error: err.message});
        }
    }
}

export default FinishMatchController;