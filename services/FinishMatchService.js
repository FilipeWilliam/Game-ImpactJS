import pkg1 from 'mysql2/promise';
const mysql = pkg1;

class FinishMatchService {
    async execute(myPoints, enemyPoints, id) {
        const connection = await mysql.createConnection("mysql://root@localhost/jogo");

        try {
            let result = await connection.query(`SELECT * FROM  jogadores WHERE ID = ${id}`);
            let pontosAtuais = result[0][0].PONTOS;
            let pontosFinais;

            if(myPoints > enemyPoints) {
                pontosFinais = pontosAtuais + (myPoints - enemyPoints);
            } else {
                pontosFinais = pontosAtuais - (enemyPoints - myPoints);
            }

            await connection.query(`UPDATE jogadores SET PONTOS = ${pontosFinais} WHERE ID = ${id}`);

            return {message: 'Pontuação alterada com suceso!'};
        } catch (error) {
            return error;
        }

    }
}

export default FinishMatchService;