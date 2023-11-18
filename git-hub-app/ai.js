const {ChatOpenAI} = require('langchain/chat_models/openai')
const { PromptTemplate } = require('langchain/prompts')
const {StringOutputParser} = require('langchain/schema/output_parser')
const {RunnablePassthrough, RunnableSequence} = require("langchain/schema/runnable")
const {createClient} = require("@supabase/supabase-js");
const {SupabaseVectorStore} = require("langchain/vectorstores/supabase");
const {OpenAIEmbeddings} = require("langchain/embeddings/openai");
const { RetrievalQAChain, loadQARefineChain } = require("langchain/chains");

const simplifyIssueTemplate = `
  Given an issue:

  \`{issue}\`
  
  Simplify the issue to contain just a summary of the key details. Include:
  
  - issue title
  - issue body
  
  Simplified issue:
`
const issueTemplate = `
  You are an AI assistant helping out in GitHub issues.

  Issue details: {issue}

  Check if this issue exists in the context.

  If it does, check if there is a pull request that closes it:
    - Give a simplified Markdown response with:
      - [Issue title](Issue URL)

  If it does not:
    - Do not add a comment
  
  Context: {context}

  Response:
`

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

// const pr_prompt = PromptTemplate(pr_template)


const openAIApiKey = process.env.OPENAI_API_KEY
const llm = new ChatOpenAI({ openAIApiKey })

module.exports = async function aiAssistant(issue_body) {

    // console.log(response)
    const sbApiKey = process.env.SUPABASE_API_KEY;
    const sbUrl = process.env.SUPABASE_URL;
    const openAIApiKey = process.env.OPENAI_API_KEY;
    const client = createClient(sbUrl, sbApiKey)
    const embeddings = new OpenAIEmbeddings({openAIApiKey})

    const vectorStore = new SupabaseVectorStore(embeddings, {client, tableName: 'documents', queryName: 'match_documents'})
    // const retriever = vectorStore.asRetriever()
    //
    //
    //
    //
    // const simplify_issue_prompt = PromptTemplate.fromTemplate(simplifyIssueTemplate)
    // const simplify_issue_chain = simplify_issue_prompt.pipe(llm).pipe(new StringOutputParser())
    // const response2 = await retriever.invoke('Issue')
    // const response = await simplify_issue_chain.invoke({issue: "All chains."})
    // console.log(response)
    // console.log('response 2: ', response2)


    const chain = new RetrievalQAChain({
        combineDocumentsChain: loadQARefineChain(llm),
        retriever: vectorStore.asRetriever(),
    });

    const result = await chain.call({
        query: 'started the real structure\'',
    });
    console.log(result)
}

