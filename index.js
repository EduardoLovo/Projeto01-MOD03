const express = require('express');
const app = express();

const port = 3500;

    // lista de games
const games = [
    'Mario Kart',
    'Valorant',
    'Zelda',
    'GTA',
    'Call of Duty',
    'CS-GO',
    'Mortal Kombat',
    'donkey kong',
    'Minecraft',
    'Super Mario'
];

    // lista de frases para aparecer no index
const msgInicio = [
    'Bem vindos',
    'Ola amigo, bem vindo ao servidor',
    'Servidor de jogos',
    'Este é meu servidor'
]


    // random da frase do index
function randomMinMax(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

function frase(num){
    return msgInicio[num];
}
    // primeira rota
app.get('/', (req, res) =>{
    res.send(`<h1>${frase(randomMinMax(0,3))}</h1>`);
});
//------------------------------------------------------


    // for para aparecer um em baixo do outro
games.forEach(function(item, indice){
    console.log(item, indice);
})
//-------------------------------------------------------


    // rota games
app.get('/games', (req, res) =>{
    res.send(games);
});
//-----------------------------------------------------


    // rota seleção de game
app.get('/games/:id', (req, res) =>{
    const id = req.params.id -1;
    const game = games[id];
    if (!game){
        res.send('Game não encontrado');
    }
    res.send(game);
    
});
//-----------------------------------------------------


    // rota game aleatório
function randomgame(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

function jogo(num){
    return games[num];
};

app.get('/jogo', (req, res) =>{
    res.send(`<h1>${jogo(randomgame(0,games.length))}</h1>`);
});
//------------------------------------------------------


    // rota para cadastrar um game
app.post('/games', (req, res) => {
    const game = req.body.game;
    const id = games.length;

    games.push(game);

    res.send(`Game adicionado com sucesso: ${game}. O id do Game é ${id}.`);
});
//------------------------------------------------------


    // rota para atualizar game (substituir)
app.put('/games/:id', (req, res) => {
    const id = req.params.id - 1;
    const game = req.body.game;
    const nomeAnterior = games[id];

    games[id] = game;

    res.send(`Game anterior: ${nomeAnterior}, atualizado para: ${game}.`);
});
//--------------------------------------------------------


    // rota para deletar game
app.delete('/games/:id', (req, res) => {
    const id = req.params.id - 1;
    delete games[id];
    res.send('Game excluido com sucesso');
});
//-------------------------------------------------------



app.listen(port, () =>{
    console.info(`App esta rodando em: http://localhost:${port}/`);
});
