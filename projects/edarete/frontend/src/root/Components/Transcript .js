import { Box, Card, Typography } from "@mui/material";
import React from "react";



const mainCard={
    mt:"15px",
    boxShadow: "none",
    borderRadius: "10px",
    p: "25px 20px",
    mb: "15px",

}
 const mainHeader={
    display:'flex',
    justifyContent:'space-between',
 }

 const unititleSX={
    fontSize:'18px',
 }
 const issuedateSx={
    fontWeight:'bold',
 }
 const acdhisboxSX={
    display:'flex',
    justifyContent:'center',
    mt:'5px',
 }

export const Transcript =()=>{
    //

    return(
        <>

        <Card sx={mainCard}>
            {/* Title header */}
            <Box sx={mainHeader}>
                <Typography sx={unititleSX}>ITU</Typography>
                <div>
                    <Typography>
                        Issue Date : <span style={issuedateSx}>January 31 , 2024</span>
                    </Typography>
                </div>
            </Box>
            {/* Academic History */}

            <Box sx={acdhisboxSX}>
                <Typography>
                    
                </Typography>
            </Box>
        </Card>  
        
        </>
    )
}