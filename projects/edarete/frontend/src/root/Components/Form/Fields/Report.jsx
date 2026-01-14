
import React, { useState, useEffect } from "react";
import { useTheme, Box } from "@mui/material";
import { data, config, appearance } from "./Report/reportConfig";
import AddReport from "./Report/addReport";
import {
  initializeFieldValues,
  renderFields,
} from "./HelperFunctions";

export default function Report({
  field,
  formValues,
  isRequired,
  isReadOnly,
  setFormValues,
  allTagValues,
  setAllTagValues,
  currentStep,
}) {
  const theme = useTheme();
  const fieldTheme = theme.customTokens[theme.palette.mode]?.form?.field;
  console.log("my theme", fieldTheme)
  const listField = {
    name: "tags",
    dynamicKey: "tags",
    type: "listOfFields",
    label: "Add Tags",
    childFields: [
      {
        name: "label",
        dynamicKey: "label",
        label: "Label",
        type: "textField",
      },
      {
        name: "value",
        dynamicKey: "value",
        label: "Value",
        type: "textField",
      },
    ],
  };

  const key = field.dynamicKey;

  const [tagValues, setTagValues] = useState(allTagValues[key] || []);
  const [tagKeys, setTagKeys] = useState([]);
  const [editorContent, setEditorContent] = useState("");

  initializeFieldValues(field, formValues[currentStep]);
  data.features.textCustomization.content = formValues[currentStep][key];

  const handleContentChange = (content) => {
    setEditorContent(content);
    data.features.textCustomization.content = content;
    formValues[currentStep][key] = content;
  };

  useEffect(() => {
    setAllTagValues({ [field.dynamicKey]: tagValues });

    if (tagValues[0]?.tags) {
      const transformedTags = tagValues[0].tags.map((tag) => ({
        ...tag,
        value: `{${tag.value}}`,
      }));
      data.features.textCustomization.predefinedTags = transformedTags;
    }
  }, [tagValues]);

  return (
    <Box
      sx={{
        backgroundColor: fieldTheme?.backgroundColor,
        color: fieldTheme?.iconcolor,
        p: 2,
        borderRadius: 2,
        boxShadow: fieldTheme?.listItemShadow,
      }}
    >
      {renderFields({
        field: listField,
        formValues: tagValues,
        inputFields: {
          color: fieldTheme?.tabcolor,
          borderColor: fieldTheme?.borderColor,
          focusColor: fieldTheme?.focusColor,
          labelColor: fieldTheme?.labelColor,
          backgroundColor: fieldTheme?.backgroundColor,
        },
        isReadOnly,
        setFormValues: setTagValues,
        allTagValues,
        setAllTagValues,
        currentStep: 0,
        formKeys: tagKeys,
        setFormKeys: setTagKeys,
        fields: [listField],
      })}

      <AddReport
        data={data}
        config={config}
        appearance={{
          ...appearance,
          editor: {
            backgroundColor: fieldTheme?.backgroundColor,
            color: fieldTheme?.color,
            border: `1px solid ${fieldTheme?.borderColor}`,
            toolbarBg: fieldTheme?.toolbarbg || "#e0e0e0",
            ControlBg: fieldTheme?.ControlBg || "#f9f9f9",
          },
        }}
        onContentChange={handleContentChange}
      />
    </Box>
  );
}
