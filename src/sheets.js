const axios = require("axios");

const SHEET_ID = "1yL2hhsJV_kVcJXIDKr2Zi7R9g1Sw3qRjB86pdJ_HlB8";
const GVIZ_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;

async function lerTarefas() {
  const response = await axios.get(GVIZ_URL);
  const text = response.data;

  const json = JSON.parse(
    text.substring(text.indexOf("{"), text.lastIndexOf("}") + 1)
  );

  const rows = json.table.rows;
  const tarefas = {};

  rows.forEach((row) => {
    if (!row.c || row.c.length < 3) return;

    const diaRaw = row.c[0]?.v;
    const turnoRaw = row.c[1]?.v;
    const tarefaRaw = row.c[2]?.v;

    if (diaRaw === "dia" || turnoRaw === "turno" || tarefaRaw === "tarefa")
      return;

    const dia = diaRaw.toLowerCase().trim();
    const turno = turnoRaw.toLowerCase().trim();

    if (!tarefas[dia]) tarefas[dia] = {};
    if (!tarefas[dia][turno]) tarefas[dia][turno] = [];

    tarefas[dia][turno].push(tarefaRaw.trim());
  });

  return tarefas;
}

module.exports = lerTarefas;
