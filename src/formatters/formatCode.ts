import * as vscode from "vscode";
import * as js from "js-beautify";
import { IFormatResult, newFormatResult } from "./shared";

export function formatCode(document: vscode.TextDocument): IFormatResult {
    const result: IFormatResult = {
        ...newFormatResult(),
        startLineIndex: document.lineCount - 1,
    };

    let lineIndex = 0;

    for (lineIndex = 0; lineIndex < document.lineCount; lineIndex++) {
        const lineContent = document.lineAt(lineIndex).text?.trim() ?? "";

        if (lineContent.toLocaleLowerCase().startsWith("@code")) {
            const codeRange = new vscode.Range(
                new vscode.Position(lineIndex, 0),
                new vscode.Position(document.lineCount, 0) // FIXME: Dont assume that there's nothing passed the code section
            );

            result.startLineIndex = lineIndex - 1;

            let codeText = document.getText(codeRange).trim();

            console.log("Code line index", lineIndex);

            result.results.push(
                new vscode.TextEdit(codeRange, js.js_beautify(codeText))
            );
        }
    }

    return result;
}
