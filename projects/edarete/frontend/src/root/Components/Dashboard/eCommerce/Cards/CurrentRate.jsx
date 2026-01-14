import React from "react";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";


const CurrentRate = ({title,subTitle1,subTitle2,subTitle3}) => {
  // Select Form
  const [select, setSelect] = React.useState("");
  const handleChange = (event) => {
    setSelect(event.target.value);
  };

  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px 25px 10px",
          mb: "15px",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #EEF0F7",
            paddingBottom: "10px",
            mb: "20px",
          }}
          className="for-dark-bottom-border"
        >
          <Typography
            as="h3"
            sx={{
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            {title}
          </Typography>
          <Box>
            <FormControl sx={{ minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small" sx={{ fontSize: "14px" }}>
                Select
              </InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={select}
                label="Select"
                onChange={handleChange}
                sx={{ fontSize: "14px" }}
                className="select"
              >
                <MenuItem value={0} sx={{ fontSize: "14px" }}>
                  1 Day
                </MenuItem>
                <MenuItem value={1} sx={{ fontSize: "14px" }}>
                  1 Week 
                </MenuItem>
                <MenuItem value={4} sx={{ fontSize: "14px" }}>
                  1 Month
                </MenuItem>
                <MenuItem value={4} sx={{ fontSize: "14px" }}>
                  All 
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Card
              sx={{
                background: "rgba(123, 127, 239, .1)",
                boxShadow: "none",
                borderRadius: "10px",
                p: "25px 20px",
                mb: "15px",
                width: "200%",
              }}
              className="bg-black"
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: "30px",
                }}
              >
                {/* <Box>
                  <img src="/images/3d1.png" alt="matic" />
                </Box> */}

                <Box
                  style={{
                    color: "#00B69B",
                    fontSize: "13px",
                    display: "flex",
                  }}
                >
                  {/* <TrendingUpIcon style={{ marginRight: "5px" }} />  */}
                  {subTitle1}
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box fontSize={15} fontWeight="500">
                  45
                </Box>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Card
              sx={{
                background: "rgba(247, 147, 26, .1)",
                boxShadow: "none",
                borderRadius: "10px",
                width: "200%",
                p: "25px 20px",
                mb: "15px",
              }}
              className="bg-black"
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: "30px",
                }}
              >
                {/* <Box>
                  <img src="/images/btc.png" alt="btc" />
                </Box> */}

                <Box
                  style={{
                    color: "#00B69B",
                    fontSize: "13px",
                    display: "flex",
                  }}
                >
                  {/* <TrendingUpIcon style={{ marginRight: "5px" }} />  */}
                  {subTitle2}
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box fontSize={15} fontWeight="500">
                  34
                </Box>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Card
              sx={{
                background: "rgba(117, 127, 239, .1)",
                boxShadow: "none",
                borderRadius: "10px",
                p: "25px 20px",
                width: "200%",
                mb: "15px",
              }}
              className="bg-black"
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: "30px",
                }}
              >
                {/* <Box>
                  <img src="/images/comp.png" alt="comp" />
                </Box> */}

                <Box
                  style={{
                    color: "#EE368C",
                    fontSize: "13px",
                    display: "flex",
                  }}
                >
                  {/* <TrendingDownIcon style={{ marginRight: "5px" }} />  */}
                  {subTitle3}
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box fontSize={15} fontWeight="500">
                  123
                </Box>
              </Box>
            </Card>
          </Grid>
      </Card>
    </>
  );
};

export default CurrentRate;
