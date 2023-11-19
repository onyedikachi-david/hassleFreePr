const {ChatOpenAI} = require('langchain/chat_models/openai')
const { PromptTemplate } = require('langchain/prompts')
const {StringOutputParser} = require('langchain/schema/output_parser')
const {RunnablePassthrough, RunnableSequence} = require("langchain/schema/runnable")
const {createClient} = require("@supabase/supabase-js");
const {SupabaseVectorStore} = require("langchain/vectorstores/supabase");
const {OpenAIEmbeddings} = require("langchain/embeddings/openai");
const { RetrievalQAChain, loadQARefineChain } = require("langchain/chains");


function combineDocuments(docs){
    return docs.map((doc)=>doc.pageContent).join('\n\n')
}
const simplifyIssueTemplate = `
  Given an issue:

  \`{issue}\`
  
  Simplify the issue to contain just a summary of the key details. Include:
  
  - issue title
  - issue body
  
  Simplified issue:
`

const simplifyIssuePrompt = PromptTemplate.fromTemplate(simplifyIssueTemplate)
const issueTemplate = `
  You are an AI assistant helping out in GitHub issues.

  Issue details: {issue}

  Check if this issue exists in the context.

  If it does, check if there is a pull request that closes it:
    - Give a simplified Markdown response with:
      - [Issue title](Issue URL)
      - Summary of the issue body

  If it does not:
    - Do not add a comment
  
  Context: {context}

  Response:
`

const issuePrompt = PromptTemplate.fromTemplate(issueTemplate)

const prTemplate = `
  You are an AI assistant helping out with GitHub pull requests.

  Pull request details: {pr}

  Check if this pull request exists in the context.

  If it does:
    - Do not add a comment

  If it does not:
    - Identify any issues this PR would close
    - Give a Markdown formatted response with links to the closing issues
  
  Context: {context}

  Response:  
`

const pr_prompt = PromptTemplate.fromTemplate(prTemplate)

const openAIApiKey = process.env.OPENAI_API_KEY
const llm = new ChatOpenAI({ openAIApiKey })

module.exports = async function aiAssistant(issue_body) {

    const sbApiKey = process.env.SUPABASE_API_KEY;
    const sbUrl = process.env.SUPABASE_URL;
    const openAIApiKey = process.env.OPENAI_API_KEY;
    const client = createClient(sbUrl, sbApiKey)
    const embeddings = new OpenAIEmbeddings({openAIApiKey})

    const vectorStore = new SupabaseVectorStore(embeddings, {client, tableName: 'documents', queryName: 'match_documents'})
    const retriever = vectorStore.asRetriever()

    const simplifyChain = RunnableSequence.from([simplifyIssuePrompt, llm, new StringOutputParser()])
    const issueChain = RunnableSequence.from([issuePrompt, llm, new StringOutputParser()])

    const retrievalChain = RunnableSequence.from([
        prevIssue => prevIssue.standalone_issue,
        retriever,
        combineDocuments
    ])

    const chain = RunnableSequence.from([
        {
            standalone_issue: simplifyChain,
            original_input: new RunnablePassthrough()
        },
        {
            context: retrievalChain,
            issue: ({original_input}) => original_input.issue
        },
        issueChain
    ])

    const result = await chain.invoke({
        issue: issue_body,
    });
    console.log(result)
    return result
}

