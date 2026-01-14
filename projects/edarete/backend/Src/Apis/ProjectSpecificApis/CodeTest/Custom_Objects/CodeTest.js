const axios = require('axios')

const JUDGE0_URL =
  "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=true&fields=*";

// Your RapidAPI headers (replace with your key or use local Judge0 instance)
const API_HEADERS = {
  "x-rapidapi-key": "5f487535e4msh65c39d34ec4c009p19eb9ejsn035e25f359a8",
  "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
  "Content-Type": "application/json",
};

const language_map = {
  "Assembly (NASM)": 1,
  "Bash": 2,
  "Basic (FBC)": 3,
  "C (Clang)": 4,
  "C (GCC 7.4.0)": 5,
  "C (GCC 8.3.0)": 6,
  "C (GCC 9.2.0)": 7,
  "C# (Mono)": 8,
  "C++ (Clang)": 9,
  "C++ (GCC 7.4.0)": 10,
  "C++ (GCC 8.3.0)": 11,
  "C++ (GCC 9.2.0)": 12,
  "Clojure": 13,
  "COBOL": 14,
  "Common Lisp": 15,
  "D": 16,
  "Elixir": 17,
  "Erlang": 18,
  "Executable": 19,
  "F# (.NET Core)": 20,
  "Fortran": 21,
  "Go": 22,
  "Groovy": 23,
  "Haskell": 24,
  "Java (OpenJDK 13)": 25,
  "JavaScript (Node.js)": 26,
  "Kotlin": 27,
  "Lua": 28,
  "Objective-C": 29,
  "OCaml": 30,
  "Octave": 31,
  "Pascal": 32,
  "Perl": 33,
  "PHP": 34,
  "Plain Text": 35,
  "Prolog": 36,
  "Python 2": 37,
  "Python 3": 38,
  "R": 39,
  "Ruby": 40,
  "Rust": 41,
  "Scala": 42,
  "SQL (SQLite)": 43,
  "Swift": 44,
  "TypeScript": 45,
  "Visual Basic .NET": 46,
  "C++" : 54
}

function encode64(str) {
    return Buffer.from(str).toString("base64");
}

async function runCode(req, decryptedPayload) {
  const encodedCode = encode64(decryptedPayload.sourceCode["main.cpp"])
  const encodedInput = encode64(decryptedPayload.test.input)
  const response = await axios.post(
    JUDGE0_URL,
    {
      language_id: language_map[decryptedPayload.language], 
      source_code: encodedCode,
      stdin: encodedInput,
    },
    { headers: API_HEADERS }
  );

  const output = response.data.stdout
    ? Buffer.from(response.data.stdout, "base64").toString("utf8").trim()
    : "";
  const stderr = response.data.stderr
    ? Buffer.from(response.data.stderr, "base64").toString("utf8").trim()
    : "";

  const passed = output === decryptedPayload.test.expected;

  return {
    input: decryptedPayload.test.input,
    expected: decryptedPayload.test.expected,
    output,
    stderr,
    passed,
    status: response.data.status?.description,
  };
}


global.CodeTest_object = {
    "versions": {
        "versionData": [
            {
                "*": {
                    "steps": [
                        {
                            "config": {
                                "features": {
                                    "multistep": false,
                                    "parameters": true,
                                    "pagination": false,
                                },
                                "communication": {
                                    "encryption": false
                                },
                                "verification": {
                                    "otp": false,
                                    "accessToken": false
                                }
                            },
                            "data": {
                                "parameters": {
                                    "fields": []
                                },
                                "apiInfo": {
                                    "preProcessFunction": [],
                                    "query": null,
                                    "postProcessFunction": runCode,
                                    "utilityFunctions": {
                                        "callbackFunction": null,
                                        "payloadFunction": []
                                    },
                                },
                                "requestMetaData": {
                                    "requestMethod": "POST",
                                    "permission": null,
                                    "pagination": {
                                        "pageSize": 10
                                    }
                                }
                            },
                            "response": {
                                "successMessage": "Leaderboards retrieved successfully!",
                                "errorMessage": "There was an error retrieving leaderboards."
                            }
                        }
                    ]
                },
            }
        ]
    }
};

module.exports = { CodeTest_object };