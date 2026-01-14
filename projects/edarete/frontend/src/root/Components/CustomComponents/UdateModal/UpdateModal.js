
// import React, { useState, useEffect } from "react";
// import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField ,useTheme } from "@mui/material";
// import Autocomplete from "@mui/material/Autocomplete";
// import { tokens } from "../../../assets/styles/theme/custome";
// import "./Update.css"
// const UpdateModal = ({
//   open,
//   handleClose,
//   handleUpdate,
//   title,
//   inputs,
//   initialData,
//   autocompleteOptions,
// }) => {
//   const [formData, setFormData] = useState(initialData || {});

//   useEffect(() => {
//     setFormData(initialData || {});
//   }, [initialData]);

//   const handleChange = (name, value) => {
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };
// //
// const theme = useTheme();
// const colors = tokens(theme.palette.mode);
//   return (
//     <Dialog open={open} onClose={handleClose}  sx={{borderRadius:"8px"}}>
//       <DialogTitle className="flex justify-center" sx={{background:colors.blueAccent[400] ,color:"white"} }>{title}</DialogTitle>
//       <DialogContent>
//         {inputs.map((input) =>
//           input.type === "autocomplete" ? (
//             <Autocomplete
//               key={input.name}
//               options={autocompleteOptions[input.name] || []}
//               getOptionLabel={(option) => option || ""}
//               value={formData[input.name] || null}
//               onChange={(_, value) => handleChange(input.name, value)}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   label={input.label}
//                   variant="outlined"
//                   fullWidth
//                   margin="normal"
//                 />
//               )}
//             />
//           ) : (
//             <TextField
//               key={input.name}
//               name={input.name}
//               label={input.label}
//               type={input.type}
//               variant="outlined"
//               fullWidth
//               margin="normal"
//               value={formData[input.name] || ""}
//               onChange={(e) => handleChange(input.name, e.target.value)}
//               {...input.props}
//             />
//           )
//         )}
//       </DialogContent>
//       <DialogActions sx={{background:colors.blueAccent[400] ,} }>
//         <Button onClick={handleClose} variant="primary" sx={{color:"white"}}>
//           Cancel
//         </Button>
//         <Button onClick={() => handleUpdate(formData)} variant="primary"  sx={{color:"white"}}>
//           Update
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default UpdateModal;



import React, { useState, useEffect } from "react";
import {
  Alert,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
// import "./Update.css";
import {Transition} from "../../../../Animation/Animation"
const UpdateModal = ({
  open,
  handleClose,
  handleUpdate,
  title,
  inputs,
  initialData,
  autocompleteOptions,
  setMessage
}) => {
  const [formData, setFormData] = useState(initialData || {});

  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);

  const handleChange = (name, value) => {
    // console.log("this is initial data ", formData)
    // console.log(`Updating ${name} to ${value}`);
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  console.log("update - in"  ,inputs)
  return (
    <>
    {/* onClose={handleClose} */}
    <Dialog open={open}  sx={{ borderRadius: "8px" }} fullWidth maxWidth="sm" TransitionComponent={Transition}>
      <Card className="bg-black" sx={{ border: "none", boxShadow: "0px 4px 20px rgba(47, 143, 232, 0.07)", background: "#EDEFF5" }}>
      <DialogTitle
        // className="flex justify-center header"
        // sx={{ color: "black" }}
      >
       <Typography variant="h6" component="h2" sx={{ fontWeight: "500", fontSize: "18px" }}>
       {title}
       </Typography>
      </DialogTitle>
      </Card>
      <DialogContent>
        {inputs.map((input) =>
          input.type === "autocomplete" ? (
            <Autocomplete
              key={input.name}
              options={autocompleteOptions[input.name] || []}
              getOptionLabel={(option) => option || ""}
              value={formData[input.name] || null}
              onChange={(_, value) => handleChange(input.name, value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={input.label}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  disabled={input.disabled}
                   />
              )}
            />
          ) : (
            <TextField
              key={input.name}
              name={input.name}
              label={input.label}
              type={input.type}
              variant="outlined"
              disabled={input.disabled}
              fullWidth
              margin="normal"
              value={formData[input.name] || ""}
              onChange={(e) => handleChange(input.name, e.target.value)}
              {...input.props}
            />
          )
        )}
         {setMessage && (
                <Alert variant="filled" severity="error">
                  <div style={{ textAlign: "center", color: "white" }}>
                    {setMessage}
                  </div>
                </Alert>
              )}
      </DialogContent>
      <DialogActions >
        <Button onClick={handleClose} variant="contained" 
          sx={{
            textTransform: "capitalize",
            borderRadius: "8px",
            fontWeight: "500",
            fontSize: "13px",
            padding: "12px 20px",
            color: "#fff !important",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => handleUpdate({ ...initialData, ...formData })}
          variant="contained"
          sx={{
            textTransform: "capitalize",
            borderRadius: "8px",
            fontWeight: "500",
            fontSize: "13px",
            padding: "12px 20px",
            color: "#fff !important",
          }}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
    </>

  );
};

export default UpdateModal;


