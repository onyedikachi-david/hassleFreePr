/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
const getRepoIssues = require("./utils");

const fs = require("fs");
const aiAssistant = require('./ai')
module.exports = (app) => {
  app.log.info("Yay, the app was loaded!");

  app.on("installation.created", async (context) => {
    await getRepoIssues(context.payload.sender.login, context.payload.repositories[0].name)
  })
  app.on("issues.opened", async (context) => {

    const issue = context.payload.body // issue details
    const aiResponse = await aiAssistant(issue)
    // console.log(aiResponse)
    app.log.info("Issue log below")
    app.log.info(issue)
    app.log.info("AI response below")
    app.log.info(aiResponse)


    const params = context.issue({ body: `${aiResponse}` });
    return context.octokit.issues.createComment(params);
  });
};
