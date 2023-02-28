import { Octokit } from "https://cdn.skypack.dev/@octokit/core";

const octokit = new Octokit()
  
await octokit.request('GET /users/ltcptgeneral/repos', {
	username: 'ltcptgeneral',
	headers: {
	  	'X-GitHub-Api-Version': '2022-11-28'
	}
})