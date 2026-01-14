import React from "react";
import { Dialog, DialogActions, DialogTitle, DialogContent, Typography, TextField, Button, Card, Alert, Stack, FormControl, InputLabel, MenuItem } from "@mui/material";
import { Add, Close } from "@mui/icons-material";
import Autocomplete from "@mui/material/Autocomplete";
import { Transition } from "../Animation/Animation";
import { Btnsx } from "../Animation/Btnsx";

const CustomTextField = ({ title, label, value, onChange, inputProps, dropdownOptions, onSelect, getOptionLabel, getOptionValue, disabled, dialogHandler, type, tableName, column, hide }) => (
  !hide && (
    <div className="pt-1 pb-1">
      <Typography
        as="h5"
        sx={{
          fontWeight: "500",
          fontSize: "14px",
        }}
      >
        {title}
      </Typography>

      {!dropdownOptions ? (
        <TextField
          type={type}
          label={label}
          value={value}
          onChange={onChange}
          variant="outlined"
          fullWidth
          disabled={disabled}
          onClick={dialogHandler}
          InputProps={inputProps}
        />
      ) : (
        <Autocomplete
          fullWidth
          disablePortal
          value={value}
          onChange={(event, newValue) => {
            onSelect(newValue);
          }}
          options={dropdownOptions}
          getOptionLabel={getOptionLabel}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              variant="outlined"
              fullWidth
              InputProps={{ ...params.InputProps, ...inputProps }}
            />
          )}
        />
      )}
    </div>
  )
);

const AddItemComponent = ({ open, close, token, title, textFields, handleAddItem, successMessage, errorMessage, errorLine, btnLabel }) => {
  return (
    <Dialog open={open} onClose={close} fullWidth maxWidth="sm" TransitionComponent={Transition} sx={{ borderRadius: "10px" }}>
      <Card className="bg-black" sx={{ border: "none", boxShadow: "0px 4px 20px rgba(47, 143, 232, 0.07)", background: "#EDEFF5" }}>
        <DialogTitle>
          <Typography variant="h6" component="h2" sx={{ fontWeight: "500", fontSize: "18px" }}>
            {title}
          </Typography>
        </DialogTitle>
      </Card>

      <DialogContent>
        {textFields.map((field, index) => (
          <CustomTextField key={index} {...field} />
        ))}
      </DialogContent>

      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px",
          mb: "5px",
        }}
      >
        <Stack sx={{ width: '100%' }} spacing={2}>
          {errorLine && (
            <Alert variant="filled" severity="error">
              <div style={{ textAlign: "center", color: "white" }}>{errorLine}</div>
            </Alert>
          )}
          {errorMessage && (
            <Alert variant="filled" severity="error">
              <div style={{ textAlign: "center", color: "white" }}>{errorMessage}</div>
            </Alert>
          )}
          {successMessage && (
            <Alert variant="filled" severity="success">
              <div style={{ color: "white", textAlign: "center" }}>{successMessage}</div>
            </Alert>
          )}
        </Stack>
      </Card>

      <DialogActions>
        <Button startIcon={<Close />} color="primary" variant="contained" onClick={close} sx={Btnsx}>
          Cancel
        </Button>
        <Button startIcon={<Add />} color="primary" variant="contained" className="ml-1" onClick={handleAddItem} sx={Btnsx}>
          {btnLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddItemComponent;
