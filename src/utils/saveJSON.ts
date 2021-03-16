import fs = require("fs");
import * as vscode from 'vscode';
import _path = require('path');


function saveJSON(data : any,pathA:string) {

    const template = vscode.Uri.file(_path.join(pathA,'assets', 'media', 'data.json'));

    console.log("antes")
    fs.writeFile(template.fsPath,data.categorias, (e) => {
        if (e) {
            console.error(e)
        } else {
            console.log("ok")
        }
    });

    console.log("des")

    console.log(data)
}

export { saveJSON }