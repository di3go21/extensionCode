// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import _path = require('path');
import fs = require('fs'); 
import { MiVersion } from './models/MiVersion';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "newsletter-sisnet-front-end" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('newsletter-sisnet-front-end.newsLetterFront-End', (uri:vscode.Uri) => {
		// The code you place here will be executed every time your command is executed
		const panel = vscode.window.createWebviewPanel(
			'Newsletter Sisnet Front-End',
			'Newsletter Sisnet Front-End',
			vscode.ViewColumn.One,
			{
				retainContextWhenHidden: true,
				enableScripts: true,
				localResourceRoots: [
					vscode.Uri.file(_path.join(context.extensionPath, 'assets'))
				]
			}
		);

		

		panel.webview.html=getTemplate(context,panel);

	});

	context.subscriptions.push(disposable);
}


function getTemplate(context: vscode.ExtensionContext,panel:vscode.WebviewPanel){
	const template = vscode.Uri.file(_path.join(context.extensionPath,'assets', 'media', 'template.html'));
	const dataUri = vscode.Uri.file(_path.join(context.extensionPath,'assets', 'media', 'data.json'));

	//leemos json

	const data=JSON.parse(fs.readFileSync(dataUri.fsPath).toString());

	//wrapeamos arrays con li
	for (const campo in data) {	
		
		if(campo!="version"){
			for (let index = 0; index < data[campo].length; index++) {
				data[campo][index]="<li style='margin-bottom: 10px; margin-left:40px;'>"+data[campo][index]+"</li>";				
			}
		}
	}
	

	//leemos el fichero
	var htmlAsString=  fs.readFileSync(template.fsPath).toString();

	//reemplazamos los marcadores {{}} con su contenidoestiloestiloestilo
	for (const campo in data) {	
		if(data[campo].length>0){
			htmlAsString=htmlAsString.replace("{{"+campo+"}}",data[campo].join(''));
		}
		else{
			console.log(campo)
			htmlAsString=htmlAsString.replace("{{"+campo+"}}",'');
		}
	}

	return htmlAsString;
}




// this method is called when your extension is deactivated
export function deactivate() {}
