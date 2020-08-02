import * as vscode from "vscode";
import { formatBody } from "./formatBody";
import { formatCode } from "./formatCode";
import { formatHeader } from "./formatHeader";

export function formatRazor(
    document: vscode.TextDocument
): vscode.ProviderResult<vscode.TextEdit[]> {
    let result: vscode.TextEdit[] = [];

    const headerResult = formatHeader(document);
    const codeResult = formatCode(document);
    const bodyResult = formatBody(
        document,
        headerResult.endLineIndex,
        codeResult.startLineIndex
    );

    headerResult ? result.push(...headerResult.results) : undefined;
    codeResult ? result.push(...codeResult.results) : undefined;
    bodyResult ? result.push(...bodyResult.results) : undefined;

    return result;
}
