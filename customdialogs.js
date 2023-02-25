/*
 * message: message to display with the dialog
 * cancel: default false - enable the cancel button
 * prompt: default false - enable the input field in the dialog
 * callback: callback function (result, form) called when dialog is closed and 2 parameters:
 * 			result: whether the form was submitted or canceled as true/false
 * 			form: string containing the user input
 * 			NOTE: the callback should not change the dialog or form DOM nodes in any way!!!
 */
export function createDialog (message, cancel=false, prompt=false, callback=null) {
	let template = document.querySelector("#dialog-template");
	let clone = template.content.cloneNode(true);
	let dialog = clone.querySelector("dialog");
	let form = clone.querySelector("form");
	clone.querySelector("#message").innerText = message;
	if (prompt) {
		clone.querySelector("#prompt-input").classList.remove("hidden");
		clone.querySelector("#prompt-input").disabled = false;
	}
	if (cancel) {
		clone.querySelector("#cancel").classList.remove("hidden");
		clone.querySelector("#cancel").disabled = false;
	}
	if (callback) {
		dialog.addEventListener("close", () => {
			callback(dialog.returnValue === "OK", (new FormData(form)).get("prompt-input"));
		});
	}
	document.body.append(clone);
	dialog.showModal();
}