import { Octokit } from "https://cdn.skypack.dev/@octokit/core";

window.addEventListener("DOMContentLoaded", init);

async function init () {
	const octokit = new Octokit()

	let repos = await octokit.request('GET /users/ltcptgeneral/repos', {
		username: 'ltcptgeneral'
	});

	let container = document.querySelector("#projects");

	repos.data.forEach((element) => {
		let content = document.querySelector("#project-article").content.cloneNode(true);
		content.querySelector("#project-name").innerText = element.name;
		content.querySelector("#project-desc").innerText = element.description;
		content.querySelector("#project-lang").innerText = element.language;
		content.querySelector("article").addEventListener("click", () => {
			window.location.assign(element.html_url);
		});
		container.append(content)
	});
}