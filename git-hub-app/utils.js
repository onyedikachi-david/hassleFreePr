// import * as fs from "fs"; // change to require
let fs = require('fs');
// const {createClient} = require("@supabase/supabase-js");

// const {}


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
        list_of_issues_details = {
            'id': issue['id'],
            'html_url': issue['html_url'],
            'title': issue['title'],
            "body": issue["body"],
            'user': issue['user']['login'],
            'created_at': issue['created_at']
        }
    }




    // Save the data to a JSON file
    fs.writeFileSync(`issue-data-${owner}-${repo}.json`, JSON.stringify(list_of_issues_details, null, 2));
}

// const supabase = createClient()