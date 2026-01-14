export const outerbox = {
  boxShadow: "none",
  borderRadius: "10px",
  p: "25px",
  mb: "15px",
  border: ".0625rem solid #e0e0e0"
}

export const secondouterbox = {
  boxShadow: "none",
  borderRadius: "10px",
  p: "5px",
  mb: "15px",
}

export const centerProperty = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "15px",
}

export const aligncenter = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}

export const gridfirstBox = {
  boxShadow: "none",
  // borderRadius: "10px",
  mb: "15px",
  // border: ".0625rem solid #e0e0e0",
  background: "#fff",

  boxShadow:
  "0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0, 0, 0, 0.12)",
}

export const girdsecondclasscardBox = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  p: "10px",
  borderBottom: ".0625rem solid #e0e0e0",
}

export const spacebetweenalignEnd = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "end",
}

export const subcomponentheading = {

  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'now-wrap',
  display: 'block',
  fontFamily: '"Google Sans", Roboto, Arial, sans-serif',
  letterSpacing: " .01785714em;",
  fontSize: ".875rem",
  lineHeight: "1.25rem",
  color: "#3c4043",
  fontWeight: "500",
}


export const viewdetailsSx={
  borderRadius: "4px",
  textTransform: "capitalize",
  background:'rgb(95, 99, 104)',
  '&:hover': {
      background: 'rgba(95, 99, 104, 0.8)'
    },
}



export const classcardHeader={
  fontSize: 15,
  fontWeight: "bold",
  whiteSpace: 'nowrap', 
  overflow: 'hidden', 
  textOverflow: 'ellipsis', 
  maxWidth: '40ch', 
  overflow:"hidden",
  '@media (max-width: 600px)': {
    maxWidth: '100%',
    whiteSpace: 'normal',
  },
  '@media (max-width: 900px)': {
    maxWidth: '100%',
    whiteSpace: 'normal',
  }
}