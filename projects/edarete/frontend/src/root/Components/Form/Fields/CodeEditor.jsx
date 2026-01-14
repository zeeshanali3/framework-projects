import React, { useState, useEffect } from "react";
import MultiCodeEditor from "../../../Components/Quiz/MultiCodeFileEditor";

const CodeEditor = ({ field, formValues, setFormValues, currentStep }) => {
    const [files, setFiles] = useState({});

    const unescapeStringValue = (str) => {
        if (typeof str !== "string") return str;
        return str
            .replace(/\\n/g, "\n")
            .replace(/\\r/g, "\r")
            .replace(/\\t/g, "\t")
            .replace(/\\\"/g, '"')
            .replace(/\\\\/g, "\\");
    };

    const unescapeFiles = (filesObj) => {
        if (!filesObj || typeof filesObj !== "object") return {};
        const out = {};
        Object.entries(filesObj).forEach(([k, v]) => {
            out[k] = {
                ...(v || {}),
                value: unescapeStringValue((v && v.value) || ""),
            };
        });
        return out;
    };

        // Only re-parse when the stored raw answer changes to avoid loops
        const rawSavedAnswer = formValues?.[currentStep]?.[field.dynamicKey];
        useEffect(() => {
                try {
                        const raw = rawSavedAnswer;
                        console.log("[CodeEditor] raw saved answer:", raw);

                        if (!raw || raw === "undefined") {
                                if (Object.keys(files).length !== 0) setFiles({});
                                return;
                        }

                        let parsed = raw;
                        if (typeof raw === "string") {
                                try {
                                        parsed = JSON.parse(raw);
                                } catch (e) {
                                        try {
                                                const attempt = raw.replace(/\\\\\"/g, '\\\"');
                                                parsed = JSON.parse(attempt);
                                        } catch (e2) {
                                                console.warn("[CodeEditor] could not parse saved answer JSON", e2);
                                                parsed = null;
                                        }
                                }
                        }

                        if (parsed && typeof parsed === "object") {
                                const normalized = {};
                                Object.entries(parsed).forEach(([name, meta]) => {
                                        normalized[name] = {
                                                ...(meta || {}),
                                                value: (meta && meta.value) || "",
                                        };
                                });
                                const unescaped = unescapeFiles(normalized);
                                const unescapedJson = JSON.stringify(unescaped);
                                // Only update state if different to prevent re-render loops
                                if (JSON.stringify(files) !== unescapedJson) {
                                        setFiles(unescaped);
                                }
                                return;
                        }

                        if (Object.keys(files).length !== 0) setFiles({});
                } catch (err) {
                        console.warn("[CodeEditor] error reading saved answer", err);
                        if (Object.keys(files).length !== 0) setFiles({});
                }
        }, [rawSavedAnswer]);

    useEffect(() => {
        if (typeof setFormValues !== "function") return;
        try {
            const newValue = JSON.stringify(files);
            const prevValue = formValues?.[currentStep]?.[field.dynamicKey];
            // If stored value already equals newValue, skip update to avoid loops
            if (prevValue === newValue) return;

            setFormValues((prev) => {
                const updated = Array.isArray(prev) ? [...prev] : { ...(prev || {}) };
                if (Array.isArray(updated)) {
                    updated[currentStep] = {
                        ...(updated[currentStep] || {}),
                        [field.dynamicKey]: newValue,
                    };
                } else {
                    updated[currentStep] = {
                        ...(updated[currentStep] || {}),
                        [field.dynamicKey]: newValue,
                    };
                }
                return updated;
            });
        } catch (err) {
            console.warn("[CodeEditor] failed to write files to formValues", err);
        }
    }, [files, formValues, currentStep, field?.dynamicKey]);

    return (
        <MultiCodeEditor
            isField={true}
            isTestCaseFileEnabled={true}
            priviousCodeAnswers={files}
            setFilesField={setFiles}
        />
    );
};

export default CodeEditor;