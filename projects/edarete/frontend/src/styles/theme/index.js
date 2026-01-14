import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    text: {
      primary: "#5B5B98",
      secondary: "#5B5B98",
      disabled: "#5B5B98",
      hint: "#5B5B98",
    },
    primary: {
      main: "#757FEF",
    },
    secondary: {
      main: "#818093",
    },
    success: {
      main: "#00B69B",
    },
    info: {
      main: "#2DB6F5",
    },
    warning: {
      main: "#FFBC2B",
    },
    danger: {
      main: "#EE368C",
    },
    dark: {
      main: "#260944",
    },
    mode: "dark",
  },
  
  designTokens: {
    light: {
      table: {
        image: {
          borderColor: "#7479ed",
        },
        border: {
          borderBottom: "1px solid rgba(112, 45, 122,0.4)",
        },
        actionButtons: {
          color: "#7b7a8c",
        },
        button: {
          buttonColor: "#818093",
          buttonVarient: "contained",
          buttonTextColor: "#ffffff",
        },
        header: {
          headColor: "#ffffff",
          headTextColor: "#000000",
          textSize: "1rem",
          textWeight: 700,
        },
        row: {
          headingSize: 15,
          headingWeight: 650,
          textSize: "0.875rem",
          textWeight: 400,
          heading: "#260143",
          color: "#000000",
          backgroundColor: "#FFFFFF",
        },
        expandableRow: {
          headingSize: 15,
          headingWeight: 650,
          textSize: "0.875rem",
          textWeight: 400,
          heading: "#260143",
          color: "#260143",
          backgroundColor: "#DCDCDC",
          flexDirection: "row",
        },
        specialRow: {
          headingSize: 15,
          headingWeight: 650,
          textSize: "0.875rem",
          textWeight: 400,
          heading: "#260143",
          color: "#4A90E2",
          backgroundColor: "#DCDCDC",
          flexDirection: "row",
        },
        statusActive: {
          background: "#c6f4d8",
          color: "#34894d",
        },
        statusInactive: {
          background: "#FDCCC8",
          color: "#B94E53",
        },
      },

      menues: {
        backgroundColor: "#8d5795",
        color: "#ffffff",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
        borderRadius: "8px",
        marginRight: "40px",
      },

      form: {
        field: {
          color: "#000000",        // input text
          labelColor: "#000000",   // label color
          borderColor: "#7479ed",  // border color
          focusColor: "#757FEF",   // focused state color
          tabcolor: "blue",
          iconcolor: "black",
          toolbarbg:"white",
          ControlBg:"white",
          backgroundColor: "white",
          inactiveColor: "#D3D3D3",
          fileItemBackground: "#f5f5f5",
          fileImageBackground: "#f0f0f0",
          removeButtonBackground: "#f44336",
          removeButtonHover: "#d32f2f",
          removeButtonText: "#ffffff",
          listItemShadow: "0 8px 24px rgba(0,0,0,0.06)",
          fileNameColor: "#212121",
          HoverColor: "white",
          PenColor: "Black",
        },
        searchBox: {
          backgroundColor: "#ffffff",
          color: "#000000",
        },
      },
    },

    dark: {
      table: {
        image: {
          borderColor: "#6C63FF",
        },
        actionButtons: {
          color: "#a5a4c4",
        },
        button: {
          buttonColor: "#6C63FF",
          buttonVarient: "contained",
          buttonTextColor: "#ffffff",
        },
        border: {
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        },
        header: {
          headColor: "#40404F",
          headTextColor: "#ffffff",
        },
        row: {
          headingSize: 15,
          headingWeight: 650,
          textSize: 13,
          textWeight: 500,
          heading: "#260143",
          color: "#ffffff",
          backgroundColor: "#40404F",
          alignContent: "center",
        },
        expandableRow: {
          headingSize: 15,
          headingWeight: 650,
          textSize: 13,
          textWeight: 500,
          heading: "#ffffff",
          color: "#ffffff",
          backgroundColor: "#2D2D3D",
        },
        statusActive: {
          background: "#c6f4d8",
          color: "#34894d",
        },
        statusInactive: {
          background: "#FDCCC8",
          color: "#B94E53",
        },
      },

      form: {
        field: {
          color: "#ffffff",        // input text
          labelColor: "#ffffff",   // label color
          borderColor: "#ffffff",  // border color
          focusColor: "white",   // focused state color
          tabcolor: "#232330ff",
          iconcolor: "white",
          toolbarbg:"#2D2D3D",
          ControlBg:"#2D2D3D",
          backgroundColor: "#2D2D3D",
          fileItemBackground: "#40404F",
          fileImageBackground: "#2D2D3D",
          removeButtonBackground: "#EE368C",
          removeButtonHover: "#C2185B",
          removeButtonText: "#ffffff",
          listItemShadow: "0 8px 24px rgba(0,0,0,0.3)",
          fileNameColor: "#ffffff",
          HoverColor: "black",
          PenColor: "white"
        },
        searchBox: {
          backgroundColor: "#000000",
          color: "#ffffff",
        },
      },
    },
  },

  typography: {
    fontSize: 12,
  },
});

export default theme;