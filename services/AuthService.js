import pkg1 from 'mysql2/promise';
const mysql = pkg1;
import jsonwebtoken from 'jsonwebtoken';

class AuthService {
    async execute(login, senha) {
        const connection = await mysql.createConnection("mysql://root@localhost/jogo");
        try {
            let [rows] = await connection.query(`SELECT * FROM jogadores WHERE login = "${login}"`);
            
            if(rows.length === 0) {
                return {
                    error: "Nenhum usuário encontrado.",
                    status: 404
                }
            }

            let userFound = rows[0];

            if(userFound.SENHA !== senha) {
                return {error: "Senha incorreta.", status: 404};
            }

            const token = jsonwebtoken.sign(
                {
                    user: {
                        id: userFound.ID,
                    }
                },
                '47B94FAEF1DDB6CFA62163FE73644679029DA4E9',
                {
                    expiresIn: "1d",
                    subject: userFound.ID.toString()
                }
            )

            const user = {
                id: userFound.ID,
                nome: userFound.NOME,
                email: userFound.EMAIL,
                login: userFound.LOGIN,
                status: 200
            }

            return {token, user};
        } catch (error) {
            return error;
        }

    }
}

export default AuthService;