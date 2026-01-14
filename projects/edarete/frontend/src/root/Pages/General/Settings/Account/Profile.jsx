import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { updateUserData } from "../../../../Common/Store/Actions/General/UpdateActions/updateUserData";
import { updateLoading } from "../../../../Common/Store/Actions/General/UpdateActions/updateLoading";

export default function Profile() {
  const mainData = useSelector((state) => state.main);
  const dispatch = useDispatch();
  const { currentUser } = mainData;

  const [userData, setUserData] = React.useState({
    id: currentUser?.user_id || "",
    firstName: currentUser?.first_name || "",
    lastName: currentUser?.last_name || "",
    email: currentUser?.email || "",
  });

  // const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateLoading(true));
    dispatch(updateUserData(userData, onSuccess, onFailure));
  };
  const onSuccess = (response) => {
    dispatch(updateLoading(false));
  };
  const onFailure = (e) => {
    dispatch(updateLoading(false));
  }

  return (
    <>
      <Box>
        <Box
          sx={{
            borderBottom: "1px solid #eee",
            paddingBottom: "10px",
          }}
          className="for-dark-bottom-border"
        >
          <Typography component="h1" fontWeight="500" fontSize="18px">
            Profile
          </Typography>

          <Typography fontSize="13px">
            Update your photo and personal details here.
          </Typography>
        </Box>

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography
                component="label"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "10px",
                  display: "block",
                }}
              >
                First Name
              </Typography>
              <TextField
                autoComplete="given-name"
                name="firstName"
                value={userData.firstName}
                onChange={handleInputChange}
                fullWidth
                id="firstName"
                autoFocus
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography
                component="label"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "10px",
                  display: "block",
                }}
              >
                Last Name
              </Typography>
              <TextField
                fullWidth
                id="lastName"
                name="lastName"
                value={userData.lastName}
                onChange={handleInputChange}
                autoComplete="family-name"
              />
            </Grid>

            <Grid item xs={12}>
              <Typography
                component="label"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "10px",
                  display: "block",
                }}
              >
                Email Address
              </Typography>
              <TextField
                fullWidth
                id="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                autoComplete="email"
              />
            </Grid>

            <Grid item xs={12}>
              <Typography
                component="label"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "10px",
                  display: "block",
                }}
              >
                Upload Image
              </Typography>
              <TextField
                required
                fullWidth
                name="userImage"
                type="file"
                id="file"
                autoComplete="file"
                onChange={(e) =>
                  setUserData((prevState) => ({
                    ...prevState,
                    userImage: URL.createObjectURL(e.target.files[0]),
                  }))
                }
              />

              <Box mt={1}>
                <img
                  src={userData.userImage}
                  alt="profile"
                  className="borRadius100"
                  width="50px"
                  height="50px"
                />
              </Box>
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            // onClick={handleSubmit}
            sx={{
              mt: 2,
              textTransform: "capitalize",
              borderRadius: "8px",
              fontWeight: "500",
              fontSize: "14px",
              padding: "12px 30px",
              color: "#fff !important",
            }}
          >
            Update
          </Button>
        </Box>
      </Box>
    </>
  );
}