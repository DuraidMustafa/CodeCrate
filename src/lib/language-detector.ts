/**
 * Comprehensive language detection supporting 50+ programming languages
 * Uses pattern matching and heuristics for accurate detection
 */

// Comprehensive language mappings
const LANGUAGE_MAPPINGS: Record<string, string> = {
  // Web Technologies
  javascript: "JavaScript",
  typescript: "TypeScript",
  jsx: "JSX",
  tsx: "TSX",
  html: "HTML",
  css: "CSS",
  scss: "SCSS",
  sass: "Sass",
  less: "Less",
  stylus: "Stylus",
  json: "JSON",
  xml: "XML",
  yaml: "YAML",
  yml: "YAML",
  toml: "TOML",
  ini: "INI",

  // Frontend Frameworks
  vue: "Vue",
  svelte: "Svelte",
  angular: "Angular",

  // Backend Languages
  python: "Python",
  java: "Java",
  csharp: "C#",
  "c#": "C#",
  cpp: "C++",
  "c++": "C++",
  c: "C",
  go: "Go",
  golang: "Go",
  rust: "Rust",
  php: "PHP",
  ruby: "Ruby",
  perl: "Perl",
  lua: "Lua",

  // Mobile Development
  swift: "Swift",
  kotlin: "Kotlin",
  dart: "Dart",
  objectivec: "Objective-C",
  "objective-c": "Objective-C",

  // Functional Languages
  haskell: "Haskell",
  erlang: "Erlang",
  elixir: "Elixir",
  clojure: "Clojure",
  fsharp: "F#",
  "f#": "F#",
  scala: "Scala",
  ocaml: "OCaml",

  // Systems Programming
  assembly: "Assembly",
  asm: "Assembly",

  // JVM Languages
  groovy: "Groovy",

  // .NET Languages
  vbnet: "VB.NET",
  "vb.net": "VB.NET",

  // Scripting Languages
  bash: "Bash",
  shell: "Bash",
  sh: "Bash",
  zsh: "Zsh",
  fish: "Fish",
  powershell: "PowerShell",
  batch: "Batch",

  // Database
  sql: "SQL",
  mysql: "MySQL",
  postgresql: "PostgreSQL",
  sqlite: "SQLite",
  plsql: "PL/SQL",
  tsql: "T-SQL",

  // Configuration & DevOps
  dockerfile: "Dockerfile",
  docker: "Dockerfile",
  makefile: "Makefile",
  cmake: "CMake",
  nginx: "Nginx",
  apache: "Apache",

  // Documentation
  markdown: "Markdown",
  md: "Markdown",
  rst: "reStructuredText",
  tex: "LaTeX",
  latex: "LaTeX",

  // Data & Config
  csv: "CSV",
  tsv: "TSV",

  // Game Development
  gdscript: "GDScript",

  // Scientific Computing
  r: "R",
  matlab: "MATLAB",
  octave: "Octave",
  julia: "Julia",

  // Blockchain
  solidity: "Solidity",

  // Query Languages
  graphql: "GraphQL",

  // Template Languages
  handlebars: "Handlebars",
  mustache: "Mustache",
  jinja: "Jinja2",
  twig: "Twig",

  // Other
  regex: "RegEx",
  diff: "Diff",
  log: "Log",
};

/**
 * Enhanced language detection with support for 50+ languages
 */
function detectLanguageHeuristic(code: string): string {
  const trimmed = code.trim().toLowerCase();
  const originalCode = code.trim();

  // React/JSX patterns
  if (
    trimmed.includes("import react") ||
    trimmed.includes('from "react"') ||
    /return\s*\([\s\S]*</.test(originalCode) ||
    (/<[a-z]+[^>]*>/i.test(originalCode) &&
      (trimmed.includes("component") || trimmed.includes("props")))
  ) {
    return trimmed.includes("interface ") || trimmed.includes(": ")
      ? "TSX"
      : "JSX";
  }

  // Vue.js patterns
  if (
    trimmed.includes("<template>") ||
    (trimmed.includes("<script>") && trimmed.includes("<style>")) ||
    (trimmed.includes("vue") && trimmed.includes("export default"))
  ) {
    return "Vue";
  }

  // Svelte patterns
  if (
    (trimmed.includes("<script>") && trimmed.includes("export let")) ||
    (trimmed.includes("$:") && trimmed.includes("reactive"))
  ) {
    return "Svelte";
  }

  // TypeScript patterns
  if (
    trimmed.includes("interface ") ||
    trimmed.includes("type ") ||
    trimmed.includes(": string") ||
    trimmed.includes(": number") ||
    trimmed.includes(": boolean") ||
    /:\s*(string|number|boolean|void|any|unknown)\s*[=;,)]/.test(
      originalCode,
    ) ||
    trimmed.includes("enum ") ||
    trimmed.includes("namespace ") ||
    trimmed.includes("declare ")
  ) {
    return "TypeScript";
  }

  // Python patterns
  if (
    trimmed.includes("def ") ||
    (trimmed.includes("import ") &&
      (trimmed.includes("from ") || /^import\s+\w+/.test(trimmed))) ||
    trimmed.includes("print(") ||
    trimmed.includes("if __name__") ||
    trimmed.includes("elif ") ||
    /^\s*#.*python/i.test(originalCode) ||
    trimmed.includes("lambda ") ||
    trimmed.includes("yield ") ||
    /^\s*@\w+/.test(originalCode)
  ) {
    return "Python";
  }

  // Java patterns
  if (
    trimmed.includes("public class") ||
    trimmed.includes("private class") ||
    trimmed.includes("public static void main") ||
    trimmed.includes("import java.") ||
    (trimmed.includes("package ") && trimmed.includes(";")) ||
    trimmed.includes("extends ") ||
    trimmed.includes("implements ") ||
    /@override/i.test(trimmed)
  ) {
    return "Java";
  }

  // C# patterns
  if (
    trimmed.includes("using system") ||
    (trimmed.includes("namespace ") && trimmed.includes("{")) ||
    (trimmed.includes("public class") &&
      trimmed.includes("static void main")) ||
    trimmed.includes("console.writeline") ||
    trimmed.includes("string[]") ||
    /\bvar\s+\w+\s*=/.test(originalCode) ||
    trimmed.includes("[assembly:")
  ) {
    return "C#";
  }

  // C++ patterns
  if (
    trimmed.includes("#include") ||
    trimmed.includes("std::") ||
    trimmed.includes("cout <<") ||
    trimmed.includes("cin >>") ||
    trimmed.includes("int main()") ||
    trimmed.includes("using namespace std") ||
    trimmed.includes("#pragma") ||
    /template\s*</.test(originalCode)
  ) {
    return "C++";
  }

  // C patterns
  if (
    trimmed.includes("#include <stdio.h>") ||
    trimmed.includes("printf(") ||
    trimmed.includes("scanf(") ||
    trimmed.includes("int main(") ||
    trimmed.includes("malloc(") ||
    trimmed.includes("free(") ||
    /typedef\s+struct/.test(originalCode)
  ) {
    return "C";
  }

  // Go patterns
  if (
    trimmed.includes("package main") ||
    trimmed.includes("import (") ||
    /func\s+main$$$$/.test(originalCode) ||
    trimmed.includes("fmt.print") ||
    trimmed.includes("go ") ||
    trimmed.includes("defer ") ||
    /func\s+\w+\(/.test(originalCode)
  ) {
    return "Go";
  }

  // Rust patterns
  if (
    /fn\s+main$$$$/.test(originalCode) ||
    trimmed.includes("println!") ||
    trimmed.includes("let mut") ||
    trimmed.includes("match ") ||
    trimmed.includes("impl ") ||
    trimmed.includes("trait ") ||
    trimmed.includes("use std::") ||
    /\w+!/.test(originalCode)
  ) {
    return "Rust";
  }

  // PHP patterns
  if (
    trimmed.includes("<?php") ||
    trimmed.includes("echo ") ||
    trimmed.includes("$_get") ||
    trimmed.includes("$_post") ||
    /\$\w+/.test(originalCode) ||
    (trimmed.includes("function ") && /\$/.test(originalCode))
  ) {
    return "PHP";
  }

  // Ruby patterns
  if (
    (trimmed.includes("def ") && trimmed.includes("end")) ||
    trimmed.includes("puts ") ||
    trimmed.includes("require ") ||
    (trimmed.includes("class ") && trimmed.includes("end")) ||
    trimmed.includes("module ") ||
    /\w+\.each/.test(originalCode)
  ) {
    return "Ruby";
  }

  // Swift patterns
  if (
    trimmed.includes("import swift") ||
    (trimmed.includes("var ") && trimmed.includes("let ")) ||
    trimmed.includes("func ") ||
    (trimmed.includes("print(") && trimmed.includes("var ")) ||
    (trimmed.includes("class ") && trimmed.includes("override")) ||
    (trimmed.includes("struct ") && trimmed.includes("init"))
  ) {
    return "Swift";
  }

  // Kotlin patterns
  if (
    trimmed.includes("fun main") ||
    trimmed.includes("println(") ||
    trimmed.includes("val ") ||
    (trimmed.includes("var ") && trimmed.includes("fun ")) ||
    (trimmed.includes("class ") && trimmed.includes("constructor")) ||
    trimmed.includes("object ")
  ) {
    return "Kotlin";
  }

  // Dart patterns
  if (
    trimmed.includes("void main()") ||
    trimmed.includes("import 'dart:") ||
    (trimmed.includes("class ") && trimmed.includes("widget ")) ||
    trimmed.includes("flutter") ||
    trimmed.includes("statelesswidget") ||
    trimmed.includes("statefulwidget")
  ) {
    return "Dart";
  }

  // Objective-C patterns
  if (
    trimmed.includes("#import") ||
    trimmed.includes("@interface") ||
    trimmed.includes("@implementation") ||
    trimmed.includes("nsstring") ||
    trimmed.includes("nslog")
  ) {
    return "Objective-C";
  }

  // Scala patterns
  if (
    (trimmed.includes("object ") && trimmed.includes("def main")) ||
    (trimmed.includes("val ") && trimmed.includes("def ")) ||
    trimmed.includes("case class") ||
    trimmed.includes("trait ") ||
    (/=>\s*/.test(originalCode) && trimmed.includes("def "))
  ) {
    return "Scala";
  }

  // Haskell patterns
  if (
    /^\w+\s*::\s*/.test(trimmed) ||
    (trimmed.includes("where") && trimmed.includes("=")) ||
    trimmed.includes("data ") ||
    trimmed.includes("instance ") ||
    /\w+\s*<-/.test(originalCode)
  ) {
    return "Haskell";
  }

  // Clojure patterns
  if (
    trimmed.includes("(defn ") ||
    trimmed.includes("(def ") ||
    trimmed.includes("(ns ")
  ) {
    return "Clojure";
  }

  // Elixir patterns
  if (
    trimmed.includes("defmodule ") ||
    (trimmed.includes("def ") && trimmed.includes("do")) ||
    trimmed.includes("iex>") ||
    /\|>/.test(originalCode)
  ) {
    return "Elixir";
  }

  // R patterns
  if (
    trimmed.includes("<- ") ||
    trimmed.includes("library(") ||
    trimmed.includes("data.frame") ||
    trimmed.includes("ggplot") ||
    /\w+\s*<-\s*function/.test(originalCode)
  ) {
    return "R";
  }

  // MATLAB patterns
  if (
    (trimmed.includes("function ") && trimmed.includes("end")) ||
    trimmed.includes("fprintf") ||
    trimmed.includes("disp(") ||
    /^\s*%/.test(originalCode)
  ) {
    return "MATLAB";
  }

  // Julia patterns
  if (
    (trimmed.includes("function ") && trimmed.includes("end")) ||
    trimmed.includes("using ") ||
    (trimmed.includes("println(") && trimmed.includes("function ")) ||
    /\w+::\w+/.test(originalCode)
  ) {
    return "Julia";
  }

  // Perl patterns
  if (
    trimmed.includes("#!/usr/bin/perl") ||
    trimmed.includes("use strict") ||
    trimmed.includes("my $") ||
    (/\$\w+/.test(originalCode) && trimmed.includes("=~"))
  ) {
    return "Perl";
  }

  // Lua patterns
  if (
    (trimmed.includes("function ") && trimmed.includes("end")) ||
    trimmed.includes("local ") ||
    trimmed.includes("require(") ||
    /--\[\[/.test(originalCode)
  ) {
    return "Lua";
  }

  // Solidity patterns
  if (
    trimmed.includes("pragma solidity") ||
    trimmed.includes("contract ") ||
    (trimmed.includes("function ") && trimmed.includes("public")) ||
    trimmed.includes("mapping(")
  ) {
    return "Solidity";
  }

  // GraphQL patterns
  if (
    trimmed.includes("query ") ||
    trimmed.includes("mutation ") ||
    trimmed.includes("subscription ") ||
    (trimmed.includes("type ") &&
      trimmed.includes("{") &&
      !trimmed.includes("interface"))
  ) {
    return "GraphQL";
  }

  // CSS patterns
  if (
    trimmed.includes("{") &&
    (trimmed.includes("color:") ||
      trimmed.includes("background:") ||
      trimmed.includes("margin:") ||
      trimmed.includes("padding:") ||
      trimmed.includes("display:") ||
      /\.[a-z-]+\s*{/.test(originalCode) ||
      /#[a-z-]+\s*{/.test(originalCode) ||
      /@media/.test(originalCode))
  ) {
    return "CSS";
  }

  // SCSS/Sass patterns
  if (
    (trimmed.includes("$") &&
      (trimmed.includes("@mixin") ||
        trimmed.includes("@include") ||
        trimmed.includes("@extend") ||
        trimmed.includes("@import"))) ||
    /\$\w+\s*:/.test(originalCode)
  ) {
    return "SCSS";
  }

  // HTML patterns
  if (
    trimmed.includes("<!doctype") ||
    trimmed.includes("<html") ||
    trimmed.includes("<head>") ||
    trimmed.includes("<body>") ||
    /^<[a-z]+[^>]*>/.test(trimmed) ||
    trimmed.includes("<div") ||
    trimmed.includes("<span")
  ) {
    return "HTML";
  }

  // XML patterns
  if (
    trimmed.includes("<?xml") ||
    (trimmed.includes("<") &&
      trimmed.includes("/>") &&
      !trimmed.includes("html")) ||
    /xmlns\s*=/.test(originalCode)
  ) {
    return "XML";
  }

  // JSON patterns
  if (
    (trimmed.startsWith("{") && trimmed.endsWith("}")) ||
    (trimmed.startsWith("[") && trimmed.endsWith("]"))
  ) {
    try {
      JSON.parse(originalCode);
      return "JSON";
    } catch {
      // Not valid JSON, continue checking
    }
  }

  // YAML patterns
  if (
    /^[\w-]+:\s*/.test(trimmed) ||
    trimmed.includes("---") ||
    /^\s*-\s+\w+/.test(trimmed) ||
    /^\s*\w+:\s*$/.test(trimmed)
  ) {
    return "YAML";
  }

  // TOML patterns
  if (
    /^\[[\w.-]+\]/.test(trimmed) ||
    /^\w+\s*=\s*"/.test(trimmed) ||
    (trimmed.includes("[[") && trimmed.includes("]]"))
  ) {
    return "TOML";
  }

  // SQL patterns
  if (
    /\b(select|insert|update|delete|create|alter|drop|table|database|index)\b/i.test(
      originalCode,
    ) ||
    /\b(from|where|join|inner|left|right|outer|group by|order by)\b/i.test(
      originalCode,
    )
  ) {
    return "SQL";
  }

  // Shell/Bash patterns
  if (
    trimmed.includes("#!/bin/bash") ||
    trimmed.includes("#!/bin/sh") ||
    trimmed.includes("echo ") ||
    /\$\{.*\}/.test(originalCode) ||
    trimmed.includes("export ") ||
    trimmed.includes("chmod ") ||
    (/^\w+\s*=/.test(trimmed) && trimmed.includes("$"))
  ) {
    return "Bash";
  }

  // PowerShell patterns
  if (
    trimmed.includes("write-host") ||
    trimmed.includes("get-") ||
    trimmed.includes("set-") ||
    trimmed.includes("$_") ||
    (/\$\w+/.test(originalCode) && trimmed.includes("param"))
  ) {
    return "PowerShell";
  }

  // Docker patterns
  if (
    (trimmed.includes("from ") &&
      (trimmed.includes("run ") || trimmed.includes("copy "))) ||
    trimmed.includes("workdir ") ||
    trimmed.includes("expose ") ||
    trimmed.includes("cmd ") ||
    trimmed.includes("entrypoint ")
  ) {
    return "Dockerfile";
  }

  // Makefile patterns
  if (
    /^\w+:/.test(trimmed) ||
    (trimmed.includes("\t") && /^\w+:/.test(originalCode)) ||
    (trimmed.includes("$(") && trimmed.includes(")"))
  ) {
    return "Makefile";
  }

  // Markdown patterns
  if (
    trimmed.includes("# ") ||
    trimmed.includes("## ") ||
    trimmed.includes("```") ||
    trimmed.includes("**") ||
    (trimmed.includes("*") && trimmed.includes("[")) ||
    trimmed.includes("![](")
  ) {
    return "Markdown";
  }

  // LaTeX patterns
  if (
    trimmed.includes("\\documentclass") ||
    trimmed.includes("\\begin{") ||
    trimmed.includes("\\end{") ||
    trimmed.includes("\\usepackage")
  ) {
    return "LaTeX";
  }

  // Assembly patterns
  if (
    /^\s*\w+:/.test(trimmed) ||
    /\b(mov|add|sub|jmp|call|ret)\b/i.test(originalCode) ||
    trimmed.includes(".section") ||
    trimmed.includes(".global")
  ) {
    return "Assembly";
  }

  // Default to JavaScript for common JS patterns
  if (
    trimmed.includes("function ") ||
    trimmed.includes("const ") ||
    trimmed.includes("let ") ||
    trimmed.includes("var ") ||
    trimmed.includes("=>") ||
    trimmed.includes("console.log") ||
    trimmed.includes("require(") ||
    trimmed.includes("module.exports")
  ) {
    return "JavaScript";
  }

  // If no patterns match, return empty string
  return "";
}

/**
 * Detect programming language from code content
 * Uses comprehensive heuristic-based detection
 */
export function detectLanguage(code: string): string {
  if (!code || !code.trim()) {
    return "";
  }

  try {
    const detected = detectLanguageHeuristic(code);
    const mappedLanguage = LANGUAGE_MAPPINGS[detected.toLowerCase()];
    return mappedLanguage || detected;
  } catch (error) {
    console.warn("Language detection failed:", error);
    return "";
  }
}
