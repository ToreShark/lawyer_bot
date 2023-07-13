const { Scenes } = require('telegraf');

const questionScene = new Scenes.BaseScene('question')
  .enter((ctx) => ctx.reply('Пожалуйста, задайте свой вопрос.'))
  .on('text', (ctx) => {
    const userQuestion = ctx.message.text.toLowerCase();
    if (userQuestion.includes('алименты') && (userQuestion.includes('твердая сумма') 
    || userQuestion.includes('алименты в МРП') || userQuestion.includes('алименты в твердой сумме')
    || userQuestion.includes('алименты в тенге') || userQuestion.includes('алименты в денежной сумме')
    )) {
      ctx.reply('Алименты в виде конкретной денежной суммы - это определенная сумма денег, которую один из бывших супругов должен выплачивать другому после официального прекращения брака для поддержания его или ее жизненных потребностей или для обеспечения потребностей их совместных детей.');
    } else if (userQuestion.includes('алименты')) {
      ctx.scene.enter('court_decision');
    } else {
      ctx.reply('Я могу помочь с вопросами об алиментах. Пожалуйста, задайте свой вопрос еще раз.');
    }
  });

module.exports = questionScene;