import React from "react";
import {
  Dialog,
  Card,
  Typography,
  IconButton,
  Button,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Close, DeleteOutline } from "@mui/icons-material";
import { Transition } from "../../Animation/Animation";

const tablecellSX = {
  fontWeight: 500,
  borderBottom: "1px solid #F7FAFF",
  fontSize: "16px",
  padding: "9px 10px",
  color: "black",
};
const tableheaderSX = {
  fontWeight: 500,
  borderBottom: "1px solid #F7FAFF",
  fontSize: "16px",
  padding: "9px 10px",
};
const DeleteModal = ({ open, close, selectedRowData, handleDelete }) => {
  return (
    <Dialog
      open={open}
      onClose={close}
      fullWidth
      maxWidth="sm"
      TransitionComponent={Transition}
      sx={{ borderRadius: "10px" }}
    >
      <Card
        className="bg-black"
        sx={{
          border: "none",
          boxShadow: "0px 4px 20px rgba(47, 143, 232, 0.07)",
          background: "#EDEFF5",
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          sx={{ fontWeight: "500", fontSize: "18px" }}
          className="pt-2 pb-2 pl-2"
        >
          <IconButton
            onClick={() => {
              handleDelete(selectedRowData.ComponentID);
              close();
            }}
            sx={{ color: "red" }}
          >
            <DeleteOutline />
          </IconButton>

          <IconButton color="black" onClick={close}>
            <Close />
          </IconButton>
        </Typography>
      </Card>
      <DialogContent>
        {selectedRowData && (
          <TableContainer component={Paper}>
            <Table size="small" className="dark-table">
              <TableHead sx={{ background: "#F7FAFF" }}>
                <TableRow>
                  <TableCell sx={tableheaderSX}>Attribute</TableCell>
                  <TableCell sx={tableheaderSX}>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={tableheaderSX}>Component Name</TableCell>
                  <TableCell sx={tablecellSX}>
                    {selectedRowData.ComponentName}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={tableheaderSX}>Component Policy</TableCell>
                  <TableCell sx={tablecellSX}>
                    {selectedRowData.ComponentPolicy}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={tableheaderSX}>Component Type</TableCell>
                  <TableCell sx={tablecellSX}>
                    {selectedRowData.ComponentType}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={tableheaderSX}>Weightage</TableCell>
                  <TableCell sx={tablecellSX}>
                    {selectedRowData.Weightage}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DialogContent>
      {/* <Button onClick={close} color="error" variant="contained" sx={{ mt: 2 }}>Cancel</Button> */}
    </Dialog>
  );
};

export default DeleteModal;
