const express = require("express")
const cors = require("cors")
const dados = require("./dados")

const rotaInicial = (req, res) => {
    res.json("Back-end está respondendo")
}

function autoIncrement() {
    return Number(dados[dados.length - 1].id) + 1
}

const mostrarDados = (req, res) => {
    res.send(dados)
}

const novoDado = (req, res) => {
    if (req.body) {
        res.send("Dado cadastrado corretamente")
    const nDado = req.body
    nDado.id = autoIncrement()
    dados.push(nDado)
    } else {
        res.send("Erro ao cadastrar dado")
    }
}

const buscarDadoPorId = (req, res) => {
    const id = req.params.id;
    const dadoLocalizado = dados.find((dado) => dado.id == id);

    if (dadoLocalizado) {
        res.send(dadoLocalizado);
    } else {
        res.status(404).send("O dado não foi localizado")
    }
};
const buscarDadoPorRisco = (req, res) => {
    const risco = req.params.nivel_risco;
    const dadoLocalizado = dados.find((dado) => dado.nivel_risco == risco);

    if (dadoLocalizado) {
        res.send(dadoLocalizado);
    } else {
        res.status(404).send("O dado não foi localizado")
    }
};

const buscarDadoPorTipo = (req, res) => {
    const tipo = req.params.tipo;
    const dadoLocalizado = dados.find((dado) => dado.tipo == tipo);

    if (dadoLocalizado) {
        res.send(dadoLocalizado);
    } else {
        res.status(404).send("O dado não foi localizado")
    }
};

const excluirDado = (req, res) => {
    const id = req.params.id;

    dados.forEach((dado, indice) => {
        if (dado.id == id) {
            dados.splice(indice, 1);
        }
    });

    res.send("Pedido excluido com sucesso!");
};

const alterarDado = (req, res) => {
    const id = req.params.id;
    const nDados = req.body;

    dados.forEach((dado) => {
        if (dado.id == id) {
            dado.sistema = nDados.dado;
            dado.local = nDados.local;
            dado.dataRegistro = nDados.dataRegistro;
            dado.valor = nDados.valor;
            dado.patrimonio = nDados.patrimonio;
        }
    });

    res.send("Dados atualizados com sucesso!");
};

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const porta = 3000

app.get('/t', rotaInicial)
app.post("/", novoDado)
app.get("/", mostrarDados)
app.get("/:id", buscarDadoPorId)
app.get("/risco/:nivel_risco", buscarDadoPorRisco)
app.get("/tipo/:tipo", buscarDadoPorTipo)
app.delete("/:id", excluirDado)
app.put("/:id", alterarDado)

app.listen(porta, () => {
    console.log(`Servidor respondendo em: http://localhost:${porta}`)
})