import React, { useEffect, useRef, useState } from "react";
import MonacoEditor from "react-monaco-editor";

const CollaborativeEditor: React.FC<{ websocketUrl: string }> = ({
	websocketUrl,
}) => {
	const [editor, setEditor] = useState<any>(null);
	const ws = useRef<WebSocket | null>(null);

	useEffect(() => {
		ws.current = new WebSocket(websocketUrl);

		ws.current.onmessage = (event) => {
			if (editor) {
				editor.getModel()?.setValue(event.data);
			}
		};

		return () => {
			if (ws.current) {
				ws.current.close();
			}
		};
	}, [editor, websocketUrl]);

	const handleEditorChange = (newValue: string) => {
		if (ws.current && ws.current.readyState === WebSocket.OPEN) {
			ws.current.send(newValue);
		}
	};

	return (
		<MonacoEditor
			height="600px"
			language="javascript"
			theme="vs-dark"
			onChange={handleEditorChange}
			editorDidMount={(editor) => setEditor(editor)}
		/>
	);
};

export default CollaborativeEditor;
