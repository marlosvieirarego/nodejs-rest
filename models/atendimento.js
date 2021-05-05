const conexao = require ('../infraestrutura/conexao');
const moment = require ('moment');

class Atendimento {
    adiciona(atendimento, res) {
        //const dataCriacao = new Date();
        //como não está recebendo data, cria uma
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');

        //pega a data recebida no req.body e formata 
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        
        const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteEhValido = atendimento.cliente.length >= 5;

        console.log(data);
        console.log(dataCriacao);

        const validacoes = [             
                {
                    nome: 'data',
                    valido: dataEhValida,
                    mensagem: 'Data deve ser maior ou igual a data atual'
                } ,
                {
                    nome: 'cliente',
                    valido: clienteEhValido,
                    mensagem: 'Nome do cliente deve ter mais de 4 caracteres'
                }
        ] ; 

        const erros = validacoes.filter(campo => !campo.valido);
        const existemErros = erros.length;

        if (existemErros) {
            res.status(400).json(erros);
        } else { 
            const atendimentoDatado = {...atendimento, dataCriacao, data};
            const sql = 'INSERT INTO Atendimentos SET ?';

            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if (erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(atendimentoDatado)
                }
            })
        };
    }

    lista(res) {
        const sql = 'SELECT * FROM Atendimentos';
        conexao.query(sql, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        });
    }

    buscaPorId(id, res) {
        const sql =  `SELECT * FROM Atendimentos WHERE ID=${id}`;
        conexao.query(sql, (erro, resultados) => {
            const atendimento = resultados[0];
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(atendimento)
            }
        });
    }

    altera(id, valores, res) {
        if (valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        } 
        const sql =  `UPDATE Atendimentos SET ? WHERE id = ?`;
        conexao.query(sql, [valores, id], (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        });
    }

    deleta(id, res) {
        const sql =  `DELETE FROM Atendimentos WHERE ID=${id}`;
        conexao.query(sql, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                console.log(resultados.affectedRows)
                res.status(200).json(resultados)
            }
        });
    }

}

module.exports = new Atendimento;