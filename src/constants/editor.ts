import { JavaScriptLogo } from "@/components/icons/JavascriptLogo";
import { PythonLogo } from "@/components/icons/PythonLogo";

export const LANGUAGES = {
  javascript: {
    name: "JavaScript",
    color: "bg-yellow-400",
    logo: JavaScriptLogo,
  },
  python: {
    name: "Python",
    color: "bg-blue-500",
    logo: PythonLogo,
  },
} as const;
export const EDITOR_THEMES = [
  { id: "vs-dark", name: "VS Dark" },
  { id: "github-dark", name: "Github Dark" },
  { id: "monokai", name: "Monokai" },
  { id: "dracula", name: "Dracula" },
] as const;

export type Language = keyof typeof LANGUAGES;
