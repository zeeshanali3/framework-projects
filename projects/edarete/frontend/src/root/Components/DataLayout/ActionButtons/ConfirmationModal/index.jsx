// components/common/ConfirmationModal.jsx
import * as React from "react";
import { Box, Button, Typography, Modal, Stack } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function ConfirmationModal({
  open,
  title = "Are you sure?",
  description = "Do you want to proceed with this action?",
  onConfirm,
  onCancel,
}) {
  return (
    <Modal
      open={open}
      onClose={onCancel}
      aria-labelledby="confirmation-title"
      aria-describedby="confirmation-description"
    >
      <Box sx={style}>
        <Typography id="confirmation-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="confirmation-description" sx={{ mt: 2 }}>
          {description}
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          sx={{ mt: 3, justifyContent: "flex-end" }}
        >
          <Button variant="contained" color="error" onClick={onCancel}>
            No
          </Button>
          <Button variant="contained" color="primary" onClick={onConfirm}>
            Yes
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
