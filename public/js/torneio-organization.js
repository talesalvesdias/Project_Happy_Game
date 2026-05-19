// ==========================================
// ARRAY DE TORNEIOS (SIMULA BACK-END/API)
// ==========================================

const torneios = [
    {
        id: 1,
        jogo: "CS2",
        nome: "CS2 Championship",
        vagas: 128,
        inscritos: 88,
        premio: "R$ 5.000",
        status: "Aberto"
    },

    {
        id: 2,
        jogo: "Valorant",
        nome: "Valorant Masters",
        vagas: 64,
        inscritos: 52,
        premio: "R$ 8.000",
        status: "Aberto"
    },

    {
        id: 3,
        jogo: "Marvel Rivals",
        nome: "Marvel Rivals Cup",
        vagas: 32,
        inscritos: 27,
        premio: "R$ 2.000",
        status: "Aberto"
    }
];


// ==========================================
// VARIÁVEL DO FILTRO ATUAL
// ==========================================

let filtroAtual = "Todos";


// ==========================================
// RENDERIZAÇÃO DOS TORNEIOS
// ==========================================

function renderizarTorneios(lista) {

    const container =
        document.getElementById("container-torneios");

    if (!container) return;

    container.innerHTML = "";

    lista.forEach(torneio => {

        const porcentagem =
            (torneio.inscritos / torneio.vagas) * 100;

      const coluna = document.createElement("div");

coluna.classList.add(
    "col-12",
    "col-md-6",
    "col-xl-4"
);


const card = document.createElement("div");

card.classList.add("tournament-card");

card.innerHTML = `

    <div class="card-header">

        <span class="game-badge">
            ${torneio.jogo}
        </span>

        <span class="status-badge">
            ${torneio.status}
        </span>

    </div>

    <h2>${torneio.nome}</h2>

    <div class="card-info">

        <p>
            <strong>Prêmio:</strong>
            ${torneio.premio}
        </p>

        <p>
            <strong>Inscritos:</strong>
            ${torneio.inscritos}/${torneio.vagas}
        </p>

    </div>

    <div class="progress-bar">

        <div 
            class="progress-fill"
            style="width:${porcentagem}%"
        ></div>

    </div>

    <button class="btn-inscrever">
        Inscrever-se
    </button>

`;

coluna.appendChild(card);

container.appendChild(coluna);
    });
}



// ==========================================
// FILTRO DOS TORNEIOS
// ==========================================

function filtrarTorneios(jogo) {

    filtroAtual = jogo;

    if (jogo === "Todos") {

        renderizarTorneios(torneios);

        return;
    }

    const filtrados = torneios.filter(torneio => {

        return torneio.jogo === jogo;

    });

    renderizarTorneios(filtrados);
}



// ==========================================
// POLLING (ATUALIZAÇÃO AUTOMÁTICA)
// ==========================================

function atualizarTorneiosTempoReal() {

    torneios.forEach(torneio => {

        if (torneio.inscritos < torneio.vagas) {

            const novosInscritos =
                Math.floor(Math.random() * 3);

            torneio.inscritos += novosInscritos;

            if (torneio.inscritos >= torneio.vagas) {

                torneio.inscritos =
                    torneio.vagas;

                torneio.status =
                    "Lotado";
            }
        }
    });

    // MANTÉM O FILTRO ATIVO

    filtrarTorneios(filtroAtual);
}



// ==========================================
// EVENTOS
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    renderizarTorneios(torneios);

    const botoes =
        document.querySelectorAll(".filter-btn");

    botoes.forEach(botao => {

        botao.addEventListener("click", () => {

            // REMOVE BOTÃO ATIVO

            document
                .querySelectorAll(".filter-btn")
                .forEach(btn => {

                    btn.classList.remove("active");

                });

            // ADICIONA BOTÃO ATIVO

            botao.classList.add("active");

            // FILTRO

            const jogo =
                botao.dataset.game;

            filtrarTorneios(jogo);
        });
    });

    // POLLING

    setInterval(() => {

        atualizarTorneiosTempoReal();

    }, 5000);
});