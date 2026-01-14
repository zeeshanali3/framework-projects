import React from 'react';
import { Typography } from "@mui/material";
import Box from '@mui/material/Box';
// import {AdminText} from "../../text/AdminText";
import { helperText } from '../HelperText/Text';
import errorImage from "../assets/images/error.png"
export default function ErrorPage() {
  return (
    <>
      <Box
        sx={{
          textAlign: 'center',
          padding: '150px 0'
        }}
      >
       <div className='flex justify-center'>
       <img src={errorImage} alt='error' />
       </div>

        <Typography 
          as="h1" 
          sx={{
            fontWeight: '500',
            fontSize: '22px',
            mt: '20px',
            mb: '10px',
          }}
        >
            {helperText.error404}
        </Typography>

        <Typography>
            {helperText.error300}
        </Typography>
        
    
      </Box>
    </>
  );
}
