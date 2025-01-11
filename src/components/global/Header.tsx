import { createElement } from "react";
import Image from "next/image";
import { Play, Square } from "lucide-react";

import { LANGUAGES, EDITOR_THEMES, Language } from "@/constants/editor";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type HeaderProps = {
  language: Language;
  theme: string;
  isConnected: boolean;
  isRunning: boolean;
  isPending: boolean;
  onLanguageChange: (lang: Language) => void;
  onThemeChange: (theme: string) => void;
  onRun: () => void;
  onStop: () => void;
};

export function Header({
  language,
  theme,
  isConnected,
  isRunning,
  isPending,
  onLanguageChange,
  onThemeChange,
  onRun,
  onStop,
}: HeaderProps) {
  return (
    <header className="flex-none border-b border-gray-700 bg-[#1e2530] px-4 py-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Image width={20} height={20} src={"/logo.svg"} alt="Logo" />
          <span className="text-lg font-semibold">Code Compiler</span>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div
                  className={`h-3 w-3 rounded-full ${
                    isConnected ? "bg-green-500" : "bg-red-500"
                  }`}
                />
              </TooltipTrigger>
              <TooltipContent>
                {isConnected ? "Connected" : "Disconnected"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Select value={language} onValueChange={onLanguageChange}>
            <SelectTrigger className="w-[150px] border-gray-700 bg-transparent text-white">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent className="bg-[#1e2530] border-gray-700 hover:bg-[#1e2530] text-white">
              {Object.entries(LANGUAGES).map(([key, value]) => (
                <SelectItem key={key} value={key} className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    {value.logo && createElement(value.logo)}

                    {value.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={theme} onValueChange={onThemeChange}>
            <SelectTrigger className="w-[120px] border-gray-700 bg-transparent text-white">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent className="bg-[#1e2530] border-gray-700 hover:bg-[#1e2530] text-white">
              {EDITOR_THEMES.map((editorTheme) => (
                <SelectItem
                  key={editorTheme.id}
                  value={editorTheme.id}
                  className="cursor-pointer"
                >
                  {editorTheme.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="default"
            className="gap-2 bg-green-700 hover:bg-green-600"
            onClick={onRun}
            disabled={isRunning || !isConnected || isPending}
          >
            <Play className="h-4 w-4" />
            Run
          </Button>
          <Button
            variant="default"
            className="gap-2 bg-red-700 hover:bg-red-600"
            onClick={onStop}
            disabled={!isRunning}
          >
            <Square className="h-4 w-4" />
            Stop
          </Button>
        </div>
      </div>
    </header>
  );
}
