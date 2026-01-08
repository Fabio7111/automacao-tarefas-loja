const lerTarefas = require("./sheets");

function diaSemanaHoje() {
  const dias = [
    "domingo",
    "segunda",
    "terca",
    "quarta",
    "quinta",
    "sexta",
    "sabado"
  ];
  return dias[new Date().getDay()];
}

async function montarMensagem() {
  const tarefasSemana = await lerTarefas();
  const dia = diaSemanaHoje();
  const turnos = tarefasSemana[dia];

  if (!turnos) return null;

  let mensagem = `📋 *TAREFAS – ${dia.toUpperCase()}*\n\n`;

  for (const turno in turnos) {
    const emoji = turno === "diurno" ? "🕘" : "🌙";

    mensagem += `${emoji} *Turno ${turno}*\n`;

    turnos[turno].forEach(tarefa => {
      mensagem += `• ${tarefa}\n`;
    });

    mensagem += "\n";
  }

  return mensagem;
}

module.exports = montarMensagem;
