// dividiu os dados da aplicação em várias pastas para separar as funcionalidades

const customExpress = require ('./config/customExpress');
const conexao = require ('./infraestrutura/conexao');
const tabelas = require ('./infraestrutura/tabelas');

//conecta ao banco de dados, se der ok, sobe o servidor
conexao.connect((erro) => {
    if (erro) { 
        console.log(erro)
    } else {
        console.log('BD conectado com sucesso')
        tabelas.init(conexao);
        const app = customExpress();
        app.listen(3000, () => {
            console.log('servidor rodando na porta 3000');
        })
    }
});


