import React from "react";
import {
  Dialog,
  Typography,
  TextField,
  Button,
  Card,
  Alert,
  Stack,
  IconButton,
  Box,
  Grid,
} from "@mui/material";
import { Add, Close } from "@mui/icons-material";
import { Transition } from "../../Animation/Animation";
import AutocompleteDropdown from "../Components/CustomComponents/DropDownMenu/AutocompleteDropmenu";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";

const CustomTextField = ({
  title,
  label,
  value,
  onChange,
  inputProps,
  dropdownOptions,
  onSelect,
  getOptionLabel,
  getOptionValue,
  disabled,
  dialogHandler,
  type,
  tableName,
  column,
}) => (
  <div >
    {/* <Typography
      as="h5"
      sx={{
        fontWeight: "500",
        fontSize: "14px",
        mb: "12px",
      }}
    >
      {title}
    </Typography> */}

    {dropdownOptions ? (
      <AutocompleteDropdown
        label={label}
        value={value}
        options={dropdownOptions}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        onChange={onSelect}
        placeholder={`Select a ${label.toLowerCase()}`}
        tableName={tableName}
        column={column}
        sx={{ borderRadius: "8px" }}
        // className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
      />
    ) : (
      <TextField
        type={type}
        label={label}
        value={value}
        onChange={onChange}
        variant="outlined"
        fullWidth
        disabled={disabled}
        onClick={dialogHandler}
        InputProps={{ ...inputProps, style: { borderRadius: "8px" } }}
        
      />
    )}
  </div>
);

const AddItemComponent = ({
  open,
  close,
  token,
  title,
  textFields,
  handleAddItem,
  successMessage,
  errorMessage,
  errorLine,
  btnLabel,
}) => {
  console.log("errorLineinAddItem",errorLine)
  // Check if the number of fields is equal to or more than 4
  const displayInGrid = textFields.length >= 4;

  return (
    <Dialog
      open={open}
      onClose={close}
      fullWidth
      maxWidth="sm"
      TransitionComponent={Transition}
      sx={{ borderRadius: "10px" }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#EDEFF5",
            borderRadius: "8px",
            padding: "20px 20px",
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              fontWeight: "bold",
              fontSize: "18px",
              marginTop:"4px",
            }}
          >
            {title}
          </Typography>

          <IconButton aria-label="remove" size="small" onClick={close}>
            <ClearIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            background: "#fff",
            padding: "20px 20px",
            borderRadius: "8px",
          }}
        >
          {displayInGrid ? (
            <Grid container spacing={2}>
              {textFields.map((field, index) => (
                 <Grid item xs={12} md={displayInGrid ? 6 : 12} key={index}>
                 
                     <Typography
                    as="h5"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "14px",
                      mb: "12px", 
                    }}
                  >
                    {field.title}
                  </Typography>
                  <CustomTextField
                    {...field}
                    InputProps={{
                      style: { borderRadius: 8 },
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            textFields.map((field, index) => (
              <div>
                <Typography
                    as="h5"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "14px",
                      mb: "12px", 
                      mt: index > 0 ? "20px" : 0, 
                    }}
                  >
                    {field.title}
                  </Typography>
              <CustomTextField
               key={index}
                {...field} 
                
                InputProps={{
                  style: { borderRadius: 8 },
                }}
                />
              </div>

            ))
          )}

          <Card
            sx={{
              boxShadow: "none",
              borderRadius: "10px",
              p: "25px",
              mb: "5px",
            }}
          >
            <Stack spacing={2}>
              {errorLine && (
                <Alert variant="filled" severity="error">
                  <div style={{ textAlign: "center", color: "white" }}>
                    {errorLine}
                  </div>
                </Alert>
              )}
              {errorMessage && (
                <Alert variant="filled" severity="error">
                  <div style={{ textAlign: "center", color: "white" }}>
                    {errorMessage}
                  </div>
                </Alert>
              )}
              {successMessage && (
                <Alert variant="filled" severity="success">
                  <div style={{ color: "white", textAlign: "center" }}>
                    {successMessage}
                  </div>
                </Alert>
              )}
            </Stack>
          </Card>

         
          <Grid item xs={12} textAlign="end">
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 1,
                textTransform: "capitalize",
                borderRadius: "8px",
                fontWeight: "500",
                fontSize: "13px",
                padding: "12px 20px",
              }}
              onClick={handleAddItem}
            >
              <AddIcon
                sx={{
                  position: "relative",
                  top: "-2px",
                }}
                className="mr-5px"
              />{" "}
              Create New
            </Button>
          </Grid>
        </Box>
      </Box>
    </Dialog>
  );
};

export default AddItemComponent;
