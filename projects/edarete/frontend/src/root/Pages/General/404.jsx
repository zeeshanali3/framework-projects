import React from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

export default function ErrorPage() {
  const navigate = useNavigate(); // Use navigate for programmatic navigation

  const handleBackToHome = () => {
    navigate("/login"); // Navigate to /login
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        padding: "150px 0",
      }}
    >
      <img src="/images/error.png" alt="error" />

      <Typography
        sx={{
          fontWeight: "500",
          fontSize: "22px",
          mt: "20px",
          mb: "10px",
        }}
      >
        Oops!! The page you are looking for doesn't exist!
      </Typography>

      <Typography>
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </Typography>

      <Button
        onClick={handleBackToHome} // Attach the handler
        type="button"
        variant="contained"
        sx={{
          mt: 3,
          textTransform: "capitalize",
          borderRadius: "8px",
          fontWeight: "500",
          fontSize: "13px",
          padding: "12px 30px",
          color: "#fff !important",
        }}
      >
        Back To Home
      </Button>
    </Box>
  );
}

// import React from 'react';
// import { Typography } from "@mui/material";
// import Box from '@mui/material/Box';
// import { Link } from 'react-router-dom';
// import Button from "@mui/material/Button";

// export default function ErrorPage() {
//   return (
//     <>
//       <Box
//         sx={{
//           textAlign: 'center',
//           padding: '150px 0'
//         }}
//       >
//         <img src='/images/error.png' alt='error' />

//         <Typography 
//           as="h1" 
//           sx={{
//             fontWeight: '500',
//             fontSize: '22px',
//             mt: '20px',
//             mb: '10px',
//           }}
//         >
//           Oops!! The page you are looking for doesn't exist!
//         </Typography>

//         <Typography>
//           The page you are looking for might have been removed had its name changed or is temporarily unavailable.
//         </Typography>
        
//         <Link href="/" className="text-decoration-none">
//           <Button
//             type="submit"
//             variant="contained"
//             sx={{
//               mt: 3,
//               textTransform: "capitalize",
//               borderRadius: "8px",
//               fontWeight: "500",
//               fontSize: "13px",
//               padding: "12px 30px",
//               color: "#fff !important",
//             }}
//           >
//             Back To Home
//           </Button>
//         </Link>
//       </Box>
//     </>
//   );
// }
