import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import KeyValueEditor from './KeyValueEditor';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function KeyValuePane({ paneValue, setPaneValue }) {
  const onKeyPairAdd = () => {
    setPaneValue((paneValue) => [
      ...paneValue,
      {
        id: uuidv4(),
        keyItem: '',
        valueItem: '',
      },
    ]);
  };

  const onKeyPairRemove = (keyPair) => {
    let newKeyValues = [...paneValue];
    newKeyValues = newKeyValues.filter((x) => x.id !== keyPair.id);
    setPaneValue(newKeyValues);
  };

  const onKeyPairUpdate = (keyPair) => {
    const elementIndex = paneValue.findIndex(
      (element) => element.id === keyPair.id
    );
    let newKeyValues = [...paneValue];
    newKeyValues[elementIndex] = {
      ...newKeyValues[elementIndex],
      keyItem: keyPair.keyItem,
      valueItem: keyPair.valueItem,
    };
    setPaneValue(newKeyValues);
  };

  const renderedList = paneValue?.map((keyPair) => {
    return (
      <KeyValueEditor
        key={keyPair.id}
        keyPair={keyPair}
        setKeyPair={(keyPairValue) => onKeyPairUpdate(keyPairValue)}
        onKeyPairRemove={() => onKeyPairRemove(keyPair)}
      />
    );
  });

  return (
    <>
   <>
  <Box>
    {renderedList}
    <Button
      variant="outlined"
      color="primary"
      onClick={() => onKeyPairAdd()}
      sx={{
        padding: '4px 24px',  // equivalent to py-1 px-6
        borderRadius: '6px',  // rounded-md
        color: 'primary.main', // text-blue-600 equivalent
        borderColor: 'primary.light', // border-blue-400 equivalent
        '&:hover': {
          backgroundColor: 'primary.50', // hover:bg-blue-100 equivalent
          borderColor: 'primary.main'
        }
      }}
    >
      Add
    </Button>
  </Box>
</>
    </>
  );
}
