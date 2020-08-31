require('dotenv').config;
const Bot = require('node-telegram-bot-api');
const {
  INPUT_STATUS: status,
  INPUT_TOKEN: tgToken,
  INPUT_CHAT: chatId,
  INPUT_IU_TITLE: title,
  INPUT_IU_NUM: num,
  INPUT_IU_ACTOR: actor,
  INPUT_IU_BODY: body,
  INPUT_PR_NUM: prNum,
  INPUT_PR_STATE: prState,
  INPUT_PR_TITLE: prTitle,
  INPUT_PR_BODY: prBody,
  GITHUB_EVENT_NAME: ghEvent,
  GITHUB_REPOSITORY: repo,
  GITHUB_ACTOR: ghActor, // the actor that trigger the workflow
  GITHUB_SHA: sha,
  GITHUB_WORKFLOW: ghWorkflow,
  INPUT_PR_COMMIT_MESSAGE: prCommitMessage,
  INPUT_PR_BRANCH_NAME: prBranchName
} = process.env;

const bot = new Bot(tgToken);

const buildPrContent = () => {
  let message =
    '-------------------------------------\n' +
    `Workflow build <b>${status}!</b>\n` +
    `Title: ${title}\n` +
    `Branch: ${prBranchName}\n` +
    `User: ${ghActor}\n` +
    '<b>Commit Msg:</b>\n' +
    `${prCommitMessage}\n\n` +
    `<a href="https://github.com/${repo}/commit/${sha}/checks">Job Log here</a>\n` +
    `<a href="https://github.com/${repo}/pull/${prNum}">Link to issue/PR</a>\n` +
    '--------------------------------------';
  return message;
};

const evresp = (gevent) => {
  switch (gevent) {
    case 'pull_request':
      return buildPrContent();
  }
};

const output = evresp(ghEvent);
bot.sendMessage(chatId, output, { parse_mode: 'html' });
