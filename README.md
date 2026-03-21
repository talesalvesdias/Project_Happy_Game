
## Parte 1: Dados do Grupo

Tales Alves Dias - rm568839
Danilo Ricco Rosa - rm571585
Leonardo Theodoro Moraes - rm570853
Henzo Weelthyner Chaves Santos - rm571575
## Parte 2: Concepção e Planejamento

#### Tema do Projeto -
- **Sistema de matchmaking automatico que une jogadores que querem jogar competitivamente em torneios** 
#### Funcionalidades do Projeto -  
- **Atraves de uma plataforma, jogadores que almeijam ganhar dinheiro jogando jogos competitivos podem participar de torneios por meio de um matchmaking**
- **Cada jogador vai ter um 'rank' onde o algoritmo vai buscar jogadores com um rank proximo, tornando partidas mais justas**
- **Cada torneio vai possuir as suas regras especificas**
- **A plataforma vai conter um sistema de moedas, onde o usuario pode trocar por itens de jogos ou dinheiro real**
#### Publico-Alvo -
- **Jogadores de jogos competitivos (Counter-Strike 2, Valorant, Marvel Rivals, Call of Duty etc)**
#### Cronograma -
- *Ver arquivo cronograma_victoryhub.pdf*

## Parte 3: Reflexão sobre Software e Hardware

#### Requisitos Técnicos -

- **Sistema Operacional capaz de rodar qualquer navegador web moderno (Google Chrome, Firefox, Brave, Edge etc)**
- **Como a plataforma vai servir de intermedio entre jogadores não é necessario possuir nenhum hardware potente**
- **Como requisito implicito, cada jogo promovido pela plataforma irá ter seus proprios requisitos técnicos (A plataforma divulgará quais são)**

## Parte 4: Utilidade nos Sistemas de Informação

### 1. Utilidade da aplicação para Sistemas de Informação

- #### Que **dados** o sistema coleta?
	- Email do usuário
	- Endereço IP
	- Contas vinculadas a plataformas de jogos (Steam, Epic Games, GoG, Battle.net)
	- Histórico de partidas
	- Estatísticas de desempenho do jogador (vitórias, derrotas, kills, ranking)
	- Histórico de apostas ou participação em torneios
	- Dados de acesso (horário de login, frequência de uso)

- #### Como esses dados são **transformados em informação útil**?
	- O **histórico de partidas** é transformado em estatísticas de desempenho do jogador, como taxa de vitória, ranking ou nível de habilidade.
	- O **endereço IP e os dados de acesso** podem ser utilizados para identificar padrões de uso, possíveis fraudes ou múltiplas contas.
	- As **contas vinculadas a plataformas de jogos** permitem verificar a identidade do jogador e integrar informações sobre partidas realizadas.    
	- O **histórico de torneios e apostas** gera relatórios sobre popularidade de eventos, volume de apostas e engajamento da comunidade.

- #### Quem **usa essas informações**?
	- **Administradores da plataforma**, para monitorar o funcionamento do sistema e gerenciar torneios e atividades.
	- **Jogadores**, para acompanhar suas estatísticas, desempenho e histórico de partidas.
	- **Equipe de gestão ou desenvolvimento**, para analisar o crescimento da plataforma e melhorar funcionalidades.

- #### Que **decisões podem ser tomadas com elas**?
	- Criar novos torneios com base nos jogos mais populares.
	- Ajustar regras ou formatos de competição para melhorar a experiência dos jogadores.
	- Detectar e prevenir fraudes ou comportamentos suspeitos.
	- Melhorar o sistema de matchmaking entre jogadores com níveis semelhantes.
	- Planejar estratégias de crescimento da plataforma e engajamento da comunidade.

### 2. Tipo de Sistema de Informação

##### Sistemas Operacionais (TPS – Transaction Processing Systems)

*Por conta do volume de dados que precisam ser processados, ter sistema de vendas, pagamentos etc*

### 3. Relação com a Cadeia de Valor

| *Etapa*       | *Atividade*                                            |
| ------------- | ------------------------------------------------------ |
| Entrada       | Coleta de dados dos jogadores                          |
| Processamento | Análise e cálculo de estatísticas                      |
| Armazenamento | Registro em banco de dados                             |
| Distribuição  | Apresentação de rankings, resultados e relatórios      |
| Valor         | Melhor experiência competitiva e decisões estratégicas |

### 4. Uso Estratégico da Informação

- Identificar trends de jogos (Quais jogos estão mais na moda)
- Identificar quais formatos competitivos são mais utilizados
- Identificar comportamento do usuario na plataforma, oferencendo campanhas, eventos, recompensas dependendo da atividade do usuario
- Previnir Fraudes com base em informações como: endereço IP, bans de contas, comportamento suspeito
- Definir estrategias de marketing para atrair novos usuários

## Parte 5: Desenvolvimento

#### Home Page - 

- Banner + Logo do VictoryHub
- Slogan Chamativo
- Botão de participar de um torneio

#### Tournament Page (Torneios) -

- Listar os Torneios Ativos (Deixar Estático por enquanto)
- Listar quantidade de jogadores em cada Torneio

#### About Page (Sobre Nos) -

- Contar a historia do projeto
- Contar sobre os criadores do projeto
- Objetivos do Projeto

#### Contact Page (Contato) -

- Formulario de contato que envia um email para os desenvolvedores
- Link para contato no Whatsapp (Futuramente)

#### Feedback Page (Redirect)

- Executar alguma animação de sucesso
- Exibir uma mensagem de agradecimento





