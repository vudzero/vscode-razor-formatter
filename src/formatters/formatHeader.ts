import * as vscode from "vscode";
import { IFormatResult, newFormatResult } from "./shared";

const razorKeywords = [
    "@page",
    "@using",
    "@inherits",
    "@namespace",
    "@addTagHelper",
];

export function formatHeader(document: vscode.TextDocument): IFormatResult {
    const result = newFormatResult();

    let lineIndex = 0;
    for (lineIndex = 0; lineIndex < document.lineCount; lineIndex++) {
        const lineContent = document.lineAt(lineIndex).text ?? "";

        //FIXME: Could stop once we find a line with content that does not match any keywords
        for (const keyword of razorKeywords) {
            if (lineContent.trim().startsWith(keyword)) {
                const codeRange = new vscode.Range(
                    new vscode.Position(lineIndex, 0),
                    new vscode.Position(lineIndex, lineContent.length)
                );
                result.endLineIndex = lineIndex + 1;

                result.results.push(
                    new vscode.TextEdit(codeRange, lineContent.trim())
                );
            }
        }
    }

    return result;
}
