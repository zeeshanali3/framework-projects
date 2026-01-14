import React, { useState, useEffect } from 'react';
import { Typography, Button, Box } from '@mui/material';

function JsonEditorPane({ paneValue, setPaneValue, readOnly = false }) {
  const [isRawView, setIsRawView] = useState(true);
  const [jsonText, setJsonText] = useState('');
  const [isValidJson, setIsValidJson] = useState(true);
  const [formattedJson, setFormattedJson] = useState(null);

  useEffect(() => {
    try {
      let jsonString;
      if (typeof paneValue === 'string') {
        jsonString = paneValue;
        JSON.parse(jsonString);
      } else {
        jsonString = JSON.stringify(paneValue, null, 2);
      }
      setJsonText(jsonString);
      setFormattedJson(formatJson(JSON.parse(jsonString)));
      setIsValidJson(true);
    } catch (e) {
      setJsonText(typeof paneValue === 'string' ? paneValue : '');
      setFormattedJson(null);
      setIsValidJson(false);
    }
  }, [paneValue]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setJsonText(newText);

    try {
      const parsed = newText ? JSON.parse(newText) : {};
      setPaneValue(parsed);
      setFormattedJson(formatJson(parsed));
      setIsValidJson(true);
    } catch (e) {
      setIsValidJson(false);
    }
  };

  const getValueType = (value) => {
    if (value === null) return 'null';
    if (Array.isArray(value)) return 'array';
    return typeof value;
  };

  const formatJson = (data, indent = 0) => {
    const type = getValueType(data);

    if (type === 'null') {
      return <span style={{ color: '#6a737d', fontStyle: 'italic' }}>null</span>;
    }

    if (type !== 'object' && type !== 'array') {
      if (type === 'string') {
        return <span style={{ color: '#032f62', backgroundColor: 'rgba(3, 102, 214, 0.05)' }}>"{data}"</span>;
      } else if (type === 'number') {
        return <span style={{ color: '#e36209', fontWeight: '500' }}>{data}</span>;
      } else if (type === 'boolean') {
        return <span style={{ color: '#6f42c1', fontWeight: '500' }}>{data.toString()}</span>;
      }
      return <span style={{ color: '#005cc5' }}>{JSON.stringify(data)}</span>;
    }

    const entries = Object.entries(data);
    return (
      <div style={{ fontFamily: "'Fira Code', 'Courier New', monospace" }}>
        {'{\n'}
        {entries.map(([key, value], i) => (
          <div key={key} style={{ marginLeft: `${indent + 20}px` }}>
            <span style={{ color: '#d73a49', fontWeight: '500' }}>"{key}"</span>: {formatJson(value, indent + 2)}
            {i < entries.length - 1 ? ',' : ''}
          </div>
        ))}
        {'\n'}
        <span style={{ marginLeft: `${indent}px` }}>{'}'}</span>
      </div>
    );
  };

  return (
    <Box sx={{
      position: 'relative',
      width: '100%',
      minWidth: '500px',
      height: '100%',
      maxHeight: '100%',
      border: '1px solid #e1e4e8',
      borderRadius: '6px',
      backgroundColor: 'white',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Box sx={{
        padding: '8px 12px',
        background: 'linear-gradient(to bottom, #f8f9fa, #e9ecef)',
        borderBottom: '1px solid #e1e4e8',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Button
          variant="outlined"
          size="small"
          onClick={() => isValidJson && setIsRawView(!isRawView)}
          disabled={!isValidJson}
          sx={{
            textTransform: 'none',
            fontWeight: '500',
            '&:hover': {
              backgroundColor: '#f3f4f6',
              borderColor: '#959da5'
            }
          }}
        >
          {isRawView ? 'Tree View' : 'Raw JSON'}
        </Button>
        {!isValidJson && (
          <Typography sx={{
            color: '#cb2431',
            fontSize: '13px',
            fontWeight: '500',
            padding: '4px 8px',
            backgroundColor: '#ffebef',
            borderRadius: '4px',
            marginLeft: '10px'
          }}>
            Invalid JSON
          </Typography>
        )}
      </Box>

      <Box sx={{
        flex: 1,
        width: '100%',
        overflowX: 'hidden', // Hide horizontal scrollbar by default
        overflowY: 'hidden', // Always hide vertical scrollbar
        '&:hover': {
          overflowX: 'auto' // Show horizontal scrollbar on hover
        },
        '&::-webkit-scrollbar': {
          height: '8px', // Only set height for horizontal scrollbar
        },
        '&::-webkit-scrollbar-track': {
          background: '#f1f1f1',
          borderRadius: '4px'
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#c1c1c1',
          borderRadius: '4px',
          '&:hover': {
            background: '#a8a8a8'
          }
        }
      }}>
        {isRawView ? (
          <textarea
            style={{
              width: '100%',
              minHeight: '200px', // Setting a base height
              height: 'auto', // Allows the height to grow based on content
              padding: '12px',
              fontFamily: "'Fira Code', 'Courier New', monospace",
              fontSize: '14px',
              lineHeight: '1.5',
              border: 'none',
              resize: 'none',
              outline: 'none',
              whiteSpace: 'pre',
              backgroundColor: '#fafbfc',
              color: '#24292e',
              overflowY: 'auto', // Vertical scroll when content overflows

              // Hides scrollbar for all browsers but keeps scroll functionality
              scrollbarWidth: 'none', // Firefox
              msOverflowStyle: 'none', // IE 10+
            }}
            className="no-scrollbar"
            value={jsonText}
            onChange={handleTextChange}
            placeholder="Enter JSON here..."
            readOnly={readOnly}
          />

        ) : (
          <pre style={{
            width: '100%',
            minWidth: 'min-content',
            height: '100%',
            overflow: 'auto',
            whiteSpace: 'pre',
            fontFamily: "'Fira Code', 'Courier New', monospace",
            margin: 0,
            padding: '12px',
            backgroundColor: '#fafbfc',
            lineHeight: '1.6',
            fontSize: '14px',
          }}>
            {formattedJson || (
              <Typography color="textSecondary">
                Enter valid JSON to view tree structure
              </Typography>
            )}
          </pre>
        )}
      </Box>
    </Box>
  );
}

export default React.memo(JsonEditorPane);