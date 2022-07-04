/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as path from 'path';
import { workspace, ExtensionContext } from 'vscode';



import * as lc from "vscode-languageclient/node";

let client: lc.LanguageClient;

export function activate(context: ExtensionContext) {
	// The server is implemented in node
	const serverPath = context.asAbsolutePath(
		path.join('server', 'bin', 'ghidra.xtext.sleigh.ide')
	);


	// If the extension is launched in debug mode then the debug server options are used
	// Otherwise the run options are used
	const run: lc.Executable = {
		command: serverPath,
	};




	// Options to control the language client
	const clientOptions: lc.LanguageClientOptions = {
		// Register the server for plain text documents
		documentSelector: [{ scheme: 'file', language: 'sleigh' }],
		synchronize: {
			// Notify the server about file changes to '.clientrc files contained in the workspace
			fileEvents: workspace.createFileSystemWatcher('**/.clientrc')
		}
	};

	// Create the language client and start the client.
	client = new lc.LanguageClient(
		'languageServerExample',
		'Language Server Example',
		run,
		clientOptions
	);

	// Start the client. This will also launch the server
	client.start();
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}
