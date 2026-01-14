import { Accordion, AccordionSummary, AccordionDetails, Box, Typography,Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/system';
import ReactJson from 'react-json-view'; // Importing react-json-view

// Styled components
const CodeBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#f5f5f5',
  padding: '20px',
  borderRadius: '12px',
  fontFamily: 'monospace',
  fontSize: '14px',
  border: '1px solid #ddd',
  color: '#333',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#e0e0e0',
    transform: 'scale(1.02)',
  },
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  marginBottom: '16px',
  borderRadius: '12px',
  boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
  backgroundImage: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
  color: '#fff',
  '&:before': {
    display: 'none',
  },
  '& .MuiAccordionSummary-root': {
    borderRadius: '12px',
    padding: '0 20px',
    color: '#fff',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  },
  '& .MuiAccordionDetails-root': {
    backgroundColor: '#fafafa',
    borderRadius: '12px',
  },
}));

const TitleTypography = styled(Typography)(({ theme }) => ({
  marginBottom: '24px',
  color: '#3f51b5',
  fontWeight: 'bold',
  textAlign: 'center',
  textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: '600',
  color: '#ffffff',
}));


const ContainerBox = styled(Box)(({ theme }) => ({
  padding: '32px',
  backgroundColor: '#f4f4f4',
  borderRadius: '16px',
  marginLeft:"10%",
  marginTop:"100px",
  width:"80%",
  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
}));

const CollapsibleDocPage = ({data,config,appearance}) => {

    const copyToClipboard = (json) => {
        const jsonString = JSON.stringify(json, null, 2);
        navigator.clipboard.writeText(jsonString).then(() => {
          alert("Copied to clipboard!"); 
        }).catch(() => {
          alert("Failed to copy.");
        });
      };

  return (
    <ContainerBox>
      <TitleTypography variant="h4" gutterBottom>
        Generated Props
      </TitleTypography>

      {/* Collapsible Section for Data */}
      <StyledAccordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}>
          <SectionTitle variant="h6">Data Props</SectionTitle>
          <Button 
            variant="contained" 
            size="small" 
            onClick={() => copyToClipboard(data)} 
            sx={{ ml: 2 }}
          >
            Copy
          </Button>
        </AccordionSummary>
        <AccordionDetails>
          <CodeBox>
            <ReactJson
              src={data}
              theme="monokai"
              collapsed={false}
              enableClipboard={false}
              displayDataTypes={false}
            />
          </CodeBox>
        </AccordionDetails>
      </StyledAccordion>

      {/* Collapsible Section for Config */}
      <StyledAccordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}>
          <SectionTitle variant="h6">Config Props</SectionTitle>
          <Button 
            variant="contained" 
            size="small" 
            onClick={() => copyToClipboard(data)} 
            sx={{ ml: 2 }}
          >
            Copy
          </Button>
        </AccordionSummary>
        <AccordionDetails>
          <CodeBox>
            <ReactJson
              src={config}
              theme="monokai"
              collapsed={false}
              enableClipboard={false}
              displayDataTypes={false}
            />
          </CodeBox>
        </AccordionDetails>
      </StyledAccordion>

      {/* Collapsible Section for Appearance */}
      <StyledAccordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}>
          <SectionTitle variant="h6">Appearance Props</SectionTitle>
          <Button 
            variant="contained" 
            size="small" 
            onClick={() => copyToClipboard(data)} 
            sx={{ ml: 2 }}
          >
            Copy
          </Button>
        </AccordionSummary>
        <AccordionDetails>
          <CodeBox>
            <ReactJson
              src={appearance}
              theme="monokai"
              collapsed={false}
              enableClipboard={false}
              displayDataTypes={false}
            />
          </CodeBox>
        </AccordionDetails>
      </StyledAccordion>
    </ContainerBox>
  );
};

export default CollapsibleDocPage;