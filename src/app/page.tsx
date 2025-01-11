"use client";

import { useState, useEffect, useRef, useTransition } from "react";
import type { Monaco } from "@monaco-editor/react";
import type { editor } from "monaco-editor";

import { useWebSocket } from "@/hooks/useWebSocket";

import { Language } from "@/constants/editor";
import { Header } from "@/components/global/Header";

import { CodeInput } from "./_components/CodeInput";
import { CodeOutput } from "./_components/CodeOutput";

export default function CodeEditor() {
  const [isPending, startTransition] = useTransition();
  const [isRunning, setIsRunning] = useState(false);
  const [language, setLanguage] = useState<Language>("javascript");
  const [code, setCode] = useState("");
  const [theme, setTheme] = useState("vs-dark");

  const { isConnected, output, setOutput, sendMessage } = useWebSocket();

  const monacoRef = useRef<Monaco | null>(null);
  const outputEditorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount = (
    editor: editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) => {
    monacoRef.current = monaco;
    monaco.editor.defineTheme("github-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#1a1f25",
      },
    });
  };

  const handleOutputEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    outputEditorRef.current = editor;
  };

  const handleLanguageChange = (newLanguage: Language) => {
    startTransition(() => {
      setLanguage(newLanguage);
      setOutput("");
    });
  };

  const handleRun = () => {
    startTransition(() => {
      setIsRunning(true);
      setOutput("");

      const payload = {
        command: "run",
        code,
        language,
        input: "",
      };

      sendMessage(payload);
    });
  };

  const handleStop = () => {
    sendMessage({ command: "stop" });
    setIsRunning(false);
  };

  const handleClear = () => {
    setOutput("");
  };

  useEffect(() => {
    if (outputEditorRef.current) {
      const lineCount = outputEditorRef.current.getModel()?.getLineCount();
      outputEditorRef.current.revealLine(lineCount ?? 1);
    }
  }, [output]);

  return (
    <div className="h-screen max-h-screen flex flex-col overflow-hidden bg-[#1e2530] text-white">
      <Header
        language={language}
        theme={theme}
        isConnected={isConnected}
        isRunning={isRunning}
        isPending={isPending}
        onLanguageChange={handleLanguageChange}
        onThemeChange={setTheme}
        onRun={handleRun}
        onStop={handleStop}
      />

      <div className="flex-1 flex flex-col lg:flex-row min-h-0 p-4 gap-4">
        <CodeInput
          language={language}
          theme={theme}
          code={code}
          isRunning={isRunning}
          onCodeChange={(value) => setCode(value || "")}
          onEditorDidMount={handleEditorDidMount}
        />

        <CodeOutput
          theme={theme}
          output={output}
          onClear={handleClear}
          onEditorDidMount={handleOutputEditorDidMount}
        />
      </div>
    </div>
  );
}
