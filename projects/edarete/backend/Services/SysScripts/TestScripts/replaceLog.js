/**
 * replaceLog.js
 *
 * Safely replaces console.log(...) → logMessage([...])
 * Recursively processes .js files from project root.
 * Adds relative import for logMessage if missing.
 */

const fs = require("fs");
const path = require("path");

// === CONFIG ===

// Path of this script: C:\Users\adnan\VS_Code\Clones\Framework_Node\Services\SysScripts\TestScripts\replaceLog.js
// Project root (3 levels up)
const ROOT_DIR = path.resolve(__dirname, "../../..");
// logMessage module path (relative target)
const LOG_PATH = path.resolve(
  ROOT_DIR,
  "Services/SysFunctions/LogFunctions/consoleLog.js"
);

/**
 * Get the relative require path from the target file to the logMessage module
 */
function getRelativeImport(filePath) {
  let relPath = path.relative(path.dirname(filePath), LOG_PATH);
  if (!relPath.startsWith(".")) relPath = "./" + relPath;
  return relPath.replace(/\\/g, "/");
}

/**
 * Recursively process directories
 */
function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    // skip irrelevant directories
    if (
      entry.isDirectory() &&
      !["node_modules", ".git", "TestScripts"].includes(entry.name)
    ) {
      processDirectory(fullPath);
    } else if (entry.isFile() && fullPath.endsWith(".js")) {
      processFile(fullPath);
    }
  }
}

/**
 * Process a single .js file
 */
function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  if (!content.includes("console.log")) return;

  const originalContent = content;

  // --- careful regex: matches console.log( ... ) including nested parentheses ---
  const regex = /console\.log\s*\(([\s\S]*?)\)/g;

  let depth = 0;
  let result = "";
  let lastIndex = 0;

  // manual parsing (to correctly handle nested parentheses and template literals)
  for (let i = 0; i < content.length; i++) {
    if (content.slice(i, i + 11) === "console.log") {
      let start = i + 11;
      while (content[start] && /\s/.test(content[start])) start++;

      if (content[start] !== "(") continue; // malformed

      let j = start;
      depth = 0;
      let inTemplate = false;
      let escaped = false;

      for (; j < content.length; j++) {
        const ch = content[j];

        if (escaped) {
          escaped = false;
          continue;
        }
        if (ch === "\\") {
          escaped = true;
          continue;
        }
        if (ch === "`") inTemplate = !inTemplate;
        if (inTemplate) continue;

        if (ch === "(") depth++;
        else if (ch === ")") {
          depth--;
          if (depth === 0) break;
        }
      }

      const args = content.slice(start + 1, j);
      result += content.slice(lastIndex, i) + `logMessage([${args.trim()}])`;
      lastIndex = j + 1;
      i = j;
    }
  }
  result += content.slice(lastIndex);

  // If no change, skip write
  if (result === originalContent) return;

  console.log(`🛠 Updated: ${filePath}`);

  // Ensure logMessage import exists (using relative path)
  const relImport = getRelativeImport(filePath);
  const importLine = `const logMessage = require("${relImport}");`;

  if (!result.includes("logMessage = require(")) {
    // insert after 'use strict' if exists, otherwise at the top
    if (result.startsWith("'use strict'") || result.startsWith('"use strict"')) {
      result = result.replace(
        /(['"]use strict['"];?\s*)/,
        `$1\n${importLine}\n`
      );
    } else {
      result = importLine + "\n" + result;
    }
  }

  fs.writeFileSync(filePath, result, "utf8");
}

/**
 * Run script
 */
console.log("🔍 Starting from:", ROOT_DIR);
processDirectory(ROOT_DIR);
console.log("✅ Replacement complete!");
