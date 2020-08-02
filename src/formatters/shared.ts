import * as vscode from "vscode";

export interface IFormatResult {
    results: vscode.TextEdit[];
    startLineIndex: number;
    endLineIndex: number;
}

export function newFormatResult(): IFormatResult {
    return {
        results: [],
        endLineIndex: 0,
        startLineIndex: 0,
    };
}
