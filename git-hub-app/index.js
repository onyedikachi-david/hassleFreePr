


/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
const getRepoIssues = require("./utils");

const fs = require("fs");
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
    const issueComment = context.issue({
      body: "Thanks for opening this issue!",
    });
    return context.octokit.issues.createComment(issueComment);
  });

  // getRouter()

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
