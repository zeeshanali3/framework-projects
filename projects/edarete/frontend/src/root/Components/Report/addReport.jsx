import { useState } from "react";
import { useEditor } from "@tiptap/react";
import { RichTextEditor, Link } from "@mantine/tiptap";
import {
  Box,
  Button,
  Card,
  TextField,
  MenuItem,
  Menu,

} from "@mui/material";
import { IconTag } from "@tabler/icons-react"; // Import icons
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

const CustomCard = styled(Card)(({ theme, appearance }) => ({
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  padding: "30px 25px",
  marginBottom: "20px",
  borderRadius: "12px",
  backgroundColor: appearance?.backgroundColor || "#F9FAFB",
}));

const CustomButton = styled(Button)(({ theme, buttonStyle }) => ({
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

const AddReport = ({ data, config, appearance }) => {
  const [reportTitle, setReportTitle] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const toolbarConfig = data.features.textCustomization.toolbar;
  const predefinedTags = data.features.textCustomization.predefinedTags;
  const buttons = data.features.textCustomization.buttons;

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
      Placeholder.configure({ placeholder: config.editor.placeholder }),
    ],
    content: "",
  });

  const handleOpenTagMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseTagMenu = () => setAnchorEl(null);

  const insertTag = (tagValue) => {
    editor.chain().focus().insertContent(tagValue).run();
    handleCloseTagMenu();
  };

  return (
    <CustomCard appearance={appearance.features.textCustomization.editorStyle}>
      <TextField
        label="Title"
        value={reportTitle}
        onChange={(e) => setReportTitle(e.target.value)}
        fullWidth
        required
        margin="normal"
      />

      {/* Rich Text Editor */}
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          {/* Basic Formatting */}
          <RichTextEditor.ControlsGroup>
            {toolbarConfig.basicFormatting.bold && <RichTextEditor.Bold />}
            {toolbarConfig.basicFormatting.italic && <RichTextEditor.Italic />}
            {toolbarConfig.basicFormatting.underline && (
              <RichTextEditor.Underline />
            )}
            {toolbarConfig.basicFormatting.strike && (
              <RichTextEditor.Strikethrough />
            )}
            {toolbarConfig.basicFormatting.clear && (
              <RichTextEditor.ClearFormatting />
            )}
          </RichTextEditor.ControlsGroup>

          {/* Advanced Formatting */}
          <RichTextEditor.ControlsGroup>
            {toolbarConfig.advancedFormatting.highlight && (
              <RichTextEditor.Highlight />
            )}
            {toolbarConfig.advancedFormatting.codeBlock && (
              <RichTextEditor.Code />
            )}
            {toolbarConfig.advancedFormatting.blockquote && (
              <RichTextEditor.Blockquote />
            )}
            {toolbarConfig.advancedFormatting.horizontalLine && (
              <RichTextEditor.Hr />
            )}
          </RichTextEditor.ControlsGroup>

          {/* Headers */}
          <RichTextEditor.ControlsGroup>
            {toolbarConfig.headers.h1 && <RichTextEditor.H1 />}
            {toolbarConfig.headers.h2 && <RichTextEditor.H2 />}
            {toolbarConfig.headers.h3 && <RichTextEditor.H3 />}
            {toolbarConfig.headers.h4 && <RichTextEditor.H4 />}
            {toolbarConfig.headers.h5 && <RichTextEditor.H5 />}
            {toolbarConfig.headers.h6 && <RichTextEditor.H6 />}
          </RichTextEditor.ControlsGroup>

          {/* Lists */}
          <RichTextEditor.ControlsGroup>
            {toolbarConfig.lists.unorderedList && <RichTextEditor.BulletList />}
            {toolbarConfig.lists.orderedList && <RichTextEditor.OrderedList />}
          </RichTextEditor.ControlsGroup>

          {/* Superscript and Subscript */}
          <RichTextEditor.ControlsGroup>
            {toolbarConfig.superscriptSubscript.sup && (
              <RichTextEditor.Superscript />
            )}
            {toolbarConfig.superscriptSubscript.sub && (
              <RichTextEditor.Subscript />
            )}
          </RichTextEditor.ControlsGroup>

          {/* Alignment */}
          <RichTextEditor.ControlsGroup>
            {toolbarConfig.alignment.alignLeft && <RichTextEditor.AlignLeft />}
            {toolbarConfig.alignment.alignCenter && (
              <RichTextEditor.AlignCenter />
            )}
            {toolbarConfig.alignment.alignRight && (
              <RichTextEditor.AlignRight />
            )}
            {toolbarConfig.alignment.alignJustify && (
              <RichTextEditor.AlignJustify />
            )}
          </RichTextEditor.ControlsGroup>

          {/* Links */}
          <RichTextEditor.ControlsGroup>
            {toolbarConfig.links.link && <RichTextEditor.Link />}
            {toolbarConfig.links.unlink && <RichTextEditor.Unlink />}
          </RichTextEditor.ControlsGroup>

          {/* Colors */}
          {toolbarConfig.colors.color && (
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.ColorPicker colors={appearance.colors || []} />
            </RichTextEditor.ControlsGroup>
          )}

          {/* Actions */}
          <RichTextEditor.ControlsGroup>
            {toolbarConfig.actions.undo && <RichTextEditor.Undo />}
            {toolbarConfig.actions.redo && <RichTextEditor.Redo />}
          </RichTextEditor.ControlsGroup>

          {/* Insert Tags */}
          {toolbarConfig.actions.insertTag && (
            <RichTextEditor.Control onClick={handleOpenTagMenu}>
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
        {predefinedTags.map((tag) => (
          <MenuItem key={tag.value} onClick={() => insertTag(tag.value)}>
            {tag.label}
          </MenuItem>
        ))}
      </Menu>

      {/* Buttons */}
      <Box display="flex" justifyContent="space-between" width="100%" sx={{marginTop:'20px'}}>
        {buttons.map((button, index) => (
          <CustomButton
            key={index}
            onClick={button.onClick}
            buttonStyle={appearance.buttons.defaultStyle}
          >
            {button.label}
          </CustomButton>
        ))}
      </Box>
    </CustomCard>
  );
};

export default AddReport;
