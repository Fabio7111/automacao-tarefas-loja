const cron = require("node-cron");
const montarMensagem = require("./mensagem");
const enviarWhatsApp = require("./whatsapp");

console.log("✅ Scheduler ativo – WhatsApp conectado");

cron.schedule("*/1 * * * *", async () => {
  try {
    const mensagem = await montarMensagem();

    if (mensagem) {
      await enviarWhatsApp(mensagem);
      console.log("📤 Mensagem enviada no WhatsApp");
    } else {
      console.log("⚠️ Nenhuma tarefa para hoje");
    }
  } catch (error) {
    console.error("❌ Erro ao enviar WhatsApp:", error.message);
  }
});
