


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
    // console.log(context)
    await getRepoIssues(context.payload.sender.login, context.payload.repositories[0].name)
    // app.log.info(context)
    // context.octokit.paginate(
    //     context.octokit.issues.list, context.payload (response) => response.data.issues.forEach((issue) => {
    //       context.log.info("Issue: ", issue.title);
    //     })
    // )
  })
  app.on("issues.opened", async (context) => {
    // Load and call the AI function passing in the context as query to the function.

    const issueComment = context.issue({
      body: await aiAssistant(context.payload.body),
    });
    console.log(issueComment)
    /*
    *{
  output_text: 'Based on the new context provided, it appears that the phrase "started the real structure" is not related to the pull request with the title "Search feature Now working." Therefore, the original answer that mentions a pull request title of "started the real structure" remains valid as it is not directly connected to the new context.'
}
{
     */
    app.log.info(issueComment)
    return context.octokit.issues.createComment(issueComment);
  });


  // getRouter()

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
