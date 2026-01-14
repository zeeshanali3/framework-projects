import React from 'react';
import { 
  Box,
  Tabs,
  Tab,
  Paper
} from '@mui/material';
import { ThreeDots } from 'react-loader-spinner';
import JsonEditorPane from '../Panes/Json/JsonEditorPane';
import ResponseHeaderPane from '../Panes/ResponseHeader/ResponseHeaderPane';

export default function ResponseTabGroup({ doc, setDoc, response, loading }) {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper elevation={0} sx={{ 
        border: '1px solid',
        borderColor: 'grey.300',
        borderRadius: '4px 4px 0 0'
      }}>
        <Tabs 
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: 'primary.main',
              height: 2
            }
          }}
        >
          <Tab 
            label="Response Body" 
            sx={{
              textTransform: 'none',
              color: tabValue === 0 ? 'primary.main' : 'text.primary',
              '&:hover': {
                color: 'primary.main'
              }
            }}
          />
          <Tab 
            label="Response Header" 
            sx={{
              textTransform: 'none',
              color: tabValue === 1 ? 'primary.main' : 'text.primary',
              '&:hover': {
                color: 'primary.main'
              }
            }}
          />
        </Tabs>
      </Paper>

      <Paper elevation={0} sx={{ 
        border: '1px solid',
        borderColor: 'grey.300',
        borderTop: 'none',
        borderRadius: '0 0 4px 4px',
        p: 3
      }}>
        {loading ? (
          <Box display="flex" justifyContent="center">
            <ThreeDots height="30" width="30" color="gray" visible={true} />
          </Box>
        ) : (
          <>
            {tabValue === 0 && (
              <JsonEditorPane
                paneValue={doc}
                setPaneValue={setDoc}
                isEditable={false}
              />
            )}
            {tabValue === 1 && (
              <ResponseHeaderPane response={response} />
            )}
          </>
        )}
      </Paper>
    </Box>
  );
}