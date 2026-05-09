// Listagem de torneios em destaque (mock até a integração com a API).

const destaquesTorneios = [
    { jogo: 'CS2', nome: 'Championship Open', premio: 'R$ 5.000' },
    { jogo: 'Valorant', nome: 'Pro Series', premio: 'R$ 8.000' },
    { jogo: 'Marvel Rivals', nome: 'Rivals Cup', premio: 'R$ 1.500' },
    { jogo: 'CoD: Warzone', nome: 'Invite Only', premio: 'R$ 3.000' }
];

function listarDestaques() {
    return destaquesTorneios.map(
        (t) => `Jogo: ${t.jogo} | Nome: ${t.nome} | Prêmio: ${t.premio}`
    );
}

if (typeof module !== 'undefined') module.exports = { destaquesTorneios, listarDestaques };
