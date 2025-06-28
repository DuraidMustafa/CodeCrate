import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";
import java from "highlight.js/lib/languages/java";
import cpp from "highlight.js/lib/languages/cpp";
import typescript from "highlight.js/lib/languages/typescript";
import css from "highlight.js/lib/languages/css";
import sql from "highlight.js/lib/languages/sql";
import ruby from "highlight.js/lib/languages/ruby";
import c from "highlight.js/lib/languages/c";
import cSharp from "highlight.js/lib/languages/c#";
import json from "highlight.js/lib/languages/json";
import bash from "highlight.js/lib/languages/bash";

hljs.registerLanguage("JavaScript", javascript);
hljs.registerLanguage("Python", python);
hljs.registerLanguage("Java", java);
// hljs.registerLanguage("C++", cpp);
hljs.registerLanguage("TypeScript", typescript);
hljs.registerLanguage("CSS", css);
hljs.registerLanguage("SQL", sql);
hljs.registerLanguage("Ruby", ruby);
hljs.registerLanguage("C#", cSharp);
hljs.registerLanguage("JSON", json);
hljs.registerLanguage("Bash", bash);
hljs.registerLanguage("C", c);

export function detectLanguage(code: string): string {
  const result = hljs.highlightAuto(code);
  console.log(result);

  return result.language || "unknown";
}
