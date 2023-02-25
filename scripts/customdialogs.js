/* createDialog creates a new dialog on the page given a template with content, and an optional callback function
 *			NOTE: the template is assumed to have at least a content tag with id message
 *
 * template: query string corresponding to the template element used as the basis for the dialog
 * message: message to display with the dialog
 * callback: callback function (result, form) called when dialog is closed and 2 parameters:
 * 			result: whether the form was submitted or canceled as true/false
 * 			form: string containing the user input
 * 			NOTE: the callback should not change the dialog or form DOM nodes in any way!!!
 */
export function createDialog (template, message, callback=()=>{}) {
	let content = document.querySelector(template).content.cloneNode(true);

	let form = document.createElement("form");
	form.method = "dialog";
	form.append(content);

	let dialog = document.createElement("dialog");
	dialog.append(form);

	dialog.querySelector("#message").innerText = message;
	if (callback) {
		dialog.addEventListener("close", () => {
			callback(dialog.returnValue === "OK", new FormData(form));
			dialog.remove();
		});
	}
	document.body.append(dialog);
	dialog.showModal();
}