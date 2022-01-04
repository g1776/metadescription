// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
let fs = require("fs");
var temp = require('temp');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "metadescription" is now active!');

	
	function loadDescription(id) {
		const description = context.globalState.get(id);

		// Automatically track and cleanup files at exit
		temp.track();

		var stream = temp.createWriteStream(`%start%${id}%end%`);
		stream.write(description);

		vscode.workspace.openTextDocument(stream.path)
		.then( doc => {
			vscode.window.showTextDocument( doc );
			vscode.languages.setTextDocumentLanguage(doc, "markdown");
			vscode.workspace.onDidCloseTextDocument()
		})
		.then( editor => {
			let editBuilder = textEdit => {
				textEdit.insert( new vscode.Position( 0, 0 ),  "");
			};

			return editor.edit( editBuilder, {
					undoStopBefore: true,
					undoStopAfter: false
				} )
				.then( () => editor );
		} );
	}

	
	context.subscriptions.push(
		vscode.commands.registerCommand('metadescription.main', uri => {
	
		// get timestamp of file
		const { birthtime } = fs.statSync(uri.fsPath)
		const id = birthtime.getTime().toString();

		// check if file already has description
		if (!context.globalState.keys().includes(id)) {

			// add default markdown
			var filename = uri.fsPath.replace(/^.*[\\\/]/, '')
			context.globalState.update(id, `#  __${filename}__ Description\nMy super cool file...`)
			.then( () => loadDescription(id))
			
		} else { loadDescription(id) }	

	}));


	context.subscriptions.push(vscode.workspace.onDidSaveTextDocument(event => {
		const newDescription = event.getText();

		// get id within filename between %start% and %end%
		const id = event.fileName.substring(
			event.fileName.lastIndexOf("%start%") + 7, 
			event.fileName.lastIndexOf("%end%")
		);
		context.globalState.update(id, newDescription);
	}))
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
