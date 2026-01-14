import React from "react";
import { Stack, Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <>
      <Stack
        sx={{

          color:'#fff',
          backgroundColor: "rgb(95, 99, 104)",
          // boxShadow: "0 1px 2px 0 rgba(60,64,67,.3), 0 2px 6px 2px rgba(60,64,67,.15)",
          p: "25px",
          // borderRadius: "10px 10px 0 0",
          textAlign: "center",
          mt: "15px"
          
        }}
        className="footer"
      >
        <Box>
          <Typography>
           <strong >Information </strong> {' '}
            <strong>Technology</strong> <strong> University </strong> {' '}
            <Link
              href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjkjpLC-82FAxUg8AIHHaDzCf8QFnoECAcQAQ&url=https%3A%2F%2Fitu.edu.pk%2F&usg=AOvVaw2lRLAREhv2B94tZdyIOhML&opi=89978449"
              target="_blank" 
              underline="none"
              rel="noreferrer"
              color='#fff'
            >
              (ITU)
            </Link>
          </Typography>
        </Box>
      </Stack>
    </>
  );
};

export default Footer;
