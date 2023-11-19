// import * as fs from "fs"; // change to require
let fs = require('fs');
const {createClient} = require("@supabase/supabase-js");

const {JSONLoader} = require('langchain/document_loaders/fs/json')
const {RecursiveCharacterTextSplitter} = require("langchain/text_splitter");
const json2md = require("json2md");
const {SupabaseVectorStore} = require("langchain/vectorstores/supabase");
const {OpenAIEmbeddings} = require("langchain/embeddings/openai");
// import { SupabaseVectorStore } from 'langchain/vectorstores/supabase'
// import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
const aiAssistant = require('./ai')


module.exports = async function getRepoIssues (owner, repo) {
    let page = 1;
    let data = [];
    let state = 'all';

    while (true) {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues?state=${state}&page=${page}`);
        // console.log(response)
        const json = await response.json();
        data = data.concat(json);
        if (json.length < 100) {
            break;
        }
        page++;
    }

    let list_of_issues_details = []

    for (let issue of data) {
        const list_of_issues_detail = {
            'id': issue['id'],
            'html_url': issue['html_url'],
            'title': issue['title'],
            "body": issue["body"],
            "state": issue["state"],
        }
        list_of_issues_details = list_of_issues_details.concat(list_of_issues_detail)
    }

    // Save the data to a JSON file
    fs.writeFileSync(`issue-data-${owner}-${repo}.json`, JSON.stringify(list_of_issues_details, null, 2));

    const loader = new JSONLoader('issue-data-' +owner + '-' + repo + '.json');
    const docs = await loader.load();

    /// Embed and Upload to Supabase
    const sbApiKey = process.env.SUPABASE_API_KEY;
    const sbUrl = process.env.SUPABASE_URL;
    const openAIApiKey = process.env.OPENAI_API_KEY;
    const client = createClient(sbUrl, sbApiKey)
    await SupabaseVectorStore.fromDocuments(docs, new OpenAIEmbeddings({openAIApiKey}), {client, tableName: 'documents',})
    // await aiAssistant('An issue')
}

