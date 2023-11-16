// import { ChatOpenAI } from 'langchain/chat_models/openai'
// import { PromptTemplate } from 'langchain/prompts'

const {ChatOpenAI} = require('langchain/chat_models/openai')
const { PromptTemplate } = require('langchain/prompts')
const {StringOutputParser} = require('langchain/schema/output_parser')
const {RunnablePassthrough, RunnableSequence} = require("langchain/schema/runnable")

const issue_template = `
You are an AI assistant helping triage GitHub issues.
Issue details: {issue}
If this issue already exists, find the existing issue and comment on it with a link back to this one. 
Also identify any related issues or pull requests and comment with links to those.
If this is a new issue, create it and try to find any potentially related existing issues or pull requests to reference in a comment.
Response: `

const pr_template = `
You are an AI assistant helping triage GitHub pull requests.
Pull request details: {pr}
If this pull request already exists, find it and comment linking any related issues or other pull requests.
If this is a new pull request, create it and identify any issues it would close. Comment on the PR with a list of issues closed.
Response: `

const issue_prompt = PromptTemplate(issue_template)
const pr_prompt = PromptTemplate(pr_template)


const openAIApiKey = process.env.OPENAI_API_KEY
const llm = new ChatOpenAI({ openAIApiKey })