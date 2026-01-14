import React, { useState, useEffect } from "react";
import { Box, Stack, Button, Typography } from "@mui/material";
import MultiCodeEditor from "../../../Components/Quiz/MultiCodeFileEditor";
import Editor from "@monaco-editor/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TEMPLATE_CODE = {
  // ===============================================================
  // test runner main
  // ===============================================================
  'test_runner_main.cpp': {
    name: 'test_runner_main.cpp',
    language: 'cpp',
    value: `#include "catch.hpp"

int main() {
    Catch::runAllTests();
    return 0;
}
`,
  },
  // ===============================================================
  // main.cpp
  // ===============================================================
  'main.cpp': {
    name: 'main.cpp',
    language: 'cpp',
    value: `#include <iostream>
#include "Tree.h"
using namespace std;

void menu() {
    cout << "\\n========= GENERAL TREE MENU =========" << endl;
    cout << "1. Insert Node" << endl;
    cout << "2. Delete Node" << endl;
    cout << "3. Print Tree (Preorder)" << endl;
    cout << "0. Exit" << endl;
    cout << "Enter your choice: ";
}

int main() {
    Tree tree;
    int choice;
    do {
        menu();
        cin >> choice;
        if (choice == 1) {
            int parent, value;
            cout << "Enter parent value (-1 for root): ";
            cin >> parent;
            cout << "Enter new node value: ";
            cin >> value;
            if (tree.insertNode(parent, value)) cout << "Inserted successfully!";
            else cout << "Parent not found!";
        } else if (choice == 2) {
            int val;
            cout << "Enter node value to delete: ";
            cin >> val;
            if (tree.deleteNode(val)) cout << "Node deleted.";
            else cout << "Node not found.";
        } else if (choice == 3) {
            tree.printTree();
        }
    } while (choice != 0);
    return 0;
}`,
  },
  // ===============================================================
  // Tree.h
  // ===============================================================
  'Tree.h': {
    name: 'Tree.h',
    language: 'cpp',
    value: `#ifndef TREE_H
#define TREE_H

#include <iostream>   // for std::cout, std::endl
#include <algorithm>  // optional, if needed

class ArrayTree {
private:
    int* tree;
    int capacity;
    int size;

public:
    ArrayTree(int cap = 100) : capacity(cap), size(0) {
        tree = new int[capacity];
        for (int i = 0; i < capacity; i++) tree[i] = -1;
    }

    ~ArrayTree() { delete[] tree; }

    void insertNode(int value) {
        if (size >= capacity) {
            std::cout << "Tree is full!" << std::endl;
            return;
        }
        tree[size++] = value;
    }

    int getRoot() const { return -1; }           // empty

    void buildMinHeap() { /* empty */ }          // empty

    // Returns a pointer to an array of 2 integers: left and right child indices
    int* getChildrenIndices(int index) const {
        static int children[2] = {0, 1};  // intentionally wrong for failing tests
        return children;
    }

    bool isMinHeap() const { return false; }    // intentionally fails
};

#endif // TREE_H// `,
  },

  'testcase.cpp': {
    name: 'testcase.cpp',
    language: 'cpp',
    value: `#define CATCH_CONFIG_MAIN
#include "catch.hpp"
#include "tree.h"

// =======================
//   BUILD MIN HEAP TESTS
// =======================

void test_build_min_heap_empty_tree() {
    ArrayTree tree;
    tree.buildMinHeap();
    REQUIRE(tree.isMinHeap()); // FAIL: stub does not build heap
}

void test_build_min_heap_single_node() {
    ArrayTree tree;
    tree.insertNode(42);
    tree.buildMinHeap();
    REQUIRE(tree.isMinHeap()); // FAIL: stub does not build heap
}

void test_build_min_heap_multiple_nodes() {
    ArrayTree tree;
    int vals[] = {10, 5, 15, 3, 7};
    for (int v : vals) tree.insertNode(v);
    tree.buildMinHeap();
    REQUIRE(tree.isMinHeap()); // FAIL: stub does not build heap
}

// =======================
//   CHILDREN INDEX TESTS
// =======================

void test_children_indices_root() {
    ArrayTree tree;
    tree.insertNode(10);
    tree.insertNode(20);
    tree.insertNode(30);

    int* children = tree.getChildrenIndices(0);
    REQUIRE(children[0] == 1); // FAIL: stub returns -1
    REQUIRE(children[1] == 2); // FAIL: stub returns -1
}

void test_children_indices_left_child() {
    ArrayTree tree;
    tree.insertNode(10);
    tree.insertNode(20);
    tree.insertNode(30);
    tree.insertNode(40);

    int* children = tree.getChildrenIndices(1);
    REQUIRE(children[0] == 3); // FAIL: stub returns -1
    REQUIRE(children[1] == -1); // FAIL: stub returns -1
}

void test_children_indices_invalid() {
    ArrayTree tree;
    tree.insertNode(10);

    int* children = tree.getChildrenIndices(100);
    REQUIRE(children[0] == -1); // stub returns -1, test expects -1 so this passes
    REQUIRE(children[1] == -1); // stub returns -1, test expects -1 so this passes
}

// =======================
//   REGISTER TESTS
// =======================

namespace {
    Catch::Registrar r1("Build Min Heap Empty Tree", test_build_min_heap_empty_tree);
    Catch::Registrar r2("Build Min Heap Single Node", test_build_min_heap_single_node);
    Catch::Registrar r3("Build Min Heap Multiple Nodes", test_build_min_heap_multiple_nodes);
    Catch::Registrar r4("Children Indices Root", test_children_indices_root);
    Catch::Registrar r5("Children Indices Left Child", test_children_indices_left_child);
    Catch::Registrar r6("Children Indices Invalid", test_children_indices_invalid);
}
`,
  },
  // ===============================================================
  // catch.hpp
  // ===============================================================
  'catch.hpp': {
    name: 'catch.hpp',
    language: 'cpp',
    value: `#ifndef CATCH_HPP
#define CATCH_HPP

#include <iostream>
#include <sstream>
#include <stdexcept>
#include <string>
#include <vector>

namespace Catch {

class AssertionException : public std::exception {
    std::string msg;
public:
    explicit AssertionException(const std::string& s) : msg(s) {}
    const char* what() const noexcept override { return msg.c_str(); }
};

#define REQUIRE(cond) do { \
    if(!(cond)) { \
        std::ostringstream oss; \
        oss << "[FAIL] " << __func__ << " -> Requirement failed: " #cond; \
        throw Catch::AssertionException(oss.str()); \
    } \
} while(0)

#define REQUIRE_EQ(actual,expected) do { \
    auto actual_val = (actual); \
    auto expected_val = (expected); \
    if(!(actual_val == expected_val)) { \
        std::ostringstream oss; \
        oss << "[FAIL] " << __func__ \
            << " -> Requirement failed: " #actual " == " #expected; \
        oss << "  expected: " << expected_val; \
        oss << "  actual  : " << actual_val; \
        throw Catch::AssertionException(oss.str()); \
    } \
} while(0)

#define REQUIRE_NE(actual,expected) do { \
    auto actual_val = (actual); \
    auto expected_val = (expected); \
    if(!(actual_val != expected_val)) { \
        std::ostringstream oss; \
        oss << "[FAIL] " << __func__ \
            << " -> Requirement failed: " #actual " != " #expected; \
        oss << "  expected: " << expected_val; \
        oss << "  actual  : " << actual_val; \
        throw Catch::AssertionException(oss.str()); \
    } \
} while(0)

using TestFunc = void (*)();

struct Registrar {
    struct Test { std::string name; TestFunc func; };
    static std::vector<Test>& getTests() {
        static std::vector<Test> tests;
        return tests;
    }
    Registrar(const std::string& name, TestFunc func) {
        getTests().push_back({name, func});
    }
};

inline void runAllTests() {
    int passed = 0, failed = 0;

    for(auto& t : Registrar::getTests()) {
        try {
            t.func();
            std::cout << "[PASS] " << t.name <<std::endl;
            passed++;
        }
        catch(const AssertionException& e) {
            std::cout << "[FAIL] " << t.name << ": " << e.what() << std::endl;
            failed++;
        }
        catch(const std::exception& e) {
            std::cout << "[FAIL] " << t.name << " (exception): " << e.what() << std::endl;
            failed++;
        }
    }
    std::cout << "Tests Passed: " << passed << "  Failed: " << failed << std::endl;
}

} // namespace Catch

#endif // CATCH_HPP
`,
  },
};

const TEMPLATE_OBJECT = {
  pre: { style: "" },
  code: TEMPLATE_CODE,
  post: { style: "" },
};

export default function UnifiedCodeRichEditor({
  field,
  formValues,
  setFormValues,
  currentStep,
  isReadOnly = false,
}) {
  const [sections, setSections] = useState({});
  const [activeSection, setActiveSection] = useState("pre");

  // Robust JSON repair using character-by-character parsing
  const repairJSON = (value) => {
    // If already an object, return it
    if (typeof value === 'object' && value !== null) {
      return value;
    }

    // If not a string, can't parse
    if (typeof value !== 'string') {
      return null;
    }

    try {
      // Try direct parse first
      return JSON.parse(value);
    } catch (e1) {
      console.log('⚠️ First parse failed, attempting character-by-character repair...');
      
      try {
        // Character-by-character state machine to fix unescaped quotes
        let result = '';
        let i = 0;
        let inString = false;
        let inValueField = false;
        let escapeNext = false;
        
        while (i < value.length) {
          const char = value[i];
          const lookAhead = value.substring(i, i + 10);
          
          // Check if we're entering a "value" field
          if (!inString && lookAhead.startsWith('"value":"')) {
            result += '"value":"';
            i += 9;
            inValueField = true;
            
            // Now process the value content until we find the proper closing quote
            let valueContent = '';
            let braceDepth = 0;
            
            while (i < value.length) {
              const c = value[i];
              const next = value[i + 1];
              
              // Handle escape sequences
              if (c === '\\' && !escapeNext) {
                escapeNext = true;
                valueContent += c;
                i++;
                continue;
              }
              
              if (escapeNext) {
                escapeNext = false;
                valueContent += c;
                i++;
                continue;
              }
              
              // Track nested braces
              if (c === '{') braceDepth++;
              if (c === '}') braceDepth--;
              
              // Check if this quote ends the value (not escaped, depth 0, followed by } or ,)
              if (c === '"' && braceDepth === 0) {
                if (next === '}' || next === ',' || next === undefined) {
                  // This is the closing quote for the value field
                  break;
                }
              }
              
              valueContent += c;
              i++;
            }
            
            // Properly escape the value content
            const escaped = valueContent
              .replace(/\\/g, '\\\\')
              .replace(/"/g, '\\"')
              .replace(/\n/g, '\\n')
              .replace(/\r/g, '\\r')
              .replace(/\t/g, '\\t');
            
            result += escaped + '"';
            inValueField = false;
            i++; // Skip the closing quote
            continue;
          }
          
          // Normal character processing
          result += char;
          i++;
        }
        
        console.log('🔧 Repaired JSON (sample):', result.substring(0, 300));
        return JSON.parse(result);
      } catch (e2) {
        console.error('❌ Character-by-character repair failed:', e2);
        console.error('Failed at position:', e2.message);
        
        // Last resort: Use a JSON5 library or manual object construction
        // For now, return null and use template
        return null;
      }
    }
  };

  useEffect(() => {
    const savedValue = formValues[currentStep]?.[field.dynamicKey];

    console.log('📥 Raw savedValue type:', typeof savedValue);

    // CASE 1: No saved value
    if (!savedValue) {
      if (Object.keys(sections).length > 0) return;
      console.log('✅ No saved value, using template');
      setSections(TEMPLATE_OBJECT);
      return;
    }

    // CASE 2: Parse the value
    const parsed = repairJSON(savedValue);
    
    if (parsed) {
      console.log('✅ Successfully parsed');
      if (JSON.stringify(sections) !== JSON.stringify(parsed)) {
        setSections(parsed);
      }
    } else {
      console.error('❌ Could not parse, using template');
      console.error('Failed string length:', typeof savedValue === 'string' ? savedValue.length : 'N/A');
      setSections(TEMPLATE_OBJECT);
    }
  }, [formValues[currentStep]?.[field.dynamicKey]]);

  // Save changes to formValues
  const saveToFormValues = (updatedSections) => {
    setFormValues((prev) => {
      const updated = [...prev];
      updated[currentStep] = {
        ...(updated[currentStep] || {}),
        [field.dynamicKey]: JSON.stringify(updatedSections),
      };
      return updated;
    });
  };

  // Handle Monaco editor for code - FIX: Parse code if it's a string
  const handleCodeChange = (value) => {
    // value should be the files object from MultiCodeEditor
    const updatedSections = { ...sections, code: value };
    setSections(updatedSections);
    saveToFormValues(updatedSections);
  };

  // Handle React Quill editor for pre/post
  const handleRichTextChange = (section, html) => {
    const updatedSections = {
      ...sections,
      [section]: {
        // text: html.replace(/<[^>]+>/g, ""), // raw text
        style: html, // styled HTML
      },
    };
    console.log("Updated Sections:", updatedSections);
    setSections(updatedSections);
    saveToFormValues(updatedSections);
  };

  // Map field.type to Monaco language
  const languageMap = { cpp: "cpp", xml: "xml", yaml: "yaml" };
  const language = languageMap[field.type] || "text";

  const editor = {
    language: language,
    options: {
      readOnly: isReadOnly,
      fontFamily: "Fira Code, monospace",
      fontSize: 14,
      tabSize: 2,
      automaticLayout: true,
      wordWrap: "on",
    },
  };

  // Helper to ensure code is an object for MultiCodeEditor
  const getCodeForEditor = () => {
    const code = sections.code;
    
    // If code is undefined or null, return empty object
    if (!code) {
      return {};
    }
    
    // If code is already an object, return it
    if (typeof code === 'object' && !Array.isArray(code)) {
      return code;
    }
    
    // If code is a string, try to parse it
    if (typeof code === 'string') {
      try {
        const parsed = JSON.parse(code);
        console.log('✅ Parsed code for editor:', parsed);
        return parsed;
      } catch (e) {
        console.error('❌ Failed to parse code string:', e);
        return {};
      }
    }
    
    // Fallback
    return {};
  };

  return (
    <Box sx={{ mt: 2, width: "100%", maxWidth: "100%", overflow: "hidden" }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        {field?.label}
      </Typography>

      {/* Tabs */}
      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
        {["pre", "code", "post"].map((section) => (
          <Button
            key={section}
            variant={activeSection === section ? "contained" : "outlined"}
            size="small"
            onClick={() => setActiveSection(section)}
          >
            {section?.toUpperCase()}
          </Button>
        ))}
      </Stack>

      {/* Editor */}
      {activeSection === "code" ? (
        <MultiCodeEditor
          isField={true}
          priviousCodeAnswers={getCodeForEditor()} // ✅ FIX: Pass parsed object
          setFilesField={handleCodeChange}
          editor={editor}
          isTestCaseFileEnabled={true}
        />
      ) : (
        <ReactQuill
          key={activeSection}
          theme="snow"
          value={sections[activeSection]?.style || ""}
          onChange={(html) => handleRichTextChange(activeSection, html)}
          readOnly={isReadOnly}
          modules={{
            toolbar: [
              ["bold", "italic", "underline", "strike"],
              [{ color: [] }, { background: [] }],
              [{ list: "ordered" }, { list: "bullet" }],
              ["clean"],
            ],
          }}
          formats={[
            "bold",
            "italic",
            "underline",
            "strike",
            "color",
            "background",
            "list",
            "bullet",
          ]}
          style={{ height: "200px", marginBottom: "1rem" }}
        />
      )}
    </Box>
  );
}
