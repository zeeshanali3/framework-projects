import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useMediaQuery,
  useTheme
} from '@mui/material';
import KeyValuePane from '../Panes/KeyValue/KeyValuePane';
import JsonEditorPane from '../Panes/Json/JsonEditorPane';
import AuthorizePane from '../Panes/Authorize/AuthorizePane';
import FormDataPane from '../Panes/FormData/FormDataPane';


export default function RequestTabGroup({
  queryParams = [],
  setQueryParams,
  headers = [],
  setHeaders,
  body = {},
  setBody,
  bodyType = 'json',
  setBodyType,
  authorize = {},
  setAuthorize,
}) {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };


  const handleBodyTypeChange = (e) => {
    const newType = e.target.value;
    setBodyType(newType);
    if (newType === 'form-data') {
      setBody([]);
    } else {
      setBody('{\n\t\n}');
    }
  };

  const requestTabs = [
    {
      slug: 'query-params',
      title: isMobile ? 'Params' : 'Query Params',
      panel: KeyValuePane,
      props: {
        paneValue: queryParams,
        setPaneValue: setQueryParams,
      },
    },
    {
      slug: 'headers',
      title: 'Headers',
      panel: KeyValuePane,
      props: {
        paneValue: headers,
        setPaneValue: setHeaders,
      },
    },
    {
      slug: 'body',
      title: 'Body',
      panel: bodyType === 'json' ? JsonEditorPane : FormDataPane,
      props: {
        paneValue: body,
        setPaneValue: setBody,
      },
    },
    {
      slug: 'authorize',
      title: isMobile ? 'Auth' : 'Authorize',
      panel: AuthorizePane,
      props: {
        paneValue: authorize,
        setPaneValue: setAuthorize,
      },
    },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Paper elevation={0} sx={{
        border: '1px solid',
        borderColor: 'grey.300',
        borderRadius: '4px 4px 0 0',
        overflow: 'hidden'
      }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant={isMobile ? 'scrollable' : 'standard'}
          scrollButtons={isMobile ? 'auto' : false}
          allowScrollButtonsMobile
          sx={{
            minHeight: '48px',
            '& .MuiTabs-indicator': {
              backgroundColor: 'primary.main',
              height: 2
            },
            '& .MuiTab-root': {
              minHeight: '48px',
              padding: isMobile ? '12px 8px' : '12px 16px'
            }
          }}
        >
          {requestTabs.map((tab, index) => (
            <Tab
              key={tab.slug}
              label={
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: isMobile ? 'column' : 'row',
                  gap: isMobile ? 0 : 1
                }}>
                  {tab.title}
                  {tab.slug === 'body' && !isMobile && (
                    <FormControl size="small" sx={{ ml: 1, minWidth: 100 }}>
                      <Select
                        value={bodyType}
                        onChange={handleBodyTypeChange}
                        onClick={(e) => e.stopPropagation()}
                        sx={{
                          height: '28px',
                          fontSize: '0.75rem',
                          '& fieldset': {
                            borderColor: 'grey.300'
                          }
                        }}
                      >
                        <MenuItem value="json">JSON</MenuItem>
                        <MenuItem value="form-data">Form Data</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                </Box>
              }
              sx={{
                textTransform: 'none',
                fontSize: isMobile ? '0.75rem' : '0.875rem',
                color: tabValue === index ? 'primary.main' : 'text.primary',
                '&:hover': {
                  color: 'primary.main'
                },
                minWidth: 'unset',
                px: isMobile ? 1 : 2
              }}
            />
          ))}
        </Tabs>
      </Paper>

      <Paper elevation={0} sx={{
        border: '1px solid',
        borderColor: 'grey.300',
        borderTop: 'none',
        borderRadius: '0 0 4px 4px',
        p: isMobile ? 1 : 3
      }}>
        {requestTabs.map((tab, index) => (
          <div
            key={tab.slug}
            role="tabpanel"
            hidden={tabValue !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
          >
            {tabValue === index && (
              <Box>
                {tab.slug === 'body' && (
                  <FormControl size="small" sx={{ mb: 2, minWidth: 120 }}>
                    <InputLabel sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>
                      Body Type
                    </InputLabel>
                    <Select
                      value={bodyType}
                      onChange={handleBodyTypeChange}
                      label="Body Type"
                      sx={{
                        height: isMobile ? '32px' : '40px',
                        fontSize: isMobile ? '0.75rem' : '0.875rem'
                      }}
                    >
                      <MenuItem value="json" sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>JSON</MenuItem>
                      <MenuItem value="form-data" sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>Form Data</MenuItem>
                    </Select>
                  </FormControl>
                )}
                {React.createElement(tab.panel, {
                  ...tab.props,
                  isMobile // Pass mobile flag to child components if needed
                })}
              </Box>
            )}
          </div>
        ))}
      </Paper>
    </Box>
  );
}