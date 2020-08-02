import * as vscode from "vscode";
import * as js from "js-beautify";
import { IFormatResult, newFormatResult } from "./shared";

export function formatBody(
    document: vscode.TextDocument,
    startLineIndex: number,
    endLineIndex: number
): IFormatResult {
    const result = newFormatResult();

    const endLineLenght = document.lineAt(endLineIndex)?.text?.length ?? 0;
    const contentRange = new vscode.Range(
        new vscode.Position(startLineIndex, 0),
        new vscode.Position(endLineIndex, endLineLenght)
    );

    const bodyContent = document.getText(contentRange);

    result.results.push(
        new vscode.TextEdit(
            contentRange,
            "\n" + js.html_beautify(bodyContent.trim()) + "\n"
        )
    );

    return result;
}
