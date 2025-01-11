import Editor from "@monaco-editor/react";
import type { Monaco } from "@monaco-editor/react";
import { editor } from "monaco-editor";

import { Language } from "@/constants/editor";

type CodeInputProps = {
  language: Language;
  theme: string;
  code: string;
  isRunning: boolean;
  onCodeChange: (value: string | undefined) => void;
  onEditorDidMount: (
    editor: editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) => void;
};

export function CodeInput({
  language,
  theme,
  code,
  isRunning,
  onCodeChange,
  onEditorDidMount,
}: CodeInputProps) {
  return (
    <div className="flex-1 flex flex-col min-h-0 rounded-lg bg-[#1a1f25] p-4">
      <div className="flex-none mb-2 flex items-center justify-between">
        <span className="text-sm text-gray-400 font-bold">Input:</span>
      </div>
      <div className="flex-1 min-h-0">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          language={language.toLowerCase()}
          theme={theme}
          value={code}
          onChange={onCodeChange}
          onMount={onEditorDidMount}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly: isRunning,
            readOnlyMessage: {
              value:
                "The editor is in read-only mode. Stop the process to edit again.",
            },
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
}
