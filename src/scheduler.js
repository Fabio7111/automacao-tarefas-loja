const cron = require("node-cron");
const montarMensagem = require("./mensagem");

console.log("✅ Scheduler ativo");

cron.schedule("0 8 * * *", async () => {
  try {
    const mensagem = await montarMensagem();

    if (mensagem) {
      console.log("📤 Mensagem gerada com sucesso");
      // aqui no futuro entra o envio pro WhatsApp
    }
  } catch (error) {
    console.error("❌ Erro no scheduler:", error.message);
  }
});
