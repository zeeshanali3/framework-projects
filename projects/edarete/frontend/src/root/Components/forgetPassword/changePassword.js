// import * as React from 'react';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography'; 
// import { Btnsx } from '../../Animation/Btnsx';
// import { TypographySx } from './commonSx';

// export default function ChangePw() {
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     console.log({
//       email: data.get('email'),
//       password: data.get('password'),
//     });
//   };
//   return (
//     <>
//       <Box  m={2}>
//         <Box
//           sx={{
//             borderBottom: '1px solid #eee',
//             paddingBottom: '10px'
//           }}
//           className="for-dark-bottom-border"
//         >
//           <Typography component="h1" fontWeight="500" fontSize="18px">
//             Security
//           </Typography>

//           <Typography fontSize="13px">
//             Update your password here.
//           </Typography>
//         </Box>

//         <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={12}>
//               <Typography
//                 component="label"
//                sx={TypographySx}
//               >
//                 New Password
//               </Typography>
//               <TextField
//                 autoComplete="new-password*"
//                 name="newPassword*"
//                 fullWidth
//                 id="newPassword" 
//                 type="password"
//                 autoFocus
//               />
//             </Grid>

//             <Grid item xs={12} sm={12}>
//               <Typography
//                 component="label"
//                 sx={TypographySx}
//               >
//                 Confirm Password
//               </Typography>
//               <TextField
//                 autoComplete="confirm-password*"
//                 name="confirmPassword*"
//                 fullWidth
//                 id="confirmPassword" 
//                 type="password"
//                 autoFocus
//               />
//             </Grid>
  
            
//           </Grid>

//           <Button
//             type="submit"
//             variant="contained"
//            sx={Btnsx}
//           >
//             Change Password
//           </Button>
//         </Box>
//       </Box> 
//     </> 
//   );
// }

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'; 
import { Btnsx } from '../../Animation/Btnsx';
import { TypographySx } from './commonSx';
import { useNavigate } from 'react-router-dom';
import { routesName } from '../../routes/adminConstants';
export default function ChangePw() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  const navigate =useNavigate();
  const backFunction=()=>{
    navigate(routesName.otp)
  }
  return (
    <>
      <Box m={2}>
        <Box
          sx={{
            borderBottom: '1px solid #eee',
            paddingBottom: '10px'
          }}
          className="for-dark-bottom-border"
        >
          <Typography component="h1" fontWeight="500" fontSize="18px">
            Security
          </Typography>

          <Typography fontSize="13px">
            Update your password here.
          </Typography>
        </Box>

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Typography
                component="label"
                sx={TypographySx}
              >
                New Password
              </Typography>
              <TextField
                autoComplete="new-password*"
                name="newPassword*"
                fullWidth
                id="newPassword" 
                type="password"
                autoFocus
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Typography
                component="label"
                sx={TypographySx}
              >
                Confirm Password
              </Typography>
              <TextField
                autoComplete="confirm-password*"
                name="confirmPassword*"
                fullWidth
                id="confirmPassword" 
                type="password"
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} justifyContent="space-between">
            <Grid item>
              <Button
              type="submit"
              variant="contained"
              sx={Btnsx}
              onClick={backFunction}
              >
                Back
              </Button>
            </Grid>
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                sx={Btnsx}
              >
                Change Password
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box> 
    </> 
  );
}
