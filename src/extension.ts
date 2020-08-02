// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as js from "js-beautify";
import { formatRazor } from "./formatters/formatRazor";

export function format(
    document: vscode.TextDocument,
    range: vscode.Range | null,
    options?: vscode.FormattingOptions
): vscode.ProviderResult<vscode.TextEdit[]> {
    if (range === null) {
        let start = new vscode.Position(0, 0);
        let end = new vscode.Position(
            document.lineCount - 1,
            document.lineAt(document.lineCount - 1).text.length
        );
        range = new vscode.Range(start, end);
    }

    let lineIndex = 0;
    for (lineIndex = 0; lineIndex < document.lineCount; lineIndex++) {
        const firstLetter = (document.lineAt(lineIndex).text ?? "").trim();
        if (!firstLetter.startsWith("@page")) {
            break;
        }
    }

    console.log("HTML Start Line", lineIndex);

    let result: vscode.TextEdit[] = [];

    result.push(
        new vscode.TextEdit(range, js.html_beautify(document.getText()))
    );

    return result;
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log("Blazor formatter is loaded!");
    console.log(
        "vscode.extensions.all.map(x => x.id)",
        vscode.extensions.all.map((x) => x.id)
    );

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let formatter = vscode.languages.registerDocumentFormattingEditProvider(
        "aspnetcorerazor",
        {
            provideDocumentFormattingEdits: (document, options, token) => {
                vscode.window.showInformationMessage("Format completed", {
                    modal: false,
                });
                //return format(document, null, options);
                return formatRazor(document);
            },
        }
    );

    let disposable = vscode.commands.registerCommand(
        "blazor-formatter.helloWorld",
        () => {
            // Display a message box to the user
            vscode.window.showInformationMessage("Hello VS Code");
        }
    );

    context.subscriptions.push(disposable);
    context.subscriptions.push(formatter);
}

// this method is called when your extension is deactivated
export function deactivate() {}
