require('dotenv').config();
const { Telegraf, Markup, Scenes, session } = require('telegraf');
const text = require('./const');

const bot = new Telegraf(process.env.BOT_TOKEN);



const questionScene = require('./scenes/questionScene');
const courtDecisionScene = require('./scenes/courtDecisionScene');
const stage = new Scenes.Stage([questionScene, courtDecisionScene]);

bot.use(session());
bot.use(stage.middleware());

bot.command('begin', (ctx) => ctx.scene.enter('question'));

bot.start((ctx) => ctx.reply(`Привет ${ctx.message.from.first_name ? ctx.message.from.first_name : 'пользователь'}!`));
bot.help((ctx) => ctx.reply(text.commands));
bot.command('course', async (ctx) => {
  try {
    await ctx.replyWithHTML('<b>Курсы</b>', Markup.inlineKeyboard(
      [
        [Markup.button.callback('Редакторы', 'btn_1'), Markup.button.callback('Обзоры', 'btn_2'), Markup.button.callback('JS', 'btn_3')],
        [Markup.button.callback('Казахи сила', 'btn-4')]
      ]
    ))
  } catch (e) {
    console.error(e)
  }
});

bot.launch();
function addActionBot(name, src, text) {
    bot.action(name, async (ctx) => {
        try {
            await ctx.answerCbQuery();
            if (src != false) {
                await ctx.replyWithPhoto({
                    source: src
                });
            }
            await ctx.replyWithHTML(text, {
                disable_web_page_preview: true
            });
        }
        catch (e) {
            console.error(e);
        }
    });
}
addActionBot('btn_1', false, text.text1);
addActionBot('btn_2', false, text.text2);
addActionBot('btn_3', false, text.text3);
addActionBot('btn-4', false, text.text4);
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
