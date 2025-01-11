import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";

import { Button } from "@/components/ui/button";

type CodeOutputProps = {
  theme: string;
  output: string;
  onClear: () => void;
  onEditorDidMount: (editor: editor.IStandaloneCodeEditor) => void;
};

export function CodeOutput({
  theme,
  output,
  onClear,
  onEditorDidMount,
}: CodeOutputProps) {
  return (
    <div className="flex-1 flex flex-col min-h-0 rounded-lg bg-[#1a1f25] p-4">
      <div className="flex-none mb-2 flex items-center justify-between">
        <span className="text-sm text-gray-400 font-bold">Output:</span>
        <Button
          variant="ghost"
          size="sm"
          className="font-bold text-blue-600 hover:text-blue-600"
          onClick={onClear}
        >
          CLEAR
        </Button>
      </div>

      <div className="flex-1 min-h-0">
        <Editor
          height="100%"
          defaultLanguage="plaintext"
          defaultValue="Your output appears here..."
          theme={theme}
          value={output}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "off",
            readOnly: true,
            automaticLayout: true,
            wordWrap: "on",
            scrollBeyondLastLine: false,
          }}
          onMount={onEditorDidMount}
        />
      </div>
    </div>
  );
}
