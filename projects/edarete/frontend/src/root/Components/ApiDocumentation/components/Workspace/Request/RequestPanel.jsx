import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { convertKeyValueToObject } from '../../../utils/helpers';
import UrlEditor from '../../Panes/RequestUrl/UrlEditor';
import RequestTabGroup from '../../Tab-Groups/RequestTabGroup';
import Response from '../Response/ResponsePanel';
import { encryptObject, decryptObject } from "../../../../../Common/Store/Sagas/encryption";
import { styled } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles'; 
import constants from "../../../../../Common/Constants";
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Checkbox,
  CircularProgress,
  Chip,
  IconButton,
  FormControlLabel
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { getApiDocumentation } from '../../../../../Common/Store/Actions/General/GetActions/getApiDocumentation';
import { updateLoading } from '../../../../../Common/Store/Actions/General/UpdateActions/updateLoading';

const keyPairInitState = [
  {
    id: uuidv4(),
    keyItem: '',
    valueItem: '',
  },
];



const SidebarContainer = styled(Paper)(({ theme }) => ({
  width: 'auto', // default desktop sidebar width
  maxWidth: '100%', // prevent overflow on smaller screens
  background: 'linear-gradient(to bottom, #111827, #1f2937)',
  padding: theme.spacing(2),
  boxShadow: theme.shadows[10],
  height: '150vh',
  overflowY: 'auto',
  overflowX: 'hidden',
  transition: 'transform 0.3s ease-in-out',

  // Mobile behavior
  [theme.breakpoints.down('md')]: {
    position: 'fixed',
    zIndex: 1200,
    top: 0,
    left: 0,
    transform: 'translateX(-100%)',

    '&.open': {
      transform: 'translateX(0)'
    }
  }
}));


const LogoContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 32
});

const LogoText = styled(Typography)({
  marginLeft: 12,
  fontWeight: 'bold',
  fontSize: '1.25rem',
  background: 'linear-gradient(to right, #818cf8, #c7d2fe)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent'
});

const ContentContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[50],
  minHeight: '100vh',
  overflowY: 'auto',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4)
  },
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(6)
  },
  [theme.breakpoints.up('xl')]: {
    padding: theme.spacing(8)
  }
}));

const Card = styled(Paper)(({ theme }) => ({
  borderRadius: 12,
  overflow: 'hidden',
  border: '1px solid',
  borderColor: theme.palette.grey[200],
  boxShadow: theme.shadows[1],
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    borderRadius: 8,
    marginBottom: theme.spacing(2)
  }
}));

const CardHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: '1px solid',
  borderColor: theme.palette.grey[200],
  background: 'linear-gradient(to right, #ffffff, #f9fafb)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3, 4)
  }
}));

const BaseUrlContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.common.white,
  border: '1px solid',
  borderColor: theme.palette.grey[300],
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  marginBottom: theme.spacing(2),
}));

const StepTab = styled(Button)(({ theme, active }) => ({
  flexShrink: 0,
  padding: theme.spacing(1, 2),
  fontSize: '0.75rem',
  fontWeight: 500,
  borderRadius: '999px',
  textTransform: 'none',
  minWidth: 'unset',
  [theme.breakpoints.up('sm')]: {
    fontSize: '0.875rem',
    padding: theme.spacing(1.5, 3)
  },
  ...(active ? {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    boxShadow: theme.shadows[2]
  } : {
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.grey[800],
    '&:hover': {
      backgroundColor: theme.palette.grey[200]
    }
  })
}));

const EmptyState = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: 'calc(100vh - 64px)',
  padding: 16,
  textAlign: 'center'
});

const EmptyStateIcon = styled(Box)({
  width: 96,
  height: 96,
  marginBottom: 16,
  opacity: 0.2,
  '@media (min-width:600px)': {  // Direct media query instead of using theme
    width: 128,
    height: 128,
    marginBottom: 24
  }
});

const StyledFolderItem = styled(Box)(({ theme, depth }) => ({
  marginLeft: depth > 0 ? theme.spacing(0.25) : 0,
  [theme.breakpoints.up('sm')]: {
    marginLeft: depth > 0 ? theme.spacing(1) : 0
  }
}));

const StyledItemContainer = styled(Box)(({ theme, depth }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: depth === 0 ? theme.spacing(0.5, 1) : theme.spacing(0.25, 0.75),
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'all 0.2s',

  [theme.breakpoints.up('sm')]: {
    padding: depth === 0 ? theme.spacing(0.5, 1) : theme.spacing(0.25, 0.5),
  },
  '&:hover': {
    backgroundColor: theme.palette.grey[700],
  },
}));

const StyledFileItem = styled(Box)(({ theme, active }) => ({
  padding: theme.spacing(0.5, 1),
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'all 0.2s',
  backgroundColor: active ? 'rgba(49, 46, 129, 0.5)' : 'transparent',
  color: active ? theme.palette.common.white : theme.palette.grey[400],
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(0.5, 0.75)
  },
  '&:hover': {
    backgroundColor: theme.palette.grey[700],
    color: theme.palette.grey[200],
  },
}));

const MobileHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.common.white,
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
  [theme.breakpoints.up('md')]: {
    display: 'none'
  }
}));

export default function ApiDocumentation() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/todos/1');
  const [baseUrl, setBaseUrl] = useState(constants.base_url);
  const [reqMethod, setReqMethod] = useState('GET');
  const [queryParams, setQueryParams] = useState([...keyPairInitState]);
  const [headers, setHeaders] = useState([...keyPairInitState]);
  const [body, setBody] = useState('{\n\t\n}');
  const [bodyType, setBodyType] = useState('json');
  const [authorize, setAuthorize] = useState("");
  const [activeApi, setActiveApi] = useState(null);
  const [expandedItems, setExpandedItems] = useState([]);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeStepTab, setActiveStepTab] = useState(0);
  const [isEncrypted, setIsEncrypted] = useState(false);
  const [apiData, setApiData] = useState([]);

  const dispatch = useDispatch();


  const myReduxState = useSelector(state => state.main);
  
  const { accesstoken, apiDocumentationData,userSelectedRole } = myReduxState;

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleItemExpansion = (itemId) => {
    if (expandedItems.includes(itemId)) {
      setExpandedItems(expandedItems.filter(id => id !== itemId));
    } else {
      setExpandedItems([...expandedItems, itemId]);
    }
  };

  const updateApiData = (updatedApi) => {
    if (!updatedApi) return;

    setApiData(prevData => {
      const updateItemInArray = (items) => {
        return items?.map(item => {
          if (item.id === updatedApi.id) {
            return updatedApi;
          }
          if (item.children) {
            return {
              ...item,
              children: updateItemInArray(item.children)
            };
          }
          return item;
        });
      };

      return updateItemInArray(prevData);
    });
  };

  const handleApiClick = (api) => {
    setActiveApi(api);
    setActiveStepTab(0);

    if (api.type === 'multi-step-api') {
      if (api.steps.length > 0) {
        const firstStep = api.steps[0];
        setUrl(firstStep.url);
        setReqMethod(firstStep.method);
        setHeaders(firstStep.headers || [...keyPairInitState]);
        setBody(firstStep.body || (firstStep.bodyType === 'form-data' ? [] : '{\n\t\n}'));
        setBodyType(firstStep.bodyType || 'json');
      }
    } else {
      setUrl(api.url);
      setReqMethod(api.method);
      setHeaders(api.headers || [...keyPairInitState]);
      setBody(api.body || (api.bodyType === 'form-data' ? [] : '{\n\t\n}'));
      setBodyType(api.bodyType || 'json');
    }

    setResponse(null);
    setError(null);

    // Close sidebar on mobile after selecting an API
    if (isMobile) {
      setSidebarOpen(false);
    }
  };
  const handleUrlChange = (newUrl) => {
    setUrl(newUrl);
    if (activeApi) {
      const updatedApi = { ...activeApi };
      if (activeApi.type === 'multi-step-api') {
        updatedApi.steps[activeStepTab].url = newUrl;
      } else {
        updatedApi.url = newUrl;
      }
      setActiveApi(updatedApi);
      updateApiData(updatedApi);
    }
  };

  const handleMethodChange = (newMethod) => {
    setReqMethod(newMethod);
    if (activeApi) {
      const updatedApi = { ...activeApi };
      if (activeApi.type === 'multi-step-api') {
        updatedApi.steps[activeStepTab].method = newMethod;
      } else {
        updatedApi.method = newMethod;
      }
      setActiveApi(updatedApi);
      updateApiData(updatedApi);
    }
  };

  const handleHeadersChange = (newHeaders) => {
    setHeaders(newHeaders);
    if (activeApi) {
      const updatedApi = { ...activeApi };
      if (activeApi.type === 'multi-step-api') {
        updatedApi.steps[activeStepTab].headers = newHeaders;
      } else {
        updatedApi.headers = newHeaders;
      }
      setActiveApi(updatedApi);
      updateApiData(updatedApi);
    }
  };

  const handleQueryParamsChange = (newQueryParams) => {
    setQueryParams(newQueryParams);
    if (activeApi) {
      const updatedApi = { ...activeApi };
      if (activeApi.type === 'multi-step-api') {
        updatedApi.steps[activeStepTab].queryParams = newQueryParams;
      } else {
        if (!updatedApi.queryParams) {
          updatedApi.queryParams = [...keyPairInitState];
        }
        updatedApi.queryParams = newQueryParams;
      }
      setActiveApi(updatedApi);
      updateApiData(updatedApi);
    }
  };

  const handleBodyChange = (newBody) => {
    
    setBody(newBody);
    if (activeApi) {
      const updatedApi = { ...activeApi };
      if (activeApi.type === 'multi-step-api') {
        updatedApi.steps[activeStepTab].body = newBody;
      } else {
        updatedApi.body = newBody;
      }
      setActiveApi(updatedApi);
      updateApiData(updatedApi);
    }
  };

  const handleBodyTypeChange = (newBodyType) => {
    setBodyType(newBodyType);
    
    if (activeApi) {
      const updatedApi = { ...activeApi };
      if (activeApi.type === 'multi-step-api') {
        updatedApi.steps[activeStepTab].bodyType = newBodyType;
        // Reset body based on new type
        updatedApi.steps[activeStepTab].body = newBodyType === 'form-data' ? [] : '{\n\t\n}';
        setBody(newBodyType === 'form-data' ? [] : '{\n\t\n}');
      } else {
        updatedApi.bodyType = newBodyType;
        updatedApi.body = newBodyType === 'form-data' ? [] : '{\n\t\n}';
        setBody(newBodyType === 'form-data' ? [] : '{\n\t\n}');
      }
      setActiveApi(updatedApi);
      updateApiData(updatedApi);
    }
  };

  const handleStepTabChange = (index) => {
    setActiveStepTab(index);
    if (activeApi?.type === 'multi-step-api') {
      const step = activeApi.steps[index];
      setUrl(step.url);
      setReqMethod(step.method);
      setHeaders(step?.headers || [...keyPairInitState]);
      setBody(step.body || (step.bodyType === 'form-data' ? [] : '{\n\t\n}'));
      setBodyType(step.bodyType || 'json');
    }
  };
  const onSuccess = (response) => {

    setApiData(response?.documentation || response);
    
  };

  const onFailure = (error) => {

    console.error("API chart Failure:", error);
  };
  useEffect(() => {


    setAuthorize(accesstoken)
  
    if (apiDocumentationData?.length == 0) {
      dispatch(updateLoading(false))
      dispatch(
        getApiDocumentation(onSuccess, onFailure)

      );
    }
    else {
      setApiData(apiDocumentationData)
    }




  }, [apiDocumentationData]);



  const handleOnInputSend = async (e) => {
  

    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    let currentConfig;
    let method, data;

    // const current_user_id = store.getState().main.userSelectedRole?.user_role_designation_department_id;

    if (activeApi?.type === 'multi-step-api') {
      const step = activeApi.steps[activeStepTab];
      method = step.method;

      currentConfig = {
        url: baseUrl + step.url,
        method,
        headers: convertKeyValueToObject(step.headers),
        params: convertKeyValueToObject(step.queryParams),
      };
      
      if (method !== 'GET' && step.body) {

        try {
          if (step.bodyType === 'form-data') {
            // Handle form-data
            const formData = new FormData();
            formData.append("file", step.body);
            formData.append("fileName", step.body.name
            );
          
            data = formData;
            // Remove Content-Type header to let browser set it with boundary
            if (currentConfig.headers['Content-Type']) {
              delete currentConfig.headers['Content-Type'];
            }
          } else {
            // Handle JSON
            if (typeof step.body === 'object') {
              data = step.body;
            } else if (typeof step.body === 'string') {
              data = JSON.parse(step.body);
            }
          }
        } catch (e) {
          setError({
            status: 400,
            statusText: "Bad Request",
            data: { message: "Invalid request body format" },
          });
          setLoading(false);
          return;
        }
      }
    } else {
      method = reqMethod;

      currentConfig = {
        url: baseUrl + url,
        method,
        headers: convertKeyValueToObject(headers),
        params: convertKeyValueToObject(queryParams),
      };


      if (method !== "GET" && body) {
        
        try {
          if (bodyType === 'form-data') {
            // Handle form-data


            const formData = new FormData();
            let hasData = false;

            body.forEach(item => {
              if (item.type === 'file' && item.file) {
                formData.append(item.key, item.file);
                hasData = true;
              } else if (item.value !== undefined && item.value !== null) {
                formData.append(item.key, item.value);
                hasData = true;
              }
            });

            if (hasData) {
              data = formData;
              // Remove Content-Type header to let browser set it with boundary
              if (currentConfig.headers['Content-Type']) {
                delete currentConfig.headers['Content-Type'];
              }
            }
          } else {
            // Handle JSON
            if (typeof body === 'object') {
              data = body;
            } else if (typeof body === 'string') {
              data = JSON.parse(body);
            }
          }
        } catch (e) {
          setError({
            status: 400,
            statusText: "Bad Request",
            data: { message: "Invalid request body format" },
          });
          setLoading(false);
          return;
        }
      }
    }

    try {
      if (isEncrypted) {
        const encryptionDetails = {
          PlatformName: process.env.REACT_APP_PLATFORM_NAME,
          PlatformVersion: process.env.REACT_APP_PLATFORM_VERSION,
        };

        if (method === "DELETE") {
          const deletePayload = encryptObject(
            { Id: `${data?.Id || null}` },
            process.env.REACT_APP_PLATFORM_KEY
          );

          const secondEncryption = {
            reqData: deletePayload,
            encryptionDetails,
          };

          currentConfig.headers.encryptedRequest = encryptObject(
            secondEncryption,
            process.env.REACT_APP_SECRET_KEY
          );

        } else if (method !== "GET") {
          const encryptedBody = encryptObject(
            { ...data, urdd_id: userSelectedRole?.user_role_designation_department_id },
            process.env.REACT_APP_PLATFORM_KEY
          );

          const secondEncryption = {
            reqData: encryptedBody,
            encryptionDetails,
          };

          currentConfig.data = {
            encryptedRequest: encryptObject(
              secondEncryption,
              process.env.REACT_APP_SECRET_KEY
            ),
          };

        } else {
          const encryptedHeader = encryptObject(
            { urdd_id: userSelectedRole?.user_role_designation_department_id },
            process.env.REACT_APP_PLATFORM_KEY
          );

          const secondEncryption = {
            reqData: encryptedHeader,
            encryptionDetails,
          };

          currentConfig.headers.encryptedRequest = encryptObject(
            secondEncryption,
            process.env.REACT_APP_SECRET_KEY
          );
        }
      } else {
        if (method !== "GET") {
          currentConfig.data = data;
        }
      }
      

      const response = await axios(currentConfig);
      let responseData = response.data;

      if (isEncrypted && typeof responseData?.payload === "string") {
        try {
          responseData = decryptObject(
            responseData.payload,
            process.env.REACT_APP_PLATFORM_KEY
          );
        } catch (decryptionError) {
          console.error("Decryption failed:", decryptionError);
          setError({
            status: 500,
            statusText: "Decryption Failed",
            data: { message: "Failed to decrypt response payload." },
          });
          return;
        }
      }
      setResponse(responseData);

    } catch (error) {
      console.error("API Request Failed:", error);
      const responseData = error.data || error.response?.data;

      if (responseData) {
        setError({
          data: responseData,
          status: responseData.status || error.response?.status || 500,
          statusText: error.response?.statusText || "Error",
          headers: error.response?.headers || {},
          ...(responseData.statusFirst && { statusFirst: responseData.statusFirst }),
        });
      } else {
        setError({
          status: 500,
          statusText: "Internal Server Error",
          data: {
            message: error.message || "Unknown error",
            status: 100,
            statusFirst: "Requests Server Error"
          }
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const renderMethodBadge = (method) => {
    const colorMap = {
      GET: { bg: '#dbeafe', text: '#1e40af' },
      POST: { bg: '#dcfce7', text: '#166534' },
      PUT: { bg: '#fef9c3', text: '#854d0e' },
      DELETE: { bg: '#fee2e2', text: '#991b1b' },
      PATCH: { bg: '#f3e8ff', text: '#6b21a8' },
      default: { bg: '#f3f4f6', text: '#1f2937' }
    };

    const colors = colorMap[method] || colorMap.default;

    return (
      <Chip
        label={method}
        size="small"
        sx={{
          fontSize: '0.75rem',
          fontWeight: 500,
          px: 1,
          py: 0.25,
          backgroundColor: colors.bg,
          color: colors.text,
          minWidth: 60,
          justifyContent: 'center'
        }}
      />
    );
  };

  const renderItem = (item, depth = 0) => {
    const isExpanded = expandedItems.includes(item.id);

    if (item.type === 'folder' || item.type === 'subfolder') {
      return (

        <StyledFolderItem key={item.id} depth={depth}>
          <StyledItemContainer
            depth={depth}
            onClick={() => toggleItemExpansion(item.id)}
          >
            <Box display="flex" alignItems="center">
              <Box
                component="svg"
                width={isSmallScreen ? 16 : depth === 0 ? 20 : 16}
                height={isSmallScreen ? 16 : depth === 0 ? 20 : 16}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                sx={{
                  marginRight: 2,
                  color: depth === 0 ? 'primary.light' : 'primary.main',
                }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </Box>
              <Typography
                sx={{
                  color: 'grey.300',
                  fontWeight: depth === 0 ? 'medium' : 'normal',
                  fontSize: isSmallScreen ? '0.875rem' : depth === 0 ? '1rem' : '0.875rem',
                  '&:hover': {
                    color: 'common.white',
                  },
                }}
              >
                {item.name}
              </Typography>
            </Box>
            <Box
              component="svg"
              width={isSmallScreen ? 12 : depth === 0 ? 16 : 12}
              height={isSmallScreen ? 12 : depth === 0 ? 16 : 12}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              sx={{
                color: 'grey.500',
                transform: isExpanded ? 'rotate(90deg)' : 'none',
                transition: 'transform 0.2s',
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </Box>
          </StyledItemContainer>

          {isExpanded && item.children && (
            <Box sx={{ ml: isSmallScreen ? 2 : 4, mt: 1, '& > * + *': { mt: 1 } }}>
              {item.children.map(child => renderItem(child, depth + 1))}
            </Box>
          )}
        </StyledFolderItem>

      );
    } else {
      const isActive = activeApi?.id === item.id;
      return (
        <StyledFileItem
          key={item.id}
          active={isActive}
          onClick={() => handleApiClick(item)}
        >
          <Box display="flex" alignItems="center" >
            <Box mr={isSmallScreen ? 1 : 2}>
              {renderMethodBadge(
                item.type === 'multi-step-api'
                  ? item.steps[0]?.method || 'MULTI'
                  : item.method
              )}
            </Box>
            <Typography variant="body2" sx={{ fontSize: isSmallScreen ? '0.875rem' : 'inherit' }}>
              {item.name}
            </Typography>
          </Box>
        </StyledFileItem>


      );
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: isMobile ? 'column' : 'row', }}>
      {/* Mobile Header */}
      {isMobile && (
        <MobileHeader>
          <Box display="flex" alignItems="center">
            <IconButton onClick={toggleSidebar}>
              <MenuIcon />
            </IconButton>
            <LogoText sx={{ ml: 1 }}>API Explorer</LogoText>
          </Box>
          {activeApi && renderMethodBadge(
            activeApi.type === 'multi-step-api'
              ? activeApi.steps[activeStepTab]?.method
              : activeApi.method
          )}
        </MobileHeader>
      )}

      {/* Sidebar */}

      <SidebarContainer className={sidebarOpen ? 'open' : ''}>
        <LogoContainer sx={{ display: isMobile ? 'none' : 'flex' }}>
          <Box
            component="svg"
            width={32}
            height={32}
            fill="none"
            stroke="currentColor"

            viewBox="0 0 24 24"
            sx={{ color: 'primary.light' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </Box>
          <LogoText>API Explorer</LogoText>
        </LogoContainer>

        <Box sx={{ '& > * + *': { mt: 2 }, }}>
          {Array.isArray(apiData) && apiData.map(item => renderItem(item))}

        </Box>
      </SidebarContainer>

      {/* Overlay for mobile when sidebar is open */}
      {isMobile && sidebarOpen && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1100,
            display: sidebarOpen ? 'block' : 'none'
          }}
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content */}
      <ContentContainer>
        {activeApi ? (
          <Box sx={{ maxWidth: 'lg', mx: 'auto', '& > * + *': { mt: 4 } }}>
            {/* URL Editor Card */}
            <Card>
              <CardHeader>
                <Box>
                  <Typography variant="h6" color="text.primary">{activeApi.name}</Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>{activeApi.description}</Typography>
                </Box>
                {!isMobile && renderMethodBadge(
                  activeApi.type === 'multi-step-api'
                    ? activeApi.steps[activeStepTab]?.method
                    : activeApi.method
                )}
              </CardHeader>

              {/* Step tabs for multi-step APIs */}
              {activeApi.type === 'multi-step-api' && (
                <Box mt={3} px={isSmallScreen ? 2 : 3}>
                  <Paper elevation={0} sx={{
                    display: 'flex',
                    flexDirection: isSmallScreen ? 'column' : 'row',
                    alignItems: isSmallScreen ? 'flex-start' : 'center',
                    bgcolor: 'common.white',
                    borderRadius: 2,
                    p: 2,
                    border: '1px solid',
                    borderColor: 'grey.200'
                  }}>
                    <Box sx={{ flexShrink: 0, mr: isSmallScreen ? 0 : 4, mb: isSmallScreen ? 2 : 0 }}>
                      <Typography variant="h6">Steps</Typography>
                    </Box>
                    <Box sx={{ flex: 1, overflowX: 'auto', width: '100%' }}>
                      <Box sx={{
                        display: 'flex',
                        gap: 1,
                        pb: 1,
                        overflowX: 'auto',
                        '&::-webkit-scrollbar': {
                          height: '6px'
                        },
                        '&::-webkit-scrollbar-thumb': {
                          backgroundColor: theme.palette.grey[300],
                          borderRadius: '3px'
                        }
                      }}>
                        {activeApi.steps.map((step, index) => (
                          <StepTab
                            key={step.id}
                            active={activeStepTab === index}
                            onClick={() => handleStepTabChange(index)}
                          >
                            {step.name}
                          </StepTab>
                        ))}
                      </Box>
                    </Box>
                  </Paper>
                </Box>
              )}

              <Box sx={{ p: isSmallScreen ? 2 : 3 }}>
                <Box
                  component="form"
                  onSubmit={(e) => e.preventDefault()}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    bgcolor: 'white',
                    border: '1px solid',
                    borderColor: 'rgba(147, 197, 253, 0.5)',
                    borderRadius: 4,
                    p: 2,
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    mb: 2
                  }}
                >
                  {/* Base URL Label - Matching Method Select styling */}
                  <Chip
                    label="Base URL"
                    sx={{
                      minWidth: 100,
                      bgcolor: 'rgba(219, 234, 254, 0.5)',
                      border: '1px solid',
                      borderColor: 'rgba(191, 219, 254, 0.7)',
                      borderRadius: 2,
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: '#1e40af',
                      height: '40px',
                      '&:hover': {
                        borderColor: 'rgba(147, 197, 253, 1)',
                      },
                      '& .MuiChip-label': {
                        px: 1.5,
                        py: 1.25
                      }
                    }}
                  />

                  {/* URL Input - Matching Request URL input */}
                  <TextField
                    fullWidth
                    value={baseUrl}
                    onChange={(e) => setBaseUrl(e.target.value)}
                    placeholder="https://api.example.com"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        bgcolor: 'rgba(219, 234, 254, 0.3)',
                        borderRadius: 2,
                        '& fieldset': {
                          borderColor: 'rgba(191, 219, 254, 0.7)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(147, 197, 253, 1)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'rgba(59, 130, 246, 1)',
                          boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.2)',
                        },
                      },
                      '& .MuiInputBase-input': {
                        py: 1.25,
                        fontSize: '0.875rem',
                        color: '#374151',
                        '&::placeholder': {
                          color: '#9ca3af',
                          opacity: 1,
                        },
                      },
                    }}
                  />

                  {/* Encrypt Toggle - Matching Send button styling */}
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: 'rgba(219, 234, 254, 0.3)',
                    border: '1px solid',
                    borderColor: 'rgba(191, 219, 254, 0.7)',
                    borderRadius: 2,
                    px: 2,
                    py: 0.5,
                    height: '40px',
                    '&:hover': {
                      borderColor: 'rgba(147, 197, 253, 1)',
                    },
                  }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isEncrypted}
                          onChange={(e) => setIsEncrypted(e.target.checked)}
                          size="small"
                          sx={{
                            color: 'rgba(97, 175, 254, 0.6)',
                            '&.Mui-checked': {
                              color: '#3a7bd5',
                            },
                            '&:hover': {
                              color: '#61affe',
                            }
                          }}
                        />
                      }
                      label={
                        <Typography variant="body2" sx={{
                          fontFamily: 'monospace',
                          fontSize: '0.875rem',
                          color: '#3e3e3e',
                          fontWeight: '500',
                          ml: -1
                        }}>
                          Encrypt
                        </Typography>
                      }
                      sx={{ m: 0 }}
                    />
                  </Box>
                </Box>
                <Box mt={2}>
                  <UrlEditor
                    url={url}
                    setUrl={handleUrlChange}
                    reqMethod={activeApi.type === 'multi-step-api' ? activeApi.steps[activeStepTab]?.method : activeApi.method}
                    setReqMethod={handleMethodChange}
                    onInputSend={handleOnInputSend}
                    isMobile={isMobile}
                  />
                </Box>
              </Box>
            </Card>

            {/* Request Tabs Card */}
            <Card>
              <RequestTabGroup
                queryParams={
                  activeApi.type === 'multi-step-api'
                    ? activeApi.steps[activeStepTab]?.queryParams || [...keyPairInitState]
                    : activeApi.queryParams || [...keyPairInitState]
                }
                setQueryParams={handleQueryParamsChange}
                headers={headers}
                setHeaders={handleHeadersChange}
                body={body}
                setBody={handleBodyChange}
                bodyType={bodyType}
                setBodyType={handleBodyTypeChange}
                authorize={authorize}
                setAuthorize={setAuthorize}
                isMobile={isMobile}
              />
            </Card>

            {/* Response Preview */}
            <Card>
              <CardHeader>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    component="svg"
                    width={20}
                    height={20}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    sx={{
                      color: response ? 'success.main' : error ? 'error.main' : 'grey.400',
                      mr: 1
                    }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </Box>
                  <Typography variant="subtitle1">Response Preview</Typography>
                </Box>
              </CardHeader>
              <Box sx={{ p: isSmallScreen ? 2 : 3, bgcolor: 'grey.50', minHeight: 160 }}>
                {loading ? (
                  <Box display="flex" justifyContent="center" alignItems="center">
                    <CircularProgress color="inherit" size={32} />
                  </Box>
                ) : error ? (
                  <Response response={error} isError={true} />
                ) : response ? (
                  <Response response={response} />
                ) : (
                  <Typography variant="body2" color="text.secondary" textAlign="center">
                    Send a request to see the response here
                  </Typography>
                )}
              </Box>
            </Card>
          </Box>
        ) : (
          <EmptyState>
            <EmptyStateIcon>
              <Box
                component="svg"
                width="100%"
                height="100%"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </Box>
            </EmptyStateIcon>
            <Typography variant="h4" fontWeight="light" color="text.secondary" mb={2}>
              API Explorer
            </Typography>
            <Typography variant="body1" color="text.secondary" maxWidth="md" textAlign="center">
              Select an API endpoint from the sidebar to inspect and test requests
            </Typography>
            {isMobile && (
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
                onClick={toggleSidebar}
              >
                Open API List
              </Button>
            )}
          </EmptyState>
        )}
      </ContentContainer>
    </Box>
  );
}

// Sample API data (keep your existing sampleApiData constant)
const sampleApiData = [
  {
    "id": "auth",
    "name": "Authentication",
    "type": "folder",
    "children": [
      {
        "id": "login",
        "name": "Login",
        "type": "api",
        "url": "/api/auth/login",
        "method": "POST",
        "headers": [],
        "body": "{\n  \"username\": \"testuser\",\n  \"password\": \"testpass\"\n}",
        "description": "User login endpoint"
      }
    ]
  },
  {
    "id": "user-registration",
    "name": "User Registration",
    "type": "multi-step-api",
    "description": "Complete user registration flow",
    "steps": [
      {
        "id": uuidv4(),
        "name": "Create User",
        "method": "POST",
        "url": "/api/login?version=1.0&step=1",
        "headers": [
          {
            "id": uuidv4(),
            "keyItem": "Content-Type",
            "valueItem": "application/json"
          }
        ],
        "queryParams": [...keyPairInitState],
        "body": {
          "email": "bsce21021@itu.edu.pk",
          "device_identifier": "6aff3f17-5557-40fd-a30c-05436879d79c",
          "device_name": "Windows",
          "platform_version": "135",
          "os_version": "10.0"
        }
      },
      {
        "id": uuidv4(),
        "name": "Assign Role",
        "method": "POST",
        "url": "/api/login?version=1.0&step=2",
        "headers": [
          {
            "id": uuidv4(),
            "keyItem": "Content-Type",
            "valueItem": "application/json"
          }
        ],
        "queryParams": [...keyPairInitState],
        "body": {
          "email": "bsce21021@itu.edu.pk",
          "otp": "sdfff",
          "device_name": "Windows",
          "os_version": "10.0",
          "device_identifier": "6aff3f17-5557-40fd-a30c-05436879d79c"
        }
      },
      {
        "id": uuidv4(),
        "name": "Assign Roleeeeeeee",
        "method": "GET",
        "url": " /api/get/file/url/local?step=1",
        "headers": [
          {
            "id": uuidv4(),
            "keyItem": "Content-Type",
            "valueItem": "application/json"
          }
        ],
        "queryParams": [...keyPairInitState],
        "body": {}
      },
      {
        "id": uuidv4(),
        "name": "uploadddddd",
        "method": "POST",
        "url": "",
        "queryParams": [...keyPairInitState],
        "body": {}
      }
    ]
  }
];