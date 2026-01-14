// import React, { useState, useEffect } from 'react';
// import prettyBytes from 'pretty-bytes';
// import ResponseTabGroup from '../../Tab-Groups/ResponseTabGroup';

// export default function Response({ response, loading, isError }) {

//   console.log("what is response here in it ", response)
//   const [doc, setDoc] = useState('{}');

//   useEffect(() => {
//     if (response === null) return;

//     // For error responses, we want to show the complete error object
//     if (isError) {
//       const errorResponse = {
//         status: response.status,
//         statusText: response.statusText,
//         ...response.data // Include all error data properties
//       };
//       setDoc(JSON.stringify(errorResponse, null, 2));
//     } else {
//       // For successful responses, show the data as before
//       const jsonResponse = JSON.stringify(response.data, null, 2);
//       setDoc(jsonResponse);
//     }
//   }, [response, loading, isError]);

//   const hasResponse = !(response == null);

//   let time = '';
//   let status = '';
//   let size = '';
//   let statusColor = 'text-blue-900';

//   if (hasResponse) {
//     // Determine status color based on status code
//     if (isError) {
//       statusColor = response.status >= 500 ? 'text-red-700' : 'text-orange-600';
//     }

//     const hasCustomData = 'customData' in response;
//     const hasData = 'data' in response;
//     const hasHeaders = 'headers' in response;

//     status = response.status;

//     if (hasData && hasHeaders) {
//       size = prettyBytes(
//         JSON.stringify(response.data).length +
//         (response.headers ? JSON.stringify(response.headers).length : 0)
//       );
//     }

//     if (hasCustomData) {
//       time = response.customData.time;
//     }
//   }

//   const RenderedResponseMeta = () => {
//     return (
//       <div className={`flex mt-3 space-x-6 text-sm ${isError ? 'text-red-600' : 'text-blue-700'} font-medium`}>
//         <span>Status: <span className={`font-semibold ${statusColor}`}>{status}</span></span>
//         {time && <span>Time: <span className="font-semibold text-blue-900">{time}</span></span>}
//         {size && <span>Size: <span className="font-semibold text-blue-900">{size}</span></span>}
//       </div>
//     );
//   };

//   return (
//     <div className={`my-6 border rounded-xl p-4 shadow-md ${isError ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'
//       }`}>
//       <h2 className={`text-xl font-semibold mb-2 ${isError ? 'text-red-800' : 'text-blue-800'
//         }`}>
//         {isError ? 'Error Response' : 'Response'}
//       </h2>
//       {hasResponse ? <RenderedResponseMeta /> : null}
//       <ResponseTabGroup
//         doc={doc}
//         setDoc={setDoc}
//         response={response}
//         loading={loading}
//         isError={isError}
//       />
//     </div>
//   );
// }










import React, { useState, useEffect } from 'react';
import prettyBytes from 'pretty-bytes';
import ResponseTabGroup from '../../Tab-Groups/ResponseTabGroup';
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  styled
} from '@mui/material';

const ResponseContainer = styled(Paper)(({ theme, iserror }) => ({
  margin: theme.spacing(2, 0),
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(3),
  boxShadow: theme.shadows[1],
  backgroundColor: iserror ? 'rgba(239, 68, 68, 0.1)' : 'rgba(219, 234, 254, 0.3)',
  border: `1px solid ${iserror ? '#ef4444' : 'rgba(97, 175, 254, 0.5)'}`,
  fontFamily: 'monospace'
}));

const MetaContainer = styled(Box)(({ theme, iserror }) => ({
  display: 'flex',
  gap: theme.spacing(4),
  marginTop: theme.spacing(1),
  fontSize: '0.875rem',
  fontWeight: 500,
  color: iserror ? '#dc2626' : '#3e3e3e',
  fontFamily: 'monospace'
}));

const MetaItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  '& .value': {
    fontWeight: 600,
    marginLeft: theme.spacing(0.5),
    color: '#2563eb' // Blue-600 for values
  }
}));

export default function Response({ response, loading, isError }) {
  const [doc, setDoc] = useState('{}');

  useEffect(() => {
    if (response === null) return;

    if (isError) {
      const errorResponse = {
        status: response.status,
        statusText: response.statusText,
        ...response.data
      };
      setDoc(JSON.stringify(errorResponse, null, 2));
    } else {
      const responseData = response.data?.return || response.return || response.data || response;
      setDoc(JSON.stringify(responseData, null, 2));
    }
  }, [response, loading, isError]);

  const hasResponse = !(response == null);

  let time = '';
  let status = '';
  let size = '';
  let statusColor = '#2563eb'; // Blue-600

  if (hasResponse) {
    if (isError) {
      statusColor = response.status >= 500 ? '#dc2626' : '#d97706';
    }

    const hasCustomData = 'customData' in response;
    const hasData = 'data' in response;
    const hasHeaders = 'headers' in response;

    status = response.status;

    if (hasData && hasHeaders) {
      size = prettyBytes(
        JSON.stringify(response.data).length +
        (response.headers ? JSON.stringify(response.headers).length : 0)
      );
    }

    if (hasCustomData) {
      time = response.customData.time;
    }
  }

  const RenderedResponseMeta = () => (
    <MetaContainer iserror={isError}>
      <MetaItem>
        Status: <span className="value" sx={{ color: statusColor }}>{status}</span>
      </MetaItem>
      {time && (
        <MetaItem>
          Time: <span className="value">{time}</span>
        </MetaItem>
      )}
      {size && (
        <MetaItem>
          Size: <span className="value">{size}</span>
        </MetaItem>
      )}
    </MetaContainer>
  );

  return (
    <ResponseContainer iserror={isError}>
      <Typography 
        variant="h6" 
        sx={{ 
          mb: 2,
          color: isError ? '#dc2626' : '#2563eb',
          fontFamily: 'monospace',
          fontWeight: 'bold'
        }}
      >
        {isError ? 'Error Response' : 'Response'}
      </Typography>
      
      {hasResponse && <RenderedResponseMeta />}
      
      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress size={24} sx={{ color: '#61affe' }} />
        </Box>
      ) : (
        <ResponseTabGroup
          doc={doc}
          setDoc={setDoc}
          response={response}
          loading={loading}
          isError={isError}
        />
      )}
    </ResponseContainer>
  );
}