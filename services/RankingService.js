import pkg1 from 'mysql2/promise';
const mysql = pkg1;

class RankingService {
    async execute() {
        const connection = await mysql.createConnection("mysql://root@localhost/jogo");

        try {
            let [rows] = await connection.query(`SELECT * FROM jogadores ORDER BY pontos DESC`);

            return {entities : rows};
        } catch (error) {
            return error;
        }

    }
}

export default RankingService;