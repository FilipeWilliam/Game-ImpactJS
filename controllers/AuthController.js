import AuthService from "../services/AuthService.js";

class AuthController {
    async handle (req, res) {
        const {login, senha} = req.body;
        const service = new AuthService();

        try {
            const result = await service.execute(login, senha);

            if (result.status === 404) {
                return res.status(404).json(result);
            }
            return res.json(result);
        } catch (err) {
            return res.json({error: err.message});
        }
    }
}

export default AuthController;