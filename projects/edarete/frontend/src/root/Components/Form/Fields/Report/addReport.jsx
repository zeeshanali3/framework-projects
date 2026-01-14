
import { useState } from "react";
import { useEditor } from "@tiptap/react";
import { RichTextEditor, Link } from "@mantine/tiptap";
import {
  Box,
  Button,
  Card,
  MenuItem,
  Menu,
} from "@mui/material";
import { IconTag } from "@tabler/icons-react";
import { styled } from "@mui/material/styles";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import Highlight from "@tiptap/extension-highlight";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import "@mantine/tiptap/styles.css";
import "@mantine/core/styles.css";

const CustomCard = styled(Card)(({ appearance }) => ({
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  padding: "30px 25px",
  marginBottom: "20px",
  borderRadius: "12px",
  backgroundColor: appearance?.backgroundColor || "#F9FAFB",
}));

const CustomButton = styled(Button)(({ buttonStyle }) => ({
  backgroundColor: buttonStyle?.backgroundColor || "#5A67D8",
  color: buttonStyle?.color || "#fff",
  textTransform: "capitalize",
  fontWeight: "600",
  fontSize: "15px",
  padding: "10px 30px",
  borderRadius: "10px",
  "&:hover": {
    backgroundColor: buttonStyle?.hoverBackgroundColor || "#434C9C",
  },
}));

const AddReport = ({ data, config, appearance, onContentChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const toolbarConfig = data?.features?.textCustomization?.toolbar;
  const predefinedTags = data?.features?.textCustomization?.predefinedTags;
  const buttons = data?.features?.textCustomization?.buttons;
  const content = data?.features?.textCustomization?.content;

  // Initialize Tiptap editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextStyle,
      Color,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({ placeholder: config?.editor?.placeholder }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      getFormattedContent(editor); // Call your method on content update
    },
  });

  // Function to get formatted content from the editor
  const getFormattedContent = () => {
    if (editor) {
      const content = editor.getHTML(); // Get HTML with formatting
      onContentChange(content); // Pass it to the parent component
    }
  };

  const handleOpenTagMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseTagMenu = () => setAnchorEl(null);

  const insertTag = (tagValue) => {
    editor.chain().focus().insertContent(tagValue).run();
    handleCloseTagMenu();
  };

  return (
    <>
      {/* Rich Text Editor */}
      <RichTextEditor
        editor={editor}
        styles={{
          content: {
            backgroundColor: appearance?.editor?.backgroundColor || "#fff",
            color: appearance?.editor?.color || "#000",
            border: appearance?.editor?.border || "1px solid #ccc",
            padding: "12px",
            borderRadius: "8px",
          },
        }}
      >
        <RichTextEditor.Toolbar sticky stickyOffset={60}
          style={{
            backgroundColor: appearance?.editor?.toolbarBg || "#f4f4f4",

          }}
        >
          {/* Basic Formatting */}
          <RichTextEditor.ControlsGroup
            style={{
              backgroundColor: appearance?.editor?.ControlBg || "#fafafa",
              borderRadius: "4px",

            }}
          >
            {toolbarConfig?.basicFormatting?.bold && <RichTextEditor.Bold />}
            {toolbarConfig?.basicFormatting?.italic && <RichTextEditor.Italic />}
            {toolbarConfig?.basicFormatting?.underline && (
              <RichTextEditor.Underline />
            )}
            {toolbarConfig?.basicFormatting?.strike && (
              <RichTextEditor.Strikethrough />
            )}
            {toolbarConfig?.basicFormatting?.clear && (
              <RichTextEditor.ClearFormatting />
            )}
          </RichTextEditor.ControlsGroup>

          {/* Advanced Formatting */}
          <RichTextEditor.ControlsGroup
           style={{
              backgroundColor: appearance?.editor?.ControlBg || "#fafafa",
              borderRadius: "4px",

            }}
          >
            {toolbarConfig?.advancedFormatting?.highlight && (
              <RichTextEditor.Highlight />
            )}
            {toolbarConfig?.advancedFormatting?.codeBlock && (
              <RichTextEditor.Code />
            )}
            {toolbarConfig?.advancedFormatting?.blockquote && (
              <RichTextEditor.Blockquote />
            )}
            {toolbarConfig?.advancedFormatting?.horizontalLine && (
              <RichTextEditor.Hr />
            )}
          </RichTextEditor.ControlsGroup>

          {/* Headers */}
          <RichTextEditor.ControlsGroup
           style={{
              backgroundColor: appearance?.editor?.ControlBg || "#fafafa",
              borderRadius: "4px",

            }}
          >
            {toolbarConfig?.headers?.h1 && <RichTextEditor.H1 />}
            {toolbarConfig?.headers?.h2 && <RichTextEditor.H2 />}
            {toolbarConfig?.headers?.h3 && <RichTextEditor.H3 />}
            {toolbarConfig?.headers?.h4 && <RichTextEditor.H4 />}
            {toolbarConfig?.headers?.h5 && <RichTextEditor.H5 />}
            {toolbarConfig?.headers?.h6 && <RichTextEditor.H6 />}
          </RichTextEditor.ControlsGroup>

          {/* Lists */}
          <RichTextEditor.ControlsGroup
           style={{
              backgroundColor: appearance?.editor?.ControlBg || "#fafafa",
              borderRadius: "4px",

            }}
          >
            {toolbarConfig?.lists?.unorderedList && <RichTextEditor.BulletList />}
            {toolbarConfig?.lists?.orderedList && <RichTextEditor.OrderedList />}
          </RichTextEditor.ControlsGroup>

          {/* Superscript and Subscript */}
          <RichTextEditor.ControlsGroup
           style={{
              backgroundColor: appearance?.editor?.ControlBg || "#fafafa",
              borderRadius: "4px",

            }}
          >
            {toolbarConfig?.superscriptSubscript?.sup && (
              <RichTextEditor.Superscript />
            )}
            {toolbarConfig?.superscriptSubscript?.sub && (
              <RichTextEditor.Subscript />
            )}
          </RichTextEditor.ControlsGroup>

          {/* Alignment */}
          <RichTextEditor.ControlsGroup
           style={{
              backgroundColor: appearance?.editor?.ControlBg || "#fafafa",
              borderRadius: "4px",

            }}
          >
            {toolbarConfig?.alignment?.alignLeft && <RichTextEditor.AlignLeft />}
            {toolbarConfig?.alignment?.alignCenter && (
              <RichTextEditor.AlignCenter />
            )}
            {toolbarConfig?.alignment?.alignRight && (
              <RichTextEditor.AlignRight />
            )}
            {toolbarConfig?.alignment?.alignJustify && (
              <RichTextEditor.AlignJustify />
            )}
          </RichTextEditor.ControlsGroup>

          {/* Links */}
          <RichTextEditor.ControlsGroup
           style={{
              backgroundColor: appearance?.editor?.ControlBg || "#fafafa",
              borderRadius: "4px",

            }}
          >
            {toolbarConfig?.links?.link && <RichTextEditor.Link />}
            {toolbarConfig?.links?.unlink && <RichTextEditor.Unlink />}
          </RichTextEditor.ControlsGroup>

          {/* Colors */}
          {toolbarConfig?.colors?.color && (
            <RichTextEditor.ControlsGroup
             style={{
              backgroundColor: appearance?.editor?.ControlBg || "#fafafa",
              borderRadius: "4px",

            }}
            >
              <RichTextEditor.ColorPicker colors={appearance?.colors || []} />
            </RichTextEditor.ControlsGroup>
          )}

          {/* Actions */}
          <RichTextEditor.ControlsGroup
           style={{
              backgroundColor: appearance?.editor?.ControlBg || "#fafafa",
              borderRadius: "4px",

            }}
          >
            {toolbarConfig?.actions?.undo && <RichTextEditor.Undo />}
            {toolbarConfig?.actions?.redo && <RichTextEditor.Redo />}
          </RichTextEditor.ControlsGroup>

          {/* Insert Tags */}
          {toolbarConfig?.actions?.insertTag && (
            <RichTextEditor.Control onClick={handleOpenTagMenu}
             style={{
              backgroundColor: appearance?.editor?.ControlBg || "#fafafa",
              borderRadius: "4px",

            }}
            >
              <IconTag stroke={1.5} size="1rem" />
            </RichTextEditor.Control>
          )}
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>

      {/* Tag Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseTagMenu}
      >
        {predefinedTags?.map((tag) => (
          <MenuItem key={tag.value} onClick={() => insertTag(tag.value)}>
            {tag.label}
          </MenuItem>
        ))}
      </Menu>

      {/* Buttons */}
      <Box mt={2}>
        {buttons?.map((button, index) => (
          <CustomButton
            key={index}
            onClick={button.onClick}
            buttonStyle={appearance?.buttons?.defaultStyle}
          >
            {button.label}
          </CustomButton>
        ))}
      </Box>
    </>
  );
};

export default AddReport;
