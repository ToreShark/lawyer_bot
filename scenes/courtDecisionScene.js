const { Scenes } = require('telegraf');

const courtDecisionScene = new Scenes.BaseScene('court_decision')
  .enter((ctx) => ctx.reply('У вас есть решение суда на руках?'))
  .command('exit', (ctx) => {
    ctx.reply('Вы вышли из режима вопросов.');
    ctx.scene.leave();
  })
  .on('text', (ctx) => {
    if (ctx.message.text.toLowerCase() === 'да') {
      ctx.reply('Вы можете обратиться в палату частных судебных исполнителей для взыскания алиментов. Нажмите /begin для начала работы с ботом.');
      ctx.scene.leave();
    } else if (ctx.message.text.toLowerCase() === 'нет') {
      ctx.reply('Вам следует обратиться в суд для получения решения о взыскании алиментов. Нажмите /begin для начала работы с ботом.');
      ctx.scene.leave();
    } else {
      ctx.reply('Пожалуйста, ответьте "да" или "нет".');
    }
  });

module.exports = courtDecisionScene;