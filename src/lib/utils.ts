import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Enhanced language detector that supports many programming languages
 * Analyzes code patterns, keywords, and syntax to determine the most likely language
 */
export function detectLanguage(code: string): string {
  const trimmed = code.trim().toLowerCase();
  const originalCode = code.trim();

  // React/JSX patterns
  if (
    trimmed.includes("import react") ||
    trimmed.includes('from "react"') ||
    trimmed.includes("jsx") ||
    /return\s*\([\s\S]*</.test(originalCode) ||
    /<[a-z]+[^>]*>/i.test(originalCode)
  ) {
    return trimmed.includes("interface ") || trimmed.includes(": ")
      ? "TSX"
      : "JSX";
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
    trimmed.includes("namespace ")
  ) {
    return "TypeScript";
  }

  // Python patterns
  if (
    trimmed.includes("def ") ||
    trimmed.includes("import ") ||
    trimmed.includes("from ") ||
    trimmed.includes("print(") ||
    trimmed.includes("if __name__") ||
    trimmed.includes("elif ") ||
    /^\s*#.*python/i.test(originalCode) ||
    trimmed.includes("lambda ") ||
    trimmed.includes("yield ")
  ) {
    return "Python";
  }

  // Java patterns
  if (
    trimmed.includes("public class") ||
    trimmed.includes("private class") ||
    trimmed.includes("public static void main") ||
    trimmed.includes("import java.") ||
    trimmed.includes("package ") ||
    trimmed.includes("extends ") ||
    trimmed.includes("implements ")
  ) {
    return "Java";
  }

  // C# patterns
  if (
    trimmed.includes("using system") ||
    trimmed.includes("namespace ") ||
    trimmed.includes("public class") ||
    trimmed.includes("private class") ||
    trimmed.includes("console.writeline") ||
    trimmed.includes("string[]") ||
    /\bvar\s+\w+\s*=/.test(originalCode)
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
    trimmed.includes("using namespace std")
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
    trimmed.includes("free(")
  ) {
    return "C";
  }

  // Go patterns
  if (
    trimmed.includes("package main") ||
    trimmed.includes("import (") ||
    trimmed.includes("func main()") ||
    trimmed.includes("fmt.print") ||
    trimmed.includes("go ") ||
    trimmed.includes("defer ")
  ) {
    return "Go";
  }

  // Rust patterns
  if (
    trimmed.includes("fn main()") ||
    trimmed.includes("println!") ||
    trimmed.includes("let mut") ||
    trimmed.includes("match ") ||
    trimmed.includes("impl ") ||
    trimmed.includes("trait ") ||
    trimmed.includes("use std::")
  ) {
    return "Rust";
  }

  // PHP patterns
  if (
    trimmed.includes("<?php") ||
    trimmed.includes("echo ") ||
    trimmed.includes("$_get") ||
    trimmed.includes("$_post") ||
    trimmed.includes("function ") ||
    /\$\w+/.test(originalCode)
  ) {
    return "PHP";
  }

  // Ruby patterns
  if (
    trimmed.includes("def ") ||
    trimmed.includes("end") ||
    trimmed.includes("puts ") ||
    trimmed.includes("require ") ||
    trimmed.includes("class ") ||
    trimmed.includes("module ")
  ) {
    return "Ruby";
  }

  // Swift patterns
  if (
    trimmed.includes("import swift") ||
    trimmed.includes("var ") ||
    trimmed.includes("let ") ||
    trimmed.includes("func ") ||
    trimmed.includes("print(") ||
    trimmed.includes("class ") ||
    trimmed.includes("struct ")
  ) {
    return "Swift";
  }

  // Kotlin patterns
  if (
    trimmed.includes("fun main") ||
    trimmed.includes("println(") ||
    trimmed.includes("val ") ||
    trimmed.includes("var ") ||
    trimmed.includes("class ") ||
    trimmed.includes("object ")
  ) {
    return "Kotlin";
  }

  // Dart patterns
  if (
    trimmed.includes("void main()") ||
    trimmed.includes("print(") ||
    trimmed.includes("import 'dart:") ||
    trimmed.includes("class ") ||
    trimmed.includes("widget ")
  ) {
    return "Dart";
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
    trimmed.includes("$") &&
    (trimmed.includes("@mixin") ||
      trimmed.includes("@include") ||
      trimmed.includes("@extend") ||
      trimmed.includes("@import"))
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
      !trimmed.includes("html"))
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
    /^\s*-\s+\w+/.test(trimmed)
  ) {
    return "YAML";
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
    trimmed.includes("chmod ")
  ) {
    return "Bash";
  }

  // PowerShell patterns
  if (
    trimmed.includes("write-host") ||
    trimmed.includes("get-") ||
    trimmed.includes("set-") ||
    trimmed.includes("$_") ||
    /\$\w+/.test(originalCode)
  ) {
    return "PowerShell";
  }

  // Docker patterns
  if (
    trimmed.includes("from ") ||
    trimmed.includes("run ") ||
    trimmed.includes("copy ") ||
    trimmed.includes("workdir ") ||
    trimmed.includes("expose ") ||
    trimmed.includes("cmd ")
  ) {
    return "Dockerfile";
  }

  // Markdown patterns
  if (
    trimmed.includes("# ") ||
    trimmed.includes("## ") ||
    trimmed.includes("```") ||
    trimmed.includes("**") ||
    trimmed.includes("*") ||
    trimmed.includes("[](")
  ) {
    return "Markdown";
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
