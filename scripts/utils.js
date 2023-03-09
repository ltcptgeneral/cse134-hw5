export async function request (url, method, body = null) {
	let content = {
		method: method,
		headers: {
			Accept: "application/json"
		}
	}
	if (body) {
		let prms = new URLSearchParams(body);
		content.body = prms.toString();
		content.headers["Content-Type"] = "application/x-www-form-urlencoded";
	}
	let response = await fetch(url, content)
	.then((response) => {
		return response;
	})
	.catch((error) => {
		throw new NetworkError(error);
	});

	let data = await response.json();
	data.status = response.status;
	return data;
}

export function handleResponse (output, response) {
	document.querySelector(output).innerHTML = buildTable(response, 1);
}

function buildTable (object, idx) {

	if (object instanceof Object) {
		let table = "";
		if (idx === 1) { // topmost table gets some margin and a border
			table += `<table style="margin-top: 10px; border: 1px solid black;">`;
		}
		else {
			table += `<table>`;
		}
		Object.keys(object).forEach((element) => {
			table += `<tr><td>${element}</td><td>${buildTable(object[element], idx + 1)}</td></tr>`;
		});
		table += "</table>"
		
		return table;
	}
	else {
		return object;
	}
}