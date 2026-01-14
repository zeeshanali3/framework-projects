const logMessage = require("./Services/SysFunctions/LogFunctions/consoleLog.js");
const fs = require("fs");
const path = require("path");
const rootDir = process.cwd();
const jsFiles = [];

function getAllJsFiles(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    if (file.isDirectory()) {
      if (
        file.name === "node_modules" ||
        file.name === ".git" ||
        file.name.startsWith(".")
      ) {
        continue;
      }
      getAllJsFiles(path.join(dir, file.name));
    } else if (file.name.endsWith(".js")) {
      jsFiles.push(path.join(dir, file.name));
    }
  }
}

getAllJsFiles(rootDir);


const exportMap = {}; 

for (const file of jsFiles) {
  const content = fs.readFileSync(file, "utf-8");
  const matchSingle = content.match(/module\.exports\s*=\s*(\w+)/);
  if (matchSingle) {
    exportMap[matchSingle[1]] = file;
  }
  const matchMulti = content.match(/module\.exports\s*=\s*{\s*([^}]+)\s*}/);
  if (matchMulti) {
    const exportsList = matchMulti[1]
      .split(",")
      .map(e => e.trim().split(":")[0].trim()) 
      .filter(Boolean);
    for (const name of exportsList) {
      exportMap[name] = file;
    }
  }
}

for (const file of jsFiles) {
  let content = fs.readFileSync(file, "utf-8");
  let updated = false;

  const importRegex =
    /(?:const|let|var)\s+{?\s*([\w,\s]*)\s*}?\s*=\s*require\s*\(\s*['"](\.{1,2}\/[^'"]+)['"]\s*\)|import\s+(?:{?\s*([\w,\s]*)\s*}?\s+from\s+)?['"](\.{1,2}\/[^'"]+)['"]/g;  //I HAATE REGEX SO MUCH THIS TOOK ME AN HOUR

    //IF YOURE A DEV AND YOU SEE THIS, LEAVE ME A LIKE
    //LIKE COUNTER: 1

  content = content.replace(importRegex, (match, reqNames, reqPath, impNames, impPath) => {
    const relPath = reqPath || impPath;
    const namesStr = reqNames || impNames || "";
    const importedNames = namesStr
      .split(",")
      .map(n => n.trim())
      .filter(Boolean);

    if (file.endsWith("objectResolver.js")) {
      logMessage(["Match:", match]);
      logMessage([">> names:", importedNames]);
      logMessage([">> relPath:", relPath]);
    }

    // Try to find a real export match
    for (const name of importedNames) {
      if (exportMap[name]) {
        const targetFile = exportMap[name];
        const newRel = path
          .relative(path.dirname(file), targetFile)
          .replace(/\\/g, "/")
          .replace(/\.js$/, "");

        const newPath = newRel.startsWith(".") ? newRel : "./" + newRel;
        logMessage([`${file}: rewriting ${relPath} >> ${newPath}`]);
        updated = true;
        return match.replace(relPath, newPath);
      }
    }

    return match;
  });


  if (updated) {
    // if (file.endsWith("objectResolver.js")) {
    //   logMessage(["Updated content:", content]);
    // }
    fs.writeFileSync(file, content, "utf-8");
    logMessage([`Updated imports in: ${path.relative(rootDir, file)}`]);
  }
}

// --------------------
// Step 4: Print summary
// --------------------
logMessage(["\n📦 Export map:"]);
// console.table(exportMap);
logMessage(["\n✨ Done! Imports fixed successfully."]);
